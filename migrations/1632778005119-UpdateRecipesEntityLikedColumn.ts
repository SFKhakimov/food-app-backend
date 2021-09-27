import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRecipesEntityLikedColumn1632778005119 implements MigrationInterface {
    name = 'UpdateRecipesEntityLikedColumn1632778005119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipes" ALTER COLUMN "liked" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."recipes" ALTER COLUMN "liked" DROP DEFAULT`);
    }

}
