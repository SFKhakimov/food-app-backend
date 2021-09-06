import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { hash } from 'bcrypt'
import { SALT } from 'common/constants/env'

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, process.env.SALT || SALT)
    }
}
