import 'reflect-metadata';
import { PixORM, Table, Column } from './pixorm/index';

@Table('users')
class User {
  @Column({ fieldName: 'user_id' })
  userId: number;

  @Column({ type: 'TEXT' })
  username: string;

  @Column({ type: 'VARCHAR(100)', fieldName: 'user_email' })
  userEmail: string;
}

const userSchema = PixORM.generateSchema(User);
console.log(userSchema);
