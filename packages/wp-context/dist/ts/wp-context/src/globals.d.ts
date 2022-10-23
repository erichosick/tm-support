import { WpContextConfig, WpContextConfigs, WpDestination, WpDestinations, WpHtmlElement } from "./types";
interface tmHtml {
    getElementFromElements(htmlElement: WpHtmlElement): Element;
    getElement(htmlElement: WpHtmlElement): Element;
    getFormElement(htmlElement: WpHtmlElement): HTMLFormElement;
}
interface tmDefaults {
    tmContextConfigDefault: WpContextConfigs;
}
interface tmGlobal {
    uuidGenerate(): string;
    wpContextApply(context: unknown, apply: WpDestination | WpDestinations): void;
    wpContextBuild(config: WpContextConfigs | WpContextConfig): unknown;
    wpSessionInit(): void;
    wpSessionGet(): object;
    wpSessionSet(context: object): object;
    html: tmHtml;
    defaults: tmDefaults;
}
declare global {
    interface Window {
        tm: tmGlobal;
    }
}
export {};
//# sourceMappingURL=globals.d.ts.map