import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
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
import { QueryRecipesInterface } from 'modules/recipe/interfaces/QueryRecipes.interface'
import { ResponsePaginationInterface } from 'common/types/response.interface'

@Controller('recipes')
export class RecipeController {
    constructor(private readonly recipeService: RecipeServices) {}

    @Get()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async recipes(
        @User('id') id: number,
        @Query() query: QueryRecipesInterface,
    ): Promise<ResponsePaginationInterface<RecipeEntity>> {
        return await this.recipeService.recipes(id, query)
    }

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

    @Post(':recipeId/like')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async likeRecipe(
        @User('id') id: number,
        @Param('recipeId') recipeId: number,
    ): Promise<RecipeEntity> {
        return this.recipeService.likeRecipe(id, recipeId)
    }

    @Delete(':recipeId/like')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async unLikeRecipe(
        @User('id') id: number,
        @Param('recipeId') recipeId: number,
    ): Promise<RecipeEntity> {
        return this.recipeService.unLikeRecipe(id, recipeId)
    }
}
