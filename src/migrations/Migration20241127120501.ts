import { Migration } from '@mikro-orm/migrations';

export class Migration20241127120501 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" alter column "bio" type text using ("bio"::text);`);
    this.addSql(`alter table "users" alter column "bio" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" alter column "bio" type text using ("bio"::text);`);
    this.addSql(`alter table "users" alter column "bio" set not null;`);
  }

}
