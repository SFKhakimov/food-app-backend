import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Request,
} from '@nestjs/common'
import { UserService } from 'modules/user/user.service'
import { UserCreateDto } from 'modules/user/dto/userCreate.dto'
import { UserResponseInterface } from 'modules/user/types/userResponse.interface'
import { UserLoginDto } from 'modules/user/dto/userLogin.dto'
import { User } from 'modules/user/decorators/user.decorator'
import { UserEntity } from 'modules/user/user.entity'
import { AuthGuard } from 'modules/user/guards/auth.guard'
import { UpdateUserDto } from 'modules/user/dto/updateUserDto.dto'
import { ExpressRequestInterface } from 'common/types/expressRequest.interface'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('login')
    @UsePipes(new ValidationPipe())
    async loginUser(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.login(userLoginDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body() userCreateDto: UserCreateDto,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(userCreateDto)
        return this.userService.buildUserResponse(user)
    }

    @Get()
    @UseGuards(AuthGuard)
    async currentUser(
        @User() user: UserEntity,
    ): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(user)
    }

    @Put()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateCurrentUser(
        @Body() body: UpdateUserDto,
        @User('id') id: number,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(body, id)
        return this.userService.buildUserResponse(user)
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    async logoutUser(
        @Request() req: ExpressRequestInterface,
    ): Promise<{ success: boolean }> {
        return {
            success: await this.userService.logoutUser(req),
        }
    }
}
