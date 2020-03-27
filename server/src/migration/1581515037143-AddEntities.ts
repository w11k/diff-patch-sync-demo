import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEntities1581515037143 implements MigrationInterface {
    name = 'AddEntities1581515037143'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "shadow" ("id" SERIAL NOT NULL, "clientReplicaId" character varying NOT NULL, "localVersion" integer NOT NULL, "remoteVersion" integer NOT NULL, "shadow" text, CONSTRAINT "PK_01e6d4ba8a1f1e7dc5fb50f7d67" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "complete" boolean NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "todo"`, undefined);
        await queryRunner.query(`DROP TABLE "shadow"`, undefined);
    }

}
