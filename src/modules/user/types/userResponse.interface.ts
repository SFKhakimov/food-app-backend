import { UserEntity } from 'modules/user/user.entity'

export type UserResponseInterface = Omit<UserEntity, 'hashPassword'>
