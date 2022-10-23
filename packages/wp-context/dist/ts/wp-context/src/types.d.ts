export interface WpContextSource {
    type: 'param' | 'header' | 'cookie' | 'local_storage' | 'url' | 'referrer' | 'uuid' | 'location';
    name: string;
}
export interface WpHtmlElement {
    elementType: string;
    attributeName: string;
    attributeValue: string;
}
export interface WpFormFieldDestination {
    pullFrom: string;
    destination: WpHtmlElement;
}
export interface WpFormDestination {
    form: WpHtmlElement;
    formInput: WpFormFieldDestination | WpFormFieldDestination[];
}
export declare type WpDestination = WpFormDestination | WpFormFieldDestination;
export declare type WpDestinations = WpDestination[];
export declare type WpContextConfig = {
    required?: boolean;
    mapTo: string;
    default?: string | number | unknown[];
    source: WpContextSource | WpContextSource[];
};
export declare type WpContextConfigs = WpContextConfig[];
export declare const WP_CONTEXT_SESSION_KEY = "7f6b9c4c-4430-45b4-8696-be90fa8e147e";
//# sourceMappingURL=types.d.ts.map