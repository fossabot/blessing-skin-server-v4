<template>
    <div>
        <i-row :gutter="16">
            <i-col :sm="24" :md="16" :lg="16">
                <i-card>
                    <p slot="title" v-t="`used.title`" />
                    <i-row :gutter="16">
                        <i-col :sm="24" :lg="16">
                            <div>
                                {{ $t('used.players') }}
                            </div>
                            <i-progress :percent="playersPercent">
                                <b>{{ currentUser.players.length }}</b> /
                                {{ totalPlayers }}
                            </i-progress>
                            <div>
                                {{ $t('used.storage') }}
                            </div>
                            <i-progress class="storage-progress" :percent="storagePercent">
                                <b>{{ usedStorage }}</b> /
                                {{ currentUser.score }}
                            </i-progress>
                        </i-col>
                        <i-col :sm="24" :lg="8">
                            <div class="score">
                                <div v-t="`cur-score`"></div>
                                <div class="score-num">{{ currentUser.score }}</div>
                            </div>
                        </i-col>
                    </i-row>
                    <i-collapse class="score-intro">
                        <i-panel>
                            {{ $t('score-intro.title') }}
                            <p slot="content">{{ scoreIntro }}</p>
                        </i-panel>
                        <i-panel>
                            {{ $t('rates.title') }}
                            <p slot="content">
                                <span v-t="{
                                    path: 'rates.storage',
                                    args: { score: scoreInfo.perStorage }
                                }"></span>
                                <br>
                                <span v-t="{
                                    path: 'rates.player',
                                    args: { score: scoreInfo.perPlayer }
                                }"></span>
                            </p>
                        </i-panel>
                    </i-collapse>
                    <i-button
                        @click="sign"
                        class="btn-sign"
                        type="primary"
                        :title="$t('last-sign', { time: lastSignedDiff() })"
                        :disabled="!canSign">
                        {{ signButtonText }}
                    </i-button>
                </i-card>
            </i-col>
            <i-col :sm="24" :md="8" :lg="8">
                <i-card>
                    <p slot="title" v-t="`announcement`" />
                    <vue-markdown :source="announcement" />
                </i-card>
            </i-col>
        </i-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
import moment from 'moment';
import 'moment-precise-range-plugin';
import VueMarkdown from 'vue-markdown';
import VueI18n from 'vue-i18n';
import CURRENT_USER from '../../graphql/query/currentUser.gql';
import { lang } from '../../libs/i18n';

moment.locale(lang());

export default Vue.extend({
    components: {
        VueMarkdown
    },
    apollo: {
        currentUser() {
            return {
                query: CURRENT_USER
            };
        }
    },
    computed: {
        usedStorage(): number {
            if (this.currentUser.closet.length === 0) {
                return 0;
            }

            return this.currentUser.closet
                .map(item => item.texture.size)
                .reduce((size, carry) => size + carry, 0);
        },
        storagePercent(): number {
            if (this.usedStorage === 0) {
                return 0;
            }
            return this.usedStorage / this.currentUser.score;
        },
        totalPlayers(): number {
            return ~~(this.currentUser.score / 100);
        },
        playersPercent(): number {
            const count = this.currentUser.players.length;
            if (count === 0) {
                return 0;
            }
            return count / this.totalPlayers;
        },
        scoreIntro(): VueI18n.TranslateResult {
            return this.$t('score-intro.introduction', {
                initial: this.scoreInfo.initial,
                return: this.$t(
                    `score-intro.${
                        this.scoreInfo.returnScore ? 'will' : 'no'
                    }-return`
                ),
                from: this.scoreInfo.signScore.split(',')[0],
                to: this.scoreInfo.signScore.split(',')[1]
            });
        },
        canSign(): boolean {
            const last = moment(this.currentUser.last_signed_at);
            if (this.scoreInfo.signAfterZero) {
                last.startOf('date');
                return last.isBefore(moment().startOf('date'));
            } else {
                // Moment.js is mutable
                last.add(this.scoreInfo.signGapTime, 'hours');
                return moment().isAfter(last);
            }
        },
        signButtonText(): VueI18n.TranslateResult {
            if (this.canSign) {
                return this.$t('sign');
            } else if (this.scoreInfo.signAfterZero) {
                return this.$t(
                    'sign-remain-time',
                    this.signDiff(
                        moment().endOf('date'),
                        moment(this.currentUser.last_signed_at)
                    )
                );
            } else {
                const next = moment(
                    this.currentUser.last_signed_at,
                    'YYYY-MM-DD kk:mm:ss'
                ).add(this.scoreInfo.signGapTime, 'hours');
                return this.$t(
                    'sign-remain-time',
                    this.signDiff(moment(), next)
                );
            }
        }
    },
    data(): {
        announcement: string;
        readonly currentUser: {
            readonly score: number;
            readonly players: Player[];
            readonly closet: ClosetItem[];
            readonly last_signed_at: string;
        };
        scoreInfo: {
            signAfterZero: boolean;
            signGapTime: number;
            perPlayer: number;
            perStorage: number;
            returnScore: boolean;
            initial: number;
            signScore: string;
        };
    } {
        return {
            announcement: '',
            // Just initialize apollo data
            currentUser: {
                score: 0,
                players: [],
                closet: [],
                last_signed_at: ''
            },
            scoreInfo: {
                signAfterZero: false,
                signGapTime: 24,
                perPlayer: 100,
                perStorage: 1,
                returnScore: true,
                initial: 1000,
                signScore: '10,100'
            }
        };
    },
    methods: {
        async sign(): Promise<void> {
            const previous = this.currentUser.score;
            try {
                const {
                    data: { userSign: { score } }
                } = await this.$apollo.mutate({
                    mutation: gql`
                        mutation {
                            userSign {
                                score
                                last_signed_at
                            }
                        }
                    `,
                    update(store, { data: { userSign } }) {
                        const data: {
                            currentUser: Object;
                        } | null = store.readQuery({ query: CURRENT_USER });
                        Object.assign(data ? data.currentUser : {}, userSign);
                        return store.writeQuery({
                            query: CURRENT_USER,
                            data
                        });
                    }
                });
                this.$Message.success(
                    this.$t('sign-success', { score: score - previous })
                );
            } catch {
                this.$Message.error(this.$t('sign-failed'));
            }
        },
        signDiff(
            d1: moment.Moment,
            d2: moment.Moment
        ): { time: number; unit: VueI18n.TranslateResult } {
            const diff = moment.preciseDiff(d1, d2, true);
            return diff.hours !== 0
                ? {
                      time: diff.days * 24 + diff.hours,
                      unit: this.$t('hour')
                  }
                : { time: diff.minutes, unit: this.$t('min') };
        },
        lastSignedDiff(): string {
            return moment
                .duration(
                    moment(this.currentUser.last_signed_at).diff(moment.now())
                )
                .humanize();
        }
    },
    created(): void {
        this.$ajax.get('/api/site/announcement').then(({ data }) => {
            this.announcement = data;
        });
        this.$ajax.get('/api/site/score').then(({ data }) => {
            this.scoreInfo = data;
        });
    }
});
</script>

<style lang="less" scoped>
.storage-progress {
    .ivu-progress-bg {
        background-color: #f39c12;
    }
}

.score {
    text-align: center;
}

.score-num {
    font-family: Minecraft, serif;
    font-size: 50px;
    margin-top: 20px;
}

.score-intro {
    margin-top: 15px;
}

.btn-sign {
    margin-top: 15px;
}
</style>

<i18n>
en:
    used:
        title: Resources Used
        players: Registered players
        storage: Storage used

    cur-score: Current Score
    sign: Sign
    sign-success: 'Signed successfully. You got {score} scores.'
    sign-failed: Failed to sign.
    hour: h
    min: min
    last-sign: 'Last signed at {time} ago'
    sign-remain-time: 'Available after {time} {unit}'
    announcement: Announcement

    score-intro:
        title: What is score?
        introduction: |
            We use score system to prevent the behaviors like uploading huge amount of textures and registering players casually.
            Both adding players and uploading textures will consume your score. {return}

            The initial score of user on this site is {initial}, you can acquire {from} ~ {to} scores by signing in.
        will-return: The score will be returned if you deleted them.
        no-return: But the score will NOT be returned if you deleted them.
    rates:
        title: Conversion
        storage: '{score} scores = 1 KB storage'
        player: '{score} scores = 1 player'

zh-cn:
    used:
        title: 使用情况
        players: 角色数量
        storage: 存储空间

    cur-score: 当前积分
    sign: 签到
    sign-success: '签到成功，获得了 {score} 积分~'
    sign-failed: 签到失败
    hour: 小时
    min: 分钟
    last-sign: '上次签到于 {time} 之前'
    sign-remain-time: '{time}{unit}后可签到'
    announcement: 公告

    score-intro:
        title: 积分是个啥？
        introduction: |
            「既然你诚心诚意地发问了！」
            「那我们就大发慈悲地告诉你！」
            「为了守护皮肤站的和平」
            「为了防止皮肤站被破坏」
            「贯彻爱与真实的。。呸！」上面只是卖下萌~

            为了不出现用户一个劲上传材质导致存储空间爆满，我们决定启用积分系统。
            添加角色以及上传材质都会消耗积分，{return}。

            本站用户初始积分为 {initial}，每日签到可以随机获得 {from} ~ {to} 积分
            添加皮肤库里的材质到衣柜不消耗积分。
        will-return: 而删除已经添加的角色和已上传的材质时积分将会被返还
        no-return: 但删除已经添加的角色和已上传的材质时积分不会被返还
    rates:
        title: 换算关系
        storage: '{score} 积分 = 1 KB 存储空间'
        player: '{score} 积分 = 1 个角色'
</i18n>
