import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum BotActive {
  on = 'on',
  off = 'off',
  paused = 'paused',
}

@Entity('bot')
export class CustomBotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  active: BotActive;
}
