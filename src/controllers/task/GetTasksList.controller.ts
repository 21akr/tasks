import * as express from 'express';
import { FilterQuery } from 'mongoose';
import { BaseListInterface, Repository } from '../../core';
import { BaseListParams, GetTasksListResponse, ListParams } from '../../definitions';
import { getTasksListCase } from '../../cases';

export async function GetTasksListController(req: express.Request, res: express.Response) {
  let params: BaseListParams;
  let response: BaseListInterface<GetTasksListResponse> = {
    meta: {
      count: 0,
    },
    items: [],
  };

  const user = await Repository.User().getById(req.user._id);
  if(!user) {
    return res.status(404).send('User Not Found');
  }

  const filter: FilterQuery<any> = {};

  try {
    params = await new BaseListParams(req.query).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    if(params.search && params.search.length > 2) {
      filter.$or = params.search
        .split(' ')
        .filter(Boolean)
        .map((regex: string) => ({
          $or: [
            { title: { $regex: regex, $options: 'i' } },
            { status: { $regex: regex, $options: 'i' } }],
        }));
    }

    const getTasksListParams: ListParams = {
      pagination: {
        size: params.size,
        page: params.page,
      },
      filter: filter,
      sort: { createdAt: -1 },
    };
    const list = await getTasksListCase.execute(getTasksListParams);

    response.meta = list.meta;
    response.items = list.items.map(tasks => new GetTasksListResponse(tasks));

    return res.json(response);
  } catch (err) {
    console.error(err);
    return err;
  }
}
