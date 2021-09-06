import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'modules/user/user.module'
import ormconfig from '../ormconfig'
import { AuthMiddleware } from 'modules/user/middlewares/auth.middleware'

@Module({
    imports: [TypeOrmModule.forRoot(ormconfig), UserModule],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        })
    }
}
