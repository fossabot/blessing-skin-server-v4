<template>
    <Row :gutter="16">
        <Col :xs="24" :lg="12">
            <Card>
                <p slot="title" v-t="`password.title`"></p>
                <Form>
                    <FormItem
                        :label="$t('password.old')"
                        :error="errors.first('old-password')"
                        :validateStatus="hasValidateError('old-password')"
                    >
                        <Input
                            v-validate="`required|min:6|max:16`"
                            name="old-password"
                            ref="old-password"
                            v-model="password.data.old"
                            type="password"
                        />
                    </FormItem>
                    <FormItem
                        :label="$t('password.new')"
                        :error="errors.first('new-password')"
                        :validateStatus="hasValidateError('new-password')"
                    >
                        <span>{{ passwordStrength }}</span>
                        <Input
                            v-validate="`required|min:8|max:16`"
                            name="new-password"
                            ref="new-password"
                            :placeholder="$t('password.placeholder')"
                            v-model="password.data.new"
                            type="password"
                            @input="password.data.confirm = ''"
                        />
                    </FormItem>
                    <FormItem
                        :label="$t('password.confirm')"
                        :error="errors.first('confirm-password')"
                        :validateStatus="hasValidateError('confirm-password')"
                    >
                        <Input
                            v-validate="`required|confirmed:new-password`"
                            name="confirm-password"
                            ref="confirm-password"
                            v-model="password.data.confirm"
                            type="password"
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            @click="updatePassword"
                            type="primary"
                            :loading="password.state === 'pending'"
                        >{{ $t('password.button') }}</Button>
                        <Alert
                            style="display: inline"
                            v-if="password.state === 'success'"
                            type="success"
                            show-icon
                        >{{ $t('password.success') }}</Alert>
                        <Alert
                            style="display: inline"
                            v-else-if="password.state === 'wrong-password'"
                            type="error"
                            show-icon
                        >{{ $t('password.wrong-password') }}</Alert>
                        <Alert
                            style="display: inline"
                            v-else-if="password.state === 'error'"
                            type="error"
                            show-icon
                        >{{ $t('error') }}</Alert>
                    </FormItem>
                </Form>
            </Card>
        </Col>
        <Col :xs="24" :lg="12">
            <Card>
                <p slot="title" v-t="`nickname.title`"></p>
                <Form>
                    <FormItem
                        prop="nickname"
                        :error="errors.first('nickname')"
                        :validateStatus="hasValidateError('nickname')"
                    >
                        <Input
                            v-validate="`required|max:16`"
                            name="nickname"
                            ref="nickname"
                            v-model="nickname.data.nickname"
                            :placeholder="$t('nickname.rule')"
                        >
                            <Icon type="person" slot="append"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button
                            @click="updateNickname"
                            type="primary"
                            :loading="nickname.state === 'pending'"
                        >{{ $t('nickname.title') }}</Button>
                        <Alert
                            style="display: inline"
                            v-if="nickname.state === 'success'"
                            type="success"
                            show-icon
                        >{{ $t(
                            'nickname.success',
                            { nickname: nickname.data.nickname }
                        ) }}</Alert>
                        <Alert
                            style="display: inline"
                            v-else-if="nickname.state === 'error'"
                            type="error"
                            show-icon
                        >{{ $t('error') }}</Alert>
                    </FormItem>
                </Form>
            </Card>

            <Card>
                <p slot="title" v-t="`email.title`"></p>
                <Form>
                    <FormItem
                        :label="$t('email.new')"
                        :error="errors.first('email')"
                        :validateStatus="hasValidateError('email')"
                    >
                        <AutoComplete
                            v-validate="`required|email|unique-email`"
                            name="email"
                            ref="email"
                            v-model="email.data.email"
                            :data="email.autoComplete"
                            @on-search="completeEmail"
                        />
                    </FormItem>
                    <FormItem
                        :label="$t('email.password')"
                        :error="errors.first('email-password')"
                        :validateStatus="hasValidateError('email-password')"
                    >
                        <Input
                            v-validate="`required|min:6|max:16`"
                            name="email-password"
                            ref="email-password"
                            type="password"
                            v-model="email.data.password"
                        />
                    </FormItem>
                    <FormItem>
                        <Button
                            @click="updateEmail"
                            type="warning"
                            :loading="email.state === 'pending'"
                        >{{ $t('email.title') }}</Button>
                        <Alert
                            style="display: inline"
                            v-if="email.state === 'success'"
                            type="success"
                            show-icon
                        >{{ $t('email.success') }}</Alert>
                        <Alert
                            style="display: inline"
                            v-else-if="email.state === 'wrong-password'"
                            type="error"
                            show-icon
                        >{{ $t('password.wrong-password') }}</Alert>
                        <Alert
                            style="display: inline"
                            v-else-if="email.state === 'error'"
                            type="error"
                            show-icon
                        >{{ $t('error') }}</Alert>
                    </FormItem>
                </Form>
            </Card>

            <Card v-if="!$store.getters.isAdmin" class="card-delete-user">
                <p slot="title" v-t="`delete.title`"></p>
                <p v-t="`delete.notice`"></p>
                <Button @click="showDeleteConfirm" type="error" v-t="`delete.button`" />
                <Modal v-model="deleteConfirm.modal">
                    <p slot="header" style="color:#f60; text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span v-t="`delete.modal-title`"></span>
                    </p>
                    <div v-t="`delete.modal-notice`"></div>
                    <Form>
                        <FormItem
                            prop="password"
                            :error="errors.first('delete-confirm')"
                            :validateStatus="hasValidateError('delete-confirm')"
                        >
                            <Input
                                v-validate="`required|min:6|max:16`"
                                name="delete-confirm"
                                ref="delete-confirm"
                                v-model="deleteConfirm.data.password"
                                type="password"
                                :placeholder="$t('delete.password')"
                            />
                        </FormItem>
                    </Form>
                    <div slot="footer">
                        <Button v-t="`ok`" @click="deleteAccount" />
                        <Button v-t="`cancel`" @click="cancelDelete" />
                    </div>
                </Modal>
            </Card>
            <Card v-else class="card-delete-user">
                <p slot="title" v-t="`delete.title`"></p>
                <p v-t="`delete.admin`"></p>
            </Card>
        </Col>
    </Row>
</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import gql from 'graphql-tag';
import zxcvbn from 'zxcvbn';
import VeeValidateZhCn from 'vee-validate/dist/locale/zh_CN';
import { lang } from '../../libs/i18n';

type FormState = 'normal' | 'pending' | 'success' | 'error';
type PasswordFormState = FormState | 'wrong-password';
type FormData = {
    data: { [key: string]: string };
};
type Forms = {
    password: FormData & { state: PasswordFormState };
    nickname: FormData & { state: FormState };
    email: FormData & { state: PasswordFormState; autoComplete: string[] };
    deleteConfirm: FormData & { modal: boolean };
};

export default Vue.extend({
    data(): Forms {
        return {
            password: {
                data: {
                    old: '',
                    new: '',
                    confirm: ''
                },
                state: 'normal'
            },
            nickname: {
                data: {
                    nickname: ''
                },
                state: 'normal'
            },
            email: {
                data: {
                    email: '',
                    password: ''
                },
                state: 'normal',
                autoComplete: []
            },
            deleteConfirm: {
                data: {
                    password: ''
                },
                modal: false
            }
        };
    },
    methods: {
        async validate(formName: keyof Forms): Promise<boolean> {
            const fields = {
                password: ['old-password', 'new-password', 'confirm-password'],
                nickname: ['nickname'],
                email: ['email', 'email-password'],
                deleteConfirm: ['delete-confirm']
            }[formName];

            const validations = await Promise.all(
                fields.map(async (field): Promise<{
                    field: string;
                    valid: boolean;
                }> => ({
                    field,
                    valid: await this.$validator.validate(field)
                }))
            );
            for (const validation of validations) {
                if (!validation.valid) {
                    // `email` field is a `AutoComplete` component
                    // which does not has `focus` method.
                    if (validation.field !== 'email') {
                        (this.$refs[validation.field] as Vue & {
                            focus: Function;
                        }).focus();
                    }
                    return false;
                }
            }
            return true;
        },
        hasValidateError(field: string): 'error' | '' {
            return this.$validator.errors.has(field) ? 'error' : '';
        },
        completeEmail(value: string): void {
            if (!value) {
                this.password;
                this.email.autoComplete = [];
                return;
            }

            if (/^\w+@(?:\w+\.)*\w+\.$/.test(value)) {
                this.email.autoComplete = ['com', 'cn', 'net', 'org'].map(
                    suffix => `${value}${suffix}`
                );
                return;
            }

            if (value.includes('@')) {
                this.email.autoComplete = [];
                return;
            }

            const domains = [
                'hotmail.com',
                'outlook.com',
                'gmail.com',
                'qq.com',
                '163.com',
                '126.com',
                'year.net',
                '139.com',
                'foxmail.com',
                'sina.com',
                'sohu.com'
            ];
            this.email.autoComplete = domains.map(
                domain => `${value}@${domain}`
            );
        },
        showDeleteConfirm(): void {
            this.deleteConfirm.modal = true;
        },
        cancelDelete(): void {
            this.deleteConfirm.modal = false;
            this.deleteConfirm.data.password = '';
        },
        async deleteAccount(): Promise<void> {
            if (!await this.validate('deleteConfirm')) {
                return;
            }

            try {
                const {
                    data: { deleteAccount: user }
                } = await this.$apollo.mutate({
                    mutation: gql`
                        mutation {
                            deleteAccount(password: "${
                                this.deleteConfirm.data.password
                            }") {
                                uid
                            }
                        }
                    `
                });

                if (user) {
                    this.$Message.error(this.$t('delete.wrong-password'));
                } else {
                    this.$Message.success(this.$t('delete.success'));
                    setTimeout(() => this.$router.push('/'), 3000);
                }
            } catch {
                this.$Message.error(this.$t('error'));
            }
        },
        async updatePassword(): Promise<void> {
            this.password.state = 'pending';
            if (!await this.validate('password')) {
                this.password.state = 'normal';
                return;
            }

            try {
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation {
                            updateUserProfile(
                                old_password: "${this.password.data.old}",
                                new_password: "${this.password.data.new}"
                            )
                            { uid }
                        }
                    `
                });
                this.password.state = 'success';
                setTimeout(() => (this.password.state = 'normal'), 3000);
            } catch (error) {
                const { graphQLErrors } = error;
                if (
                    graphQLErrors &&
                    Number.parseInt(graphQLErrors[0].message) === -1
                ) {
                    this.password.state = 'wrong-password';
                } else {
                    this.password.state = 'error';
                }
            }
        },
        async updateNickname(): Promise<void> {
            this.nickname.state = 'pending';
            if (!await this.validate('nickname')) {
                this.nickname.state = 'normal';
                return;
            }

            try {
                const {
                    data: { updateUserProfile: { nickname } }
                } = await this.$apollo.mutate({
                    mutation: gql`
                        mutation {
                            updateUserProfile(nickname: "${
                                this.nickname.data.nickname
                            }") {
                                nickname
                            }
                        }
                    `
                });
                this.nickname.state = 'success';
                this.$store.commit('updateUserInfo', { nickname });
                setTimeout(() => (this.nickname.state = 'normal'), 3000);
            } catch {
                this.nickname.state = 'error';
            }
        },
        async updateEmail(): Promise<void> {
            this.email.state = 'pending';
            if (!await this.validate('email')) {
                this.email.state = 'normal';
                return;
            }

            try {
                const {
                    data: { updateUserProfile: { email } }
                } = await this.$apollo.mutate({
                    mutation: gql`
                        mutation {
                            updateUserProfile(
                                email: "${this.email.data.email}",
                                current_password: "${this.email.data.password}"
                            ) { email }
                        }
                    `
                });
                this.email.state = 'success';
                this.$store.commit('updateUserInfo', { email });
                setTimeout(() => (this.email.state = 'normal'), 3000);
            } catch (error) {
                const { graphQLErrors } = error;
                if (
                    graphQLErrors &&
                    Number.parseInt(graphQLErrors[0].message) === -1
                ) {
                    this.email.state = 'wrong-password';
                } else {
                    this.email.state = 'error';
                }
            }
        }
    },
    computed: {
        passwordStrength(): VueI18n.TranslateResult {
            return this.$t(
                `password.strength[${zxcvbn(this.password.data.new).score}]`
            );
        }
    },
    created() {
        this.$validator.localize('zh-cn', {
            messages: VeeValidateZhCn.messages,
            attributes: {
                'old-password': this.$t('password.old'),
                'new-password': this.$t('password.new'),
                'confirm-password': this.$t('password.confirm'),
                nickname: this.$t('nickname.field'),
                email: this.$t('email.new'),
                'email-password': this.$t('email.password'),
                'delete-confirm': this.$t('delete.password')
            }
        });
        this.$validator.locale = lang();
    }
});
</script>

<style lang="less" scoped>
.card-delete-user {
    &:hover {
        border-color: rgb(247, 42, 35);
    }

    .ivu-card-head {
        border-color: rgb(247, 42, 35);
    }
}
</style>

<i18n>
en:
  error: Some errors occurred. Try it again?

  password:
    title: Change Password
    old: Old Password
    new: New Password
    placeholder: Length must be between 8 and 16.
    confirm: Repeat Password
    button: Change Password
    wrong-password: Original password is not correct.
    success: Password updated successfully, please log in again.
    strength:
      - Very weak
      - Weak
      - Middle level
      - Strong
      - Very Strong

  nickname:
    field: Nickname
    title: Change Nickname
    blank: No nickname is setted now.
    rule: Whatever you like expect special characters
    success: Nickname is successfully updated to {nickname}

  email:
    title: Change Email
    new: New Email
    password: Current Password
    button: Change Email
    wrong-password: Wrong password.
    success: Email address updated successfully, please log in again.

  delete:
    title: Delete Account
    notice: Sure to delete your account?
    admin: Admin account can not be deleted.
    button: Delete My Account

    modal-title: You need to enter your password to continue
    modal-notice: |
      You are about to delete your account.
      This is permanent! No backups, no restores, no magic undo button.
      We warned you, ok?
    password: Current Password

    wrong-password: Wrong password.
    success: Your account is deleted successfully.

zh-cn:
  error: 发生一些问题。不如再试一次？

  password:
    title: 更改密码
    old: 旧的密码
    new: 新密码
    placeholder: 长度必须在8位到16位之间
    confirm: 确认密码
    button: 修改密码
    wrong-password: 原密码错误
    success: 密码修改成功，请重新登录
    strength:
      - 很弱
      - 较弱
      - 中等
      - 较强
      - 很强

  nickname:
    field: 昵称
    title: 更改昵称
    blank: 当前未设置昵称
    rule: 可使用除一些特殊符号外的任意字符
    success: 昵称已成功设置为 {nickname}

  email:
    title: 更改邮箱
    new: 新邮箱
    password: 当前密码
    button: 修改邮箱
    wrong-password: 密码错误
    success: 邮箱修改成功，请重新登录

  delete:
    title: 删除账号
    notice: 确定要删除您的账号吗？
    admin: 管理员账号不能被删除哟
    button: 删除我的账户

    modal-title: 这是危险操作，输入密码以继续
    modal-notice: |
      此操作不可恢复！
      您所上传至皮肤库的材质仍会被保留，但您的角色将被永久删除。
      我们不提供任何备份，或者神奇的撤销按钮。
      我们警告过您了，确定要这样做吗？
    password: 当前密码

    wrong-password: 密码错误
    success: 账号已被成功删除
</i18n>
