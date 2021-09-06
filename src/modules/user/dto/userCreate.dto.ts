import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserCreateDto {
    @IsNotEmpty()
    readonly userName: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string
}
