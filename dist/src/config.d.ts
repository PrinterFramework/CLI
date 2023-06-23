export interface PrinterConfig {
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
