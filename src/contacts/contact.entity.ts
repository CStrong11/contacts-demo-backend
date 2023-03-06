import { Call } from 'src/calls/entities/call.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { info } from './info.entity';
//tabla de contactos
@Entity({ name: 'contacts_list' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  cell_phone: string;

  @Column()
  address: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  //Relación de uno a uno en la información de contacto
  @OneToOne(() => info)
  @JoinColumn()
  info: info;

  //Relación de uno a muchos en registro de llamadas
  @OneToMany(() => Call, (call) => call.contact)
  calls: Call[];
}
