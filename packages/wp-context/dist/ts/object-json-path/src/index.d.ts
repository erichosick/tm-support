export interface JsonPathValue {
    path: string;
    value: unknown;
}
export declare type JsonPathValues = JsonPathValue[];
export declare const insertIntoObject: (jsonObject: unknown, jsonPathValues: JsonPathValue | JsonPathValues) => unknown;
export declare const getFromObject: (jsonObject: unknown, path: string) => any;
//# sourceMappingURL=index.d.ts.map