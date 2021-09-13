import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Req,
    Res,
    Query,
    Param,
} from '@nestjs/common'
import { UserService } from 'modules/user/user.service'
import { UserCreateDto } from 'modules/user/dto/userCreate.dto'
import { UserResponseInterface } from 'modules/user/types/userResponse.interface'
import { UserLoginDto } from 'modules/user/dto/userLogin.dto'
import { User } from 'modules/user/decorators/user.decorator'
import { UserEntity } from 'modules/user/user.entity'
import { AuthGuard } from 'modules/user/guards/auth.guard'
import { UpdateUserDto } from 'modules/user/dto/updateUserDto.dto'
import { Response } from 'express'
import { COOKIE_LIFE } from 'common/constants/cookie'
import { ExpressRequestInterface } from 'common/types/expressRequest.interface'
import { AdminGuard } from 'common/services/guards/Roles/admin.guard'
import { QueryPaginationInterface } from 'common/types/query.interface'
import { ResponsePaginationInterface } from 'common/types/response.interface'

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('user/login')
    @UsePipes(new ValidationPipe())
    async loginUser(
        @Body() userLoginDto: UserLoginDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.login(userLoginDto)
        const token = this.userService.generateJwt(user)
        res.cookie('Cookie', token, {
            maxAge: COOKIE_LIFE,
            httpOnly: true,
        })
        return this.userService.buildUserResponse(user)
    }

    @Post('user/create')
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body() userCreateDto: UserCreateDto,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(userCreateDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(
        @User() user: UserEntity,
        @Req() request: ExpressRequestInterface,
    ): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(user)
    }

    @Put('user')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateCurrentUser(
        @Body() body: UpdateUserDto,
        @User('id') id: number,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(body, id)
        return this.userService.buildUserResponse(user)
    }

    @Put('user/:id')
    @UseGuards(AuthGuard, AdminGuard)
    @UsePipes(new ValidationPipe())
    async updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
        const user = await this.userService.updateUser(body, +id)
        return this.userService.buildUserResponse(user)
    }

    @Post('user/logout')
    @UseGuards(AuthGuard)
    async logoutUser(
        @Res({ passthrough: true }) res: Response,
    ): Promise<{ success: boolean }> {
        res.cookie('Cookie', null)
        return {
            success: true,
        }
    }

    @Get('users')
    @UseGuards(AuthGuard, AdminGuard)
    async users(
        @Query() query: QueryPaginationInterface,
    ): Promise<ResponsePaginationInterface<UserEntity>> {
        return await this.userService.users(query)
    }
}
