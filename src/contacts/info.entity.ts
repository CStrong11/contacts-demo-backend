import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'contact_info' })
export class info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  birthday: string;

  @Column()
  age: number;
}
