import * as express from 'express';
import { FilterQuery } from 'mongoose';
import { BaseListInterface } from '../../core';
import { BaseListParams, GetUsersListResponse, ListParams } from '../../definitions';
import { getUsersListCase } from '../../cases';

export async function GetUsersListController(req: express.Request, res: express.Response) {
  let params: BaseListParams;
  let response: BaseListInterface<GetUsersListResponse> = {
    meta: {
      count: 0,
    },
    items: [],
  };

  const filter: FilterQuery<any> = {};

  try {
    params = await new BaseListParams(req.query).validate();
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
          $or: [{ fullName: { $regex: regex, $options: 'i' } }, { email: { $regex: regex, $options: 'i' } }],
        }));
    }

    const getUserListParams: ListParams = {
      pagination: {
        size: params.size,
        page: params.page,
      },
      filter: filter,
      sort: { createdAt: -1 },
    };
    const list = await getUsersListCase.execute(getUserListParams);

    response.meta = list.meta;
    response.items = list.items.map(users => new GetUsersListResponse(users));

    return res.json(response);
  } catch (err) {
    console.error(err);
    return err;
  }
}
