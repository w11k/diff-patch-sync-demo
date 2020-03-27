import {ApiModelProperty} from '@nestjs/swagger';
import {IsOptional} from "class-validator";
import {Todo} from "./todo.entity";

export class TodoDto implements Todo {
  @ApiModelProperty() readonly id: string;
  @ApiModelProperty() readonly title: string;
  @ApiModelProperty() readonly complete: boolean;

  @IsOptional() createdAt: string;
  @IsOptional() updatedAt: string | undefined;
}
