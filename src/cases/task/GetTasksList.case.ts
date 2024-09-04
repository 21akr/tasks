import { BaseCaseInterface, BaseCaseParamsInterface, BaseListInterface, Repository, TaskEntity } from '../../core';
import { ListParams } from '../../definitions';

export class GetTasksListCase implements BaseCaseInterface<ListParams, BaseListInterface<any>> {
  async execute(params: BaseCaseParamsInterface<ListParams>): Promise<BaseListInterface<any>> {
    const data: BaseListInterface<any> = {
      items: [],
      meta: {
        count: 0,
        currentPage: params.pagination.page,
        pages: 0,
      },
    };

    data.meta.count = await Repository.Task().countDocumentsByFilter(params.filter);
    data.meta.pages = Math.ceil(data.meta.count / params.pagination.size);
    if(data.meta.pages < data.meta.currentPage) data.meta.currentPage = data.meta.pages;
    data.items = await Repository.Task().list(params.pagination, params.filter, params.sort);
    return data;
  }
}

export const getTasksListCase: BaseCaseInterface<ListParams, BaseListInterface<TaskEntity>> = new GetTasksListCase();
