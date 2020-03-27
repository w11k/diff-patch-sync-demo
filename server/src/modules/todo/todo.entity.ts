import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class Todo{

    @PrimaryGeneratedColumn('uuid')
    @ApiModelProperty()
    id: string;

    @Column()
    @ApiModelProperty()
    title!: string;

    @Column()
    @ApiModelProperty()
    complete!: boolean;

    @Column()
    @ApiModelProperty()
    createdAt: string;

    @Column()
    @ApiModelProperty()
    updatedAt: string | undefined;
}