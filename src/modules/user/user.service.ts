import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { Repository } from 'typeorm'
import { UserCreateDto } from 'modules/user/dto/userCreate.dto'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from 'common/constants/env'
import { UserResponseInterface } from 'modules/user/types/userResponse.interface'
import { UserLoginDto } from 'modules/user/dto/userLogin.dto'
import { compare } from 'bcrypt'
import { UpdateUserDto } from 'modules/user/dto/updateUserDto.dto'
import { ExpressRequestInterface } from 'common/types/expressRequest.interface'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async login(userLoginDto: UserLoginDto): Promise<UserEntity> {
        const currentUser = await this.userRepository.findOne(
            {
                email: userLoginDto.email,
            },
            { select: ['id', 'userName', 'avatar', 'email', 'password'] },
        )

        if (!currentUser) {
            throw new HttpException(
                'Пользователь с таким email и паролем не найден',
                HttpStatus.FORBIDDEN,
            )
        }

        const isPasswordCorrect = await compare(
            userLoginDto.password,
            currentUser.password,
        )

        if (!isPasswordCorrect) {
            throw new HttpException(
                'Пользователь с таким email и паролем не найден',
                HttpStatus.FORBIDDEN,
            )
        }

        delete currentUser.password

        return currentUser
    }

    async createUser(userCreateDto: UserCreateDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            email: userCreateDto.email,
        })

        if (userByEmail) {
            throw new HttpException(
                'Пользователь с таким email уже существует',
                HttpStatus.UNPROCESSABLE_ENTITY,
            )
        }
        const newUser = new UserEntity()
        Object.assign(newUser, userCreateDto)
        return await this.userRepository.save(newUser)
    }

    async updateUser(userDto: UpdateUserDto, id: number): Promise<UserEntity> {
        const user = await this.findById(id)

        Object.assign(user, userDto)

        return await this.userRepository.save(user)
    }

    async logoutUser(req: ExpressRequestInterface): Promise<boolean> {
        req.user = null
        return true
    }

    generateJwt(user: UserEntity): string {
        return sign(
            {
                id: user.id,
                name: user.userName,
                email: user.email,
            },
            process.env.JWT || JWT_SECRET,
        )
    }

    findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne(id)
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            ...user,
            token: this.generateJwt(user),
        }
    }
}
