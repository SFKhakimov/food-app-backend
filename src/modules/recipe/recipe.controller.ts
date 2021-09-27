import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from 'modules/user/guards/auth.guard'
import { User } from 'modules/user/decorators/user.decorator'
import { EditRecipeDto } from 'modules/recipe/dto/EditRecipe.dto'
import { RecipeServices } from 'modules/recipe/recipe.services'
import { UserEntity } from 'modules/user/user.entity'
import { RecipeEntity } from 'modules/recipe/recipe.entity'

@Controller('recipes')
export class RecipeController {
    constructor(private readonly recipeService: RecipeServices) {}
    @Post('create')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createRecipe(
        @User() user: UserEntity,
        @Body() editRecipeDto: EditRecipeDto,
    ): Promise<RecipeEntity> {
        return await this.recipeService.createRecipe(user, editRecipeDto)
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async recipe(@Param('id') id: number): Promise<RecipeEntity> {
        return await this.recipeService.findById(id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async deleteRecipe(@Param('id') id: number): Promise<RecipeEntity> {
        return this.recipeService.deleteRecipe(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateRecipe(
        @Param('id') id: number,
        @Body() editRecipeDto: EditRecipeDto,
    ): Promise<RecipeEntity> {
        return this.recipeService.updateRecipe(id, editRecipeDto)
    }
}
