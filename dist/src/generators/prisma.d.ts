interface ModelType {
    original: string;
    name: string;
    type: string;
    imported: boolean;
}
export declare function generateImports(models: ModelType[]): string;
export declare function generatePrismaTypes(): Promise<void>;
export {};
