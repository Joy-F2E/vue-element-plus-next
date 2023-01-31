import Mock from 'mockjs'
const Random  = Mock.Random

interface DataList {
  date: string,
  name: string,
  address: string
}

const dataList: DataList[] = []
for (let index = 0; index < 100; index++) {
  const tempate = {
    date: Random.date(),
    name: Random.name(),
    address: Random.province()
  }
  dataList.push(tempate)
}

Mock.mock('/api/list', 'post', (params: any) => {
  console.log('params', params);
  let info = JSON.parse(params.body)
  console.info(info)
  let [index, size, total] = [info.current, info.pageSize, dataList.length]
  let len = total / size
  let totalPages = len - parseInt(String(len)) > 0 ? parseInt(String(len)) : 10
  let newDataList = dataList.slice(index * size, (index + 1) * size)

  return {
    'code': 200,
    'message': '获取成功',
    'data': {
      'current': index,
      'pageSize': size,
      'rows': newDataList,
      'total': total,
      'totalPages': totalPages
    }
  }
})