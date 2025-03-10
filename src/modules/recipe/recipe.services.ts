import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { EditRecipeDto } from 'modules/recipe/dto/EditRecipe.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { RecipeEntity } from 'modules/recipe/recipe.entity'
import { getRepository, Repository } from 'typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { QueryRecipesInterface } from 'modules/recipe/interfaces/QueryRecipes.interface'
import { ResponsePaginationInterface } from 'common/types/response.interface'

@Injectable()
export class RecipeServices {
    constructor(
        @InjectRepository(RecipeEntity)
        private readonly recipeRepository: Repository<RecipeEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async recipes(
        id: number,
        query: QueryRecipesInterface,
    ): Promise<ResponsePaginationInterface<RecipeEntity>> {
        const { limit = 10, page = 1, author, categories, my } = query
        const offset = +limit * (+page - 1)
        const queryBuilder = getRepository(RecipeEntity)
            .createQueryBuilder('recipes')
            .leftJoinAndSelect('recipes.author', 'author')

        queryBuilder.orderBy('recipes.createdAt', 'ASC')

        queryBuilder.limit(+limit)
        queryBuilder.offset(offset)

        if (author) {
            const user = await this.userRepository.findOne({
                userName: author,
            })
            queryBuilder.andWhere('recipes.authorId = :id', {
                id: user.id,
            })
        }

        if (categories && categories.length) {
            queryBuilder.andWhere(
                'recipes.categories && ARRAY[:...categories]',
                {
                    categories,
                },
            )
        }

        if (my) {
            queryBuilder.andWhere('recipes.authorId = :id', {
                id,
            })
        }

        const recipes = await queryBuilder.getMany()
        const count = await queryBuilder.getCount()

        return {
            items: recipes,
            limit: +limit,
            count,
            page: +page,
        }
    }

    async createRecipe(
        user: UserEntity,
        editRecipeDto: EditRecipeDto,
    ): Promise<RecipeEntity> {
        const recipe = new RecipeEntity()

        Object.assign(recipe, editRecipeDto)

        recipe.author = user

        return await this.recipeRepository.save(recipe)
    }

    async deleteRecipe(id: number): Promise<RecipeEntity> {
        const recipe = await this.findById(id)

        await this.recipeRepository.delete({ id })

        return recipe
    }

    async updateRecipe(
        id: number,
        editRecipeDto: EditRecipeDto,
    ): Promise<RecipeEntity> {
        const recipe = await this.findById(id)

        Object.assign(recipe, editRecipeDto)

        return await this.recipeRepository.save(recipe)
    }

    async findById(id: number): Promise<RecipeEntity> {
        const recipe = await this.recipeRepository.findOne(id, {
            relations: ['author'],
        })

        if (!recipe) {
            throw new HttpException('Рецепт не найден', HttpStatus.BAD_REQUEST)
        }

        return recipe
    }

    async likeRecipe(id: number, recipeId: number): Promise<RecipeEntity> {
        const user = await this.userRepository.findOne(
            { id },
            { relations: ['favorites'] },
        )
        const recipe = await this.recipeRepository.findOne({ id: recipeId })

        const isNotFavorited = !user.favorites.find(
            (favoritesRecipe) => favoritesRecipe.id === recipe.id,
        )

        if (isNotFavorited) {
            user.favorites.push(recipe)
            recipe.likesQuantity++
            recipe.liked = true
            await this.userRepository.save(user)
            await this.recipeRepository.save(recipe)
        }

        return recipe
    }

    async unLikeRecipe(id: number, recipeId: number): Promise<RecipeEntity> {
        const user = await this.userRepository.findOne(
            { id },
            { relations: ['favorites'] },
        )

        const recipe = await this.recipeRepository.findOne({ id: recipeId })

        const isFavoritedIndex = user.favorites.findIndex(
            (favoritesRecipe) => favoritesRecipe.id === recipe.id,
        )

        if (isFavoritedIndex >= 0) {
            user.favorites.splice(isFavoritedIndex, 1)
            recipe.likesQuantity--
            recipe.liked = false
            await this.userRepository.save(user)
            await this.recipeRepository.save(recipe)
        }

        return recipe
    }
}
