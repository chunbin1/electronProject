import { queryTop } from '@/service/queryTop';

export default {
  state: {
    name: 'top',
    items:[],
    total:0,
  },
  effects: {
    *queryTopList({payload},{put,call}){
      const {page} = payload
      const res = yield call(queryTop,page)
      const {items,total_count} = res
      yield put({
        type:"saveTopList",
        payload:{
          items,
          total_count
        }
      })
    }
  },
  reducers: {
    saveTopList(state,{payload}){
      return {
        ...state,
        items:payload.items,
        total:payload.total_count,
      }
    }
  },
};