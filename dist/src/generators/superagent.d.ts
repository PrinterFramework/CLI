export declare type SuperagentTypes = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
export declare function injectSupergent(type: SuperagentTypes, component: string): Promise<void>;
