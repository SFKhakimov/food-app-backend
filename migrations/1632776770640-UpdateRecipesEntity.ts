import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRecipesEntity1632776770640 implements MigrationInterface {
    name = 'UpdateRecipesEntity1632776770640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipes" ALTER COLUMN "likesQuantity" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipes" ALTER COLUMN "likesQuantity" DROP DEFAULT`);
    }

}
