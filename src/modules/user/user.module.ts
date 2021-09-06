import { Module } from '@nestjs/common'
import { UserController } from 'modules/user/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { UserService } from 'modules/user/user.service'
import { AuthGuard } from 'modules/user/guards/auth.guard'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, AuthGuard],
    exports: [UserService],
})
export class UserModule {}
