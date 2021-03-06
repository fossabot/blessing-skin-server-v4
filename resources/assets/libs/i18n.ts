import Vue from 'vue';
import VueI18n from 'vue-i18n';
import generalText from './i18n.yaml';
import 'core-js/fn/array/includes';

Vue.use(VueI18n);

export function lang(): string {
    const preset = localStorage.getItem('language');
    if (preset) return preset;

    const fallback = 'zh-cn';
    const supported = ['zh-cn', 'en'];
    const convertRules: { [key: string]: string } = {
        'zh-hans': 'zh-cn',
        'en-us': 'en'
    };

    const nav = navigator.language.toLowerCase();
    if (supported.includes(nav)) {
        return nav;
    } else if (supported.includes(convertRules[nav])) {
        return convertRules[nav];
    } else {
        return fallback;
    }
}

export default new VueI18n({
    locale: lang(),
    fallbackLocale: 'zh-cn',
    messages: generalText,
    silentTranslationWarn: true
});
