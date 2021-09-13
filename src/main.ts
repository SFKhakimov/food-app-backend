import * as cookieParser from 'cookie-parser'
if (process.env.DEVELOP) {
    require('module-alias/register')
}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(cookieParser())
    await app.listen(3000)
}
bootstrap()
