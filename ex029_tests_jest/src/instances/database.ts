import dotenv from 'dotenv';
dotenv.config();

let db = {
    db: process.env.PGSQL_DB as string,
    user: process.env.PGSQL_USER as string,
    password: process.env.PGSQL_PASSWORD as string,
    port: process.env.PGSQL_PORT as string,
}

if (process.env.NODE_ENV === 'test') {
    db = {
        db: process.env.PGSQL_TEST_DB as string,
        user: process.env.PGSQL_TEST_USER as string,
        password: process.env.PGSQL_TEST_PASSWORD as string,
        port: process.env.PGSQL_TEST_PORT as string,
    }

}

export default db;