import './globals';
declare const tm: {
    uuidGenerate: () => string;
    wpContextApply: (context: unknown, apply: import("./types").WpDestination | import("./types").WpDestinations) => void;
    wpContextBuild: (config: import("./types").WpContextConfigs | import("./types").WpContextConfig) => unknown;
    wpSessionInit: () => void;
    wpSessionGet: () => object;
    wpSessionSet: (context: object) => object;
    defaults: {
        tmContextConfigDefault: import("./types").WpContextConfigs;
    };
    html: {
        getElementFromElements: (htmlElement: import("./types").WpHtmlElement) => Element;
        getElement: (htmlElement: import("./types").WpHtmlElement) => Element;
        getFormElement: (htmlElement: import("./types").WpHtmlElement | undefined) => HTMLFormElement;
    };
};
export default tm;
//# sourceMappingURL=index.d.ts.map