export default {
  formateTime: (time) => {
    if (!time) return '';
    let date = new Date(time);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  },
  page: (data, callback) => {
    return {
      current: data.page,
      pageSize: data.page_size,
      total: data.total,
      showQuickJumper: true,
      onChange: (current) => {
        callback(current)
      }
    }
  }
}