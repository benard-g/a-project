import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('lobbies')
export class LobbyEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;
}
