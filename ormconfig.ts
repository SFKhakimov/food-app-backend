import { ConnectionOptions } from 'typeorm'
import { DB_PORT, HOST, POSTGRES_DB, POSTGRES_PASSWORD } from 'config/env'

const config: ConnectionOptions = {
    type: 'postgres',
    host: HOST,
    port: DB_PORT,
    username: 'postgres',
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    synchronize: false,
    cli: {
        migrationsDir: 'migrations',
    },
}

export default config
