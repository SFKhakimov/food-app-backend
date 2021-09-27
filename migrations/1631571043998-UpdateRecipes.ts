import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRecipes1631571043998 implements MigrationInterface {
    name = 'UpdateRecipes1631571043998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipes" DROP COLUMN "steps"`);
        await queryRunner.query(`ALTER TABLE "public"."recipes" ADD "steps" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipes" DROP COLUMN "steps"`);
        await queryRunner.query(`ALTER TABLE "public"."recipes" ADD "steps" character varying NOT NULL`);
    }

}
