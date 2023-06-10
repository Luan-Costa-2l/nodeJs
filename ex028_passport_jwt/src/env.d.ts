export interface IProcessEnv {
    readonly PGSQL_DB: string;
    readonly PGSQL_PASSWORD: string;
    readonly PGSQL_PORT: string;
    readonly PGSQL_USER: string;
    readonly PORT: string;
    readonly JWT_SECRET: string;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IProcessEnv {}
    }
}