let Mock= require("mockjs")

// /aa 拦截

let arr=['5','6','7','8']
// /api/aa
Mock.mock(/\/api\/acd/,"get",(options)=>{
    console.log(options);// {url:"/api/aa",type:"get",body:null}
    return arr
})
Mock.mock("/api/asd","post",(options)=>{
    console.log(10,options);
    return {
        status:200,
        message:"success",
        data:arr
    }
})