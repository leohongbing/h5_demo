export default {
  buildSuccessResult: data => ({
    code: 'success',
    message: null,
    exceptionMessage: null,
    data: data
  }),

  buildFailedResult: (message) => ({
    code: 'fail',
    message: message,
    exceptionMessage: message,
    data: null
  }),

  buildPageResult: (totalSize, totalPageSize, currentPageNumber, dataList) => ({
    totalSize: totalSize,
    totalPageSize: totalPageSize,
    currentPageNumber: currentPageNumber,
    dataList: dataList
  }),

  param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
      return {};
    }
    const paramStr = `{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`;
    return JSON.parse(paramStr);
  }
};
