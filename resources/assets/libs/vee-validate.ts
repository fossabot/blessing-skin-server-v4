import Vue from 'vue';
import VeeValidate from 'vee-validate';
import gql from 'graphql-tag';
import { apolloClient } from './apollo';

VeeValidate.Validator.extend('unique-email', {
    validate: async value => {
        const { data } = await apolloClient.query({
            query: gql`
                query {
                    users(email: "${value}") {
                        uid
                    }
                }
            `,
            variables: {
                email: value
            }
        });
        const { users } = data as { users: User[] };
        return users.length === 0;
    },
    getMessage: ''
});

Vue.use(VeeValidate, {
    dictionary: {
        en: {
            messages: {
                'unique-email': 'This email address is used by someone.'
            }
        },
        'zh-cn': {
            messages: {
                'unique-email': '这个邮箱已经被别人占用啦'
            }
        }
    }
});
