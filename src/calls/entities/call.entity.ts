import { Contact } from 'src/contacts/contact.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'calls_history' })
export class Call {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_call: Date;

  @Column()
  duration: number;

  @Column()
  contact_call: number;

  @ManyToOne(() => Contact, (contact) => contact.calls)
  contact: Contact;
}
