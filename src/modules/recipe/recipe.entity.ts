import {
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from 'modules/user/user.entity'
import { StepInterface } from 'modules/recipe/interfaces/Step.interface'

@Entity({ name: 'recipes' })
export class RecipeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    cookingTime: number

    @Column({ default: 0 })
    likesQuantity: number

    @Column({ type: 'json' })
    steps: StepInterface[]

    @Column({ default: false })
    liked: boolean

    @Column('text', { array: true })
    categories: string[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date

    @BeforeUpdate()
    updateTimestamp() {
        this.updateAt = new Date()
    }

    @ManyToOne(() => UserEntity, (user) => user.recipes)
    author: UserEntity
}
