import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { ExpressRequestInterface } from 'common/types/expressRequest.interface'
import { JwtPayload, verify } from 'jsonwebtoken'
import { JWT_SECRET } from 'common/constants/env'
import { UserService } from 'modules/user/user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null
            next()
            return
        }

        const token = req.headers.authorization

        try {
            const decode = verify(
                token,
                process.env.JWT || JWT_SECRET,
            ) as JwtPayload
            const user = await this.userService.findById(decode.id)
            req.user = user
            next()
        } catch (err) {
            req.user = null
            next()
        }
    }
}
