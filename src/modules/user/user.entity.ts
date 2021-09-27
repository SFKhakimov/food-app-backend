import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { hash } from 'bcrypt'
import { SALT } from 'common/constants/env'
import { USER_ROLE } from 'common/constants/roles'
import { RecipeEntity } from 'modules/recipe/recipe.entity'

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    email: string

    @Column({ default: '' })
    avatar: string

    @Column({ select: false })
    password: string

    @Column('simple-array', { array: true, default: [USER_ROLE] })
    roles: string[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, process.env.SALT || SALT)
    }

    @OneToMany(() => RecipeEntity, (recipe) => recipe.author)
    recipes: RecipeEntity[]
}
