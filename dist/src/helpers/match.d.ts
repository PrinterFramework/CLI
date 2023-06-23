export declare const SliceMatcher: RegExp;
export declare const ImportMatcher: RegExp;
export declare const ReduxMatcher: RegExp;
export declare const ReduxOptionalMatcher: RegExp;
export declare const DispatchMatcher: RegExp;
export declare const BraceMatcher: RegExp;
export declare const BraceMatcher2: RegExp;
export declare function superagentMatcher(type: string): RegExp;
export declare function stateMatcher(): RegExp;
export declare function effectMatcher(): RegExp;
export declare function functionMatcher(name: string): RegExp;
export declare function selectorMatcher(name: string): RegExp;
export declare function actionMatcher(name: string[]): RegExp;
export declare function typeMatcher(name: string): RegExp;
export declare function findMatches(text: any, pattern: any): number[];
