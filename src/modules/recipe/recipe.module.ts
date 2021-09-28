import { Module } from '@nestjs/common'
import { RecipeController } from './recipe.controller'
import { RecipeServices } from 'modules/recipe/recipe.services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecipeEntity } from 'modules/recipe/recipe.entity'
import { UserEntity } from 'modules/user/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([RecipeEntity, UserEntity])],
    controllers: [RecipeController],
    providers: [RecipeServices],
})
export class RecipeModule {}
