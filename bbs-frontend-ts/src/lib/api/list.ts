import axios from 'axios';

type GetListPayload = {
  page: number;
};
export const getList = (payload: GetListPayload) =>
  axios.get(`/api/v1/bbs/?page=${payload.page}`);
