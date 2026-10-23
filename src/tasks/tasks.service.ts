import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [
    {
      id: '1',
      title: 'title',
      description: 'description',
      status: TaskStatus.OPEN,
    },
  ];

  findAll(): ITask[] {
    return this.tasks;
  }

  findOne(id: string): ITask | undefined {
    return this.tasks.find((task) => task.id === id);
  }
}
