import * as express from 'express';
import { FilterQuery } from 'mongoose';
import { BaseListInterface } from '../../core';
import { GetTasksListParams, GetTasksListResponse, ListParams } from '../../definitions';
import { getTasksListCase } from '../../cases';

export async function GetTasksListByUserIdController(req: express.Request, res: express.Response) {
  let params: GetTasksListParams;
  let response: BaseListInterface<GetTasksListResponse> = {
    meta: {
      count: 0,
    },
    items: [],
  };

  const filter: FilterQuery<any> = {};

  try {
    params = await new GetTasksListParams(req.query).validate();
  } catch (err) {
    console.error(err);
    return res.status(400).send(`Invalid request parameters \n ${err}`);
  }

  try {
    if (params.search && params.search.length > 2) {
      filter.$or = params.search
        .split(' ')
        .filter(Boolean)
        .map((regex: string) => ({
          $or: [{ username: { $regex: regex, $options: 'i' } }, { email: { $regex: regex, $options: 'i' } }],
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
