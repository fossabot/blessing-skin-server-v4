import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueApollo from 'vue-apollo';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';
import { AxiosInstance } from 'axios';
import { Moment } from 'moment';
import { DocumentNode } from 'graphql';

declare module 'vue/types/vue' {
    interface Vue {
        $Message: {
            success: (
                message: string | VueI18n.TranslateResult
            ) => Promise<void>;
            warning: (
                message: string | VueI18n.TranslateResult
            ) => Promise<void>;
            error: (message: string | VueI18n.TranslateResult) => Promise<void>;
        };

        $ajax: AxiosInstance;
    }
}

declare module 'moment' {
    export function preciseDiff(
        d1: Moment,
        d2: Moment,
        returnValueObject: false
    ): string;

    export function preciseDiff(
        d1: Moment,
        d2: Moment,
        returnValueObject: true
    ): {
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        firstDateWasLater: boolean;
    };
}

declare module 'vue-apollo/types/vue-apollo' {
    interface ApolloProperty<V> {
        query<R extends { data: any }>(
            options: VueApolloQueryOptions<V, R>
        ): Promise<R>;
    }
}
