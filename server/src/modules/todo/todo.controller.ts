import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation} from '@nestjs/swagger';
import {TodoDto} from "./todo.dto";
import {Todo} from "./todo.entity";
import {TodoService} from "./todo.service";

@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) {
  }

  @Get('')
  @ApiOperation({title: 'Retrieve all records'})
  @ApiOkResponse({description: 'All Todos', type: TodoDto, isArray: true})
  async getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
  @ApiOperation({title: 'Get a single record'})
  @ApiOkResponse({description: 'The record.', type: TodoDto})
  @ApiNotFoundResponse({description: `Couldn't find record by id.`})
  async getOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getOne(+id);
  }

  @Post('')
  @ApiOperation({title: 'Create a record'})
  @ApiCreatedResponse({description: 'The record has been successfully created.'})
  async add(@Body() todo: TodoDto) {
    return this.todoService.add(todo);
  }

  @Patch(':id')
  @ApiOperation({title: 'Update a record'})
  @ApiOkResponse({description: 'The updated record.', type: TodoDto})
  @ApiNotFoundResponse({description: `Couldn't find record by id.`})
  async update(@Param('id') id: string, @Body() updates: TodoDto) {
    return this.todoService.update(+id, updates);
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete a record'})
  @ApiOkResponse({description: 'Record deleted.'})
  @ApiNotFoundResponse({description: `Couldn't find record by id.`})
  async remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }

}
