import Fetch from '../../../utils/Fetch';

export const BASE_URL = '/getListData';
export const POST_TEST = '/postTest'
export default {
  getData(params) {
    return Fetch({
      url: BASE_URL,
      params,
      method: 'get'
    }).then(res => {
      return res
    })
  },
  postTest(params) {
    return Fetch({
      url: POST_TEST,
      method: 'post',
      data: params
    }).then(res => {
      return res
    })
  }
};
