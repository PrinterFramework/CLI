export interface OptsType {
    state: boolean;
    action: boolean;
}
export declare function inject(slice: string, component: string, opts: OptsType): Promise<void>;
