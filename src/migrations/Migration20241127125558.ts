import { Migration } from '@mikro-orm/migrations';

export class Migration20241127125558 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "users" alter column "id" type varchar(255) using ("id"::varchar(255));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" alter column "id" drop default;`);
    this.addSql(`alter table "users" alter column "id" type uuid using ("id"::text::uuid);`);
  }

}
