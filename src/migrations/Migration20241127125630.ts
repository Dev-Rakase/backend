import { Migration } from '@mikro-orm/migrations';

export class Migration20241127125630 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" alter column "id" type bigint using ("id"::bigint);`);
    this.addSql(`create sequence if not exists "users_id_seq";`);
    this.addSql(`select setval('users_id_seq', (select max("id") from "users"));`);
    this.addSql(`alter table "users" alter column "id" set default nextval('users_id_seq');`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "users" alter column "id" drop default;`);
  }

}
