/*
 * User Entity
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  solution: string;

  @Column()
  displayed: boolean;

  @Column()
  isDisplay: boolean;

  @Column('bigint', { array: true })
  displayed_at: number[];

}
