import {MigrationInterface, QueryRunner} from "typeorm";

export class alterShadowEntity1582011661286 implements MigrationInterface {
    name = 'alterShadowEntity1582011661286'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shadow" RENAME COLUMN "shadow" TO "shadowCopy"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shadow" RENAME COLUMN "shadowCopy" TO "shadow"`, undefined);
    }

}
