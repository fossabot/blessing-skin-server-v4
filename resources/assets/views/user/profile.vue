<template>
    <Row :gutter="16">
        <Col :xs="24" :lg="12">
            <Card>
                <p slot="title" v-t="`password.title`"></p>
                <Form ref="password" :model="password.data" :rules="password.rules">
                    <FormItem prop="old" :label="$t('password.old')">
                        <Input v-model="password.data.old" type="password" />
                    </FormItem>
                    <FormItem prop="new" :label="$t('password.new')">
                        <span>{{ passwordStrength }}</span>
                        <Input
                            :placeholder="$t('password.placeholder')"
                            v-model="password.data.new"
                            type="password"
                            @input="password.data.confirm = ''"
                        />
                    </FormItem>
                    <FormItem prop="confirm" :label="$t('password.confirm')">
                        <Input v-model="password.data.confirm" type="password" />
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
                <Form ref="nickname" :model="nickname.data" :rules="nickname.rules">
                    <FormItem prop="nickname">
                        <Input
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
                <Form ref="email" :model="email.data" :rules="email.rules">
                    <FormItem :label="$t('email.new')" prop="email">
                        <AutoComplete
                            v-model="email.data.email"
                            :data="email.autoComplete"
                            @on-search="completeEmail"
                        />
                    </FormItem>
                    <FormItem :label="$t('email.password')" prop="password">
                        <Input type="password" v-model="email.data.password" />
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
                    <Form ref="delete" :model="deleteConfirm.data" :rules="deleteConfirm.rules">
                        <FormItem prop="password">
                            <Input
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

<script>
import gql from 'graphql-tag';
import zxcvbn from 'zxcvbn';

export default {
    data() {
        return {
            password: {
                rules: {
                    old: [
                        {
                            required: true,
                            message: this.$t('password.empty-old')
                        },
                        {
                            min: 6,
                            max: 16,
                            message: this.$t('password.invalid-old')
                        }
                    ],
                    new: [
                        {
                            required: true,
                            message: this.$t('password.empty-new')
                        },
                        {
                            min: 8,
                            max: 16,
                            message: this.$t('password.invalid-new')
                        }
                    ],
                    confirm: [
                        {
                            required: true,
                            message: this.$t('password.empty-confirm')
                        },
                        {
                            validator: (rule, value, callback) => {
                                if (value !== this.password.data.new) {
                                    callback(
                                        new Error(
                                            this.$t('password.invalid-confirm')
                                        )
                                    );
                                } else {
                                    return callback();
                                }
                            }
                        }
                    ]
                },
                data: {
                    old: '',
                    new: '',
                    confirm: ''
                },
                state: 'normal'
            },
            nickname: {
                rules: {
                    nickname: [
                        { required: true, message: this.$t('nickname.empty') },
                        { max: 16, message: this.$t('nickname.too-long') }
                    ]
                },
                data: {
                    nickname: ''
                },
                state: 'normal'
            },
            email: {
                rules: {
                    email: [
                        {
                            required: true,
                            message: this.$t('email.empty-email')
                        },
                        {
                            type: 'email',
                            message: this.$t('email.invalid-email')
                        },
                        {
                            validator: async (rule, value, callback) => {
                                if (value === this.$store.state.user.email) {
                                    return callback(
                                        new Error(
                                            this.$t('email.same-with-now')
                                        )
                                    );
                                }

                                const {
                                    data: { users }
                                } = await this.$apollo.query({
                                    query: gql`
                                        query {
                                            users(email: "${value}") {
                                                email
                                            }
                                        }
                                    `
                                });
                                if (users.length === 0) {
                                    return callback();
                                } else {
                                    callback(
                                        new Error(this.$t('email.existed'))
                                    );
                                }
                            },
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: this.$t('email.empty-password')
                        },
                        {
                            min: 6,
                            max: 16,
                            message: this.$t('password.invalid-old')
                        }
                    ]
                },
                data: {
                    email: '',
                    password: ''
                },
                state: 'normal',
                autoComplete: []
            },
            deleteConfirm: {
                rules: {
                    password: [
                        {
                            required: true,
                            message: this.$t('email.empty-password')
                        },
                        {
                            min: 6,
                            max: 16,
                            message: this.$t('password.invalid-old')
                        }
                    ]
                },
                data: {
                    password: ''
                },
                modal: false
            }
        };
    },
    methods: {
        validate(entry) {
            return this.$refs[entry].validate(this[entry].rules);
        },
        completeEmail(value) {
            if (!value) {
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
        showDeleteConfirm() {
            this.deleteConfirm.modal = true;
        },
        cancelDelete() {
            this.deleteConfirm.modal = false;
            this.deleteConfirm.data.password = '';
        },
        async deleteAccount() {
            const password = this.deleteConfirm.data.password;
            if (password.length < 6 || password.length > 16) {
                return;
            }

            try {
                const {
                    data: { deleteAccount: user }
                } = await this.$apollo.mutate({
                    mutation: gql`
                        mutation {
                            deleteAccount(password: "${password}") {
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
            } catch (error) {
                this.$Message.error(this.$t('error'));
            }
        },
        async updatePassword() {
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
        async updateNickname() {
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
            } catch (error) {
                this.nickname.state = 'error';
            }
        },
        async updateEmail() {
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
        passwordStrength() {
            return this.$t(
                `password.strength[${zxcvbn(this.password.data.new).score}]`
            );
        }
    }
};
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
    empty-old: Original password is required.
    empty-new: Empty new password.
    invalid-old: Invalid password. The length of password should between 6 and 16.
    invalid-new: Invalid password. The length of password should between 8 and 16.
    empty-confirm: Empty confirming password.
    invalid-confirm: Confirming password does not equal with password.
    strength:
      - Very weak
      - Weak
      - Middle level
      - Strong
      - Very Strong

  nickname:
    title: Change Nickname
    blank: No nickname is setted now.
    rule: Whatever you like expect special characters
    too-long: Your nickname is too long.
    empty: Empty nickname.
    success: Nickname is successfully updated to {nickname}

  email:
    title: Change Email
    new: New Email
    password: Current Password
    button: Change Email
    wrong-password: Wrong password.
    same-with-now: You are using this email now.
    existed: This email address is used.
    success: Email address updated successfully, please log in again.
    empty-email: Empty email address.
    invalid-email: Invalid format of email address.
    empty-password: Password is required.

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
    empty-old: 原密码不能为空
    empty-new: 新密码要好好填哦
    invalid-old: 无效的密码。密码长度应该大于 6 并小于 16。
    invalid-new: 无效的密码。密码长度应该大于 8 并小于 16。
    empty-confirm: 确认密码不能为空
    invalid-confirm: 密码和确认的密码不一样诶？
    strength:
      - 很弱
      - 较弱
      - 中等
      - 较强
      - 很强

  nickname:
    title: 更改昵称
    blank: 当前未设置昵称
    rule: 可使用除一些特殊符号外的任意字符
    too-long: 您的昵称太长了
    empty: 您还没有填写昵称哦
    success: 昵称已成功设置为 {nickname}

  email:
    title: 更改邮箱
    new: 新邮箱
    password: 当前密码
    button: 修改邮箱
    wrong-password: 密码错误
    same-with-now: 您现在已经使用这个邮箱。
    existed: 这个邮箱已经被别人占用啦
    success: 邮箱修改成功，请重新登录
    empty-email: 您还没有填写邮箱哦
    invalid-email: 邮箱格式不正确！
    empty-password: 密码要好好填哦

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
