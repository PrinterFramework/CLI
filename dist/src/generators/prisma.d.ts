interface ModelType {
    name: string;
    type: string;
    imported: boolean;
}
export declare function generateImports(models: ModelType[]): string;
export declare function generatePrismaTypes(): Promise<void>;
export {};
