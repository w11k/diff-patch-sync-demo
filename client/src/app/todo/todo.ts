export class Todo {
    id!: string;
    title!: string;
    complete!: boolean;
    createdAt!: string;
    updatedAt!: string;
    
    constructor(id: string, title: string, complete: boolean, createdAt: string = new Date().toISOString(), updatedAt = new Date().toISOString()) {
      this.id = id;
      this.title = title;
      this.complete = complete;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}
