import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { ExpressRequestInterface } from 'common/types/expressRequest.interface'
import { ADMIN_ROLE } from 'common/constants/roles'

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<ExpressRequestInterface>()

        if (req.user.roles.includes(ADMIN_ROLE)) {
            return true
        }

        throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
    }
}
