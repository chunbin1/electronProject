import request from '@/utils/request';

export async function queryTop(page) {
  return request.get(`/search/repositories?q=language:javascript&sort=stars&order=desc&page=${page}`);
}
