import { Module } from '@nestjs/common'
import { RecipeController } from './recipe.controller'
import { RecipeServices } from 'modules/recipe/recipe.services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RecipeEntity } from 'modules/recipe/recipe.entity'

@Module({
    imports: [TypeOrmModule.forFeature([RecipeEntity])],
    controllers: [RecipeController],
    providers: [RecipeServices],
})
export class RecipeModule {}
