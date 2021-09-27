import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { StepInterface } from 'modules/recipe/interfaces/Step.interface'

class Step {
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    readonly photo: string
}

export class EditRecipeDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    readonly cookingTime: number

    @ValidateNested()
    readonly steps: Step[]

    @IsNotEmpty()
    readonly categories: string[]
}
