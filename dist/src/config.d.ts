export interface PrinterConfig {
    componentFolder?: boolean;
    component?: {
        index?: boolean;
        component?: boolean;
        style?: boolean;
        test?: boolean;
    };
    crud?: {
        create: boolean;
        update: boolean;
        delete: boolean;
        list: boolean;
        get: boolean;
    };
}
export declare let Config: PrinterConfig;
export declare function registerConfig(): void;
