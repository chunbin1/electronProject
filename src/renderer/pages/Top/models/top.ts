import { queryTop } from '@/service/queryTop';

export default {
  state: {
    items: [],
    name: 'top',
    total: 0,
    page: 1,
  },
  effects: {
    *queryTopList({ payload }, { put, call }) {
      const { page } = payload;
      const res = yield call(queryTop, page);
      const { items, total_count } = res;
      if (page === 1) {
        yield put({
          type: 'initTopList',
          payload: {
            items,
            total_count,
            page,
          },
        });
      } else {
        yield put({
          type: 'saveTopList',
          payload: {
            items,
            total_count,
            page,
          },
        });
      }
    },
  },
  reducers: {
    saveTopList(state, { payload }) {
      return {
        ...state,
        items: [...state.items, ...payload.items],
        total: payload.total_count,
        page: payload.page,
      };
    },
    initTopList(state, { payload }) {
      return {
        ...state,
        items: [...payload.items],
        total: payload.total_count,
        page: payload.page,
      };
    },
  },
};
