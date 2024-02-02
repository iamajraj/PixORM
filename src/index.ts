import 'reflect-metadata';
import { PixORM, Table, Column } from './pixorm/index';

@Table('users')
class User {
  @Column()
  username!: string;

  @Column()
  email!: string;
}

const userSchema = PixORM.generateSchema(User);
console.log(userSchema);
