import { Entity, PrimaryKey, Property, t } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Property({ type: t.text })
  bio: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
