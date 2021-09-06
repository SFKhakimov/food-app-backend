import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { ExpressRequestInterface } from 'common/types/expressRequest.interface'

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context
            .switchToHttp()
            .getRequest<ExpressRequestInterface>()

        if (request.user) {
            return true
        }
        throw new HttpException(
            'Пользователь не авторизован',
            HttpStatus.UNAUTHORIZED,
        )
    }
}
