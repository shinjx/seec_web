let Mock = require("mockjs")
let dayjs=require("dayjs")
let arr = [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-04',
    name: '李小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '赵小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '郭小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}]
// 请求
Mock.mock("/api/all", "get", (options) => {
    console.log(options);
    return {
        status: 200,
        message: "success",
        tableData: arr
    }
})
// 增加
Mock.mock("/api/add", "post", (options) => {
    console.log(10, options);
    let body=JSON.parse(options.body)
      body.date=dayjs(new Date(body.date)).format("YYYY-MM-DD");
    // "YYYY-MM-DD"
    arr.push(body)
    // let {date,name,address}=body
    return {
        status: 200,
        message: "success",
        data: arr
    }
})
// 删除
Mock.mock(/\/api\/delete\?index=\d/, "delete", (options) => {
    // console.log(45, options);
    let url=options.url
    let index=url.split("=")[1]
    // console.log(index);
    let newarr=arr.splice(index,1)
    return {
        status: 200,
        message: "删除成功",
        data: arr
    }
})
// 修改
Mock.mock("/api/update", "put", (options) => {
    console.log(10, options);
    let body=JSON.parse(options.body)
    let {date,name,address,index}=body
    arr[index].date=date
    arr[index].name=name
    arr[index].address=address
    return {
        status: 200,
        message: "success",
        data: arr
    }
})