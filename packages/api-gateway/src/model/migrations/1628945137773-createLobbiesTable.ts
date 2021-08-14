import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLobbiesTable1628945137773 implements MigrationInterface {
  name = 'createLobbiesTable1628945137773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lobbies" ("id" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_93d4e0c6f527286e712d53a8a57" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lobbies"`);
  }
}
