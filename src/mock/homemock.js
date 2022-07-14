let Mock= require("mockjs")

// /aa 拦截

let arr=['1','2','3','4']
// /api/aa
Mock.mock(/\/api\/aa/,"get",(options)=>{
    console.log(options);// {url:"/api/aa",type:"get",body:null}
    return arr
})
Mock.mock("/api/ab","post",(options)=>{
    console.log(10,options);
    return {
        status:200,
        message:"success",
        data:arr
    }
})