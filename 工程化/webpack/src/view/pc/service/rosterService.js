import Fetch from '../../../utils/Fetch';

export const ROSTER_PAGE_URL    =   '/roster/findPage';
export const ROSTER_PARAM_URL   =   '/roster/findParam';
export const ROSTER_EDIT_URL    =   '/roster/edit';
export const ROSTER_DELETE_URL  =   '/roster/delete';

import { findPageDataTransform } from './rosterServiceTransform';

export default {
  findParam() {
    return Fetch({
      url: ROSTER_PARAM_URL,
      method:'post'
    });
  },
  findPage(currentPageNumber,pageMaxSize,roster) {
    return Fetch({
      url: ROSTER_PAGE_URL,
      method:'post',
      params:{
        currentPageNumber :currentPageNumber,
        pageMaxSize : pageMaxSize,
      },
      data: {...roster}
    }).then(v=>{
      v.data.dataList.forEach(item => {
        findPageDataTransform(item)
      })
      return v
    });
  },
  editRoster(roster) {
    delete roster.createTime;
    delete roster.updateTime;
    return Fetch({
      url: ROSTER_EDIT_URL,
      method:'post',
      data: {...roster}
    });
  },
  deleteRoster(rosterID) {
    return Fetch({
      url: ROSTER_DELETE_URL,
      method:'post',
      params:{
        rosterID :rosterID
      }
    });
  }
};
