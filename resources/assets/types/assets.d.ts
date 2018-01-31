declare module '*.gql' {
    const content: any;
    export default content;
}

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module '*.yaml' {
    const content: any;
    export default content;
}
