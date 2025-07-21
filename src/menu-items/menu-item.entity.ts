import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column('simple-array', { nullable: true })
  sizes: string[];
}
