import { BaseQuery } from '~/common/interfaces/base.query';

export interface GetUserQuery extends BaseQuery {
  role?: string;
  permission?: string;
}
