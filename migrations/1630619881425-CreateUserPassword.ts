import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserPassword1630619881425 implements MigrationInterface {
    name = 'CreateUserPassword1630619881425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "avatar" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "avatar" DROP DEFAULT`);
    }

}
