import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import {Todo} from "../todo/todo.entity";

@Entity()
export class Shadow {

    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id?: number;

    @Column()
    @ApiModelProperty()
    clientReplicaId: string;

    @Column()
    @ApiModelProperty()
    localVersion: number;

    @Column()
    @ApiModelProperty()
    remoteVersion: number;

    @Column("simple-json", {nullable: true})
    @ApiModelProperty()
    shadowCopy: Todo[] | undefined;
}