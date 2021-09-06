import { UserEntity } from 'modules/user/user.entity'

export interface UserResponseInterface
    extends Omit<UserEntity, 'hashPassword'> {
    token: string
}
