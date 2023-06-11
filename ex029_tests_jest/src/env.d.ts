export interface IProcessEnv {
    readonly PORT: string;

    readonly PGSQL_DB: string;
    readonly PGSQL_USER: string;
    readonly PGSQL_PORT: string;
    readonly PGSQL_PASSWORD: string;

    readonly PGSQL_TEST_DB: string;
    readonly PGSQL_TEST_USER: string;
    readonly PGSQL_TEST_PORT: string;
    readonly PGSQL_TEST_PASSWORD: string;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends IProcessEnv {}
    }
}