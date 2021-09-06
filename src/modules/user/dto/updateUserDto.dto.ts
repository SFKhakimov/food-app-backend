import { IsEmail, IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
    @IsNotEmpty()
    readonly userName: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string
}
