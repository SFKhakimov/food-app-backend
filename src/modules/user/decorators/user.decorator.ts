import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from 'modules/user/user.entity'
import { ExpressRequestInterface } from 'common/types/expressRequest.interface'

export const User = createParamDecorator(
    (
        data: keyof Omit<UserEntity, 'password' | 'hashPassword'>,
        ctx: ExecutionContext,
    ) => {
        const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>()

        if (!request.user) return null

        if (data) {
            return request.user[data]
        }

        return request.user
    },
)
