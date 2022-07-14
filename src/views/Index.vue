<template>
  <div>
    <h3>数据的增删改查</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" prop="date" width="100px">
      </el-table-column>
      <el-table-column label="姓名" prop="name" width="100px">
      </el-table-column>
      <el-table-column label="地址" prop="address" width="400px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
      <el-table-column align="right" width="300px">
        <!-- <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template> -->
      </el-table-column>
      <el-table-column label="修改" width="300px" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button @click="addfn">增加新用户</el-button>
    </div>
    <!-- 表单 -->
    <MyDialog
      :form="form"
      :dialogFormVisible="dialogFormVisible"
      :formLabelWidth="formLabelWidth"
      @confirmfn_my="confirmfn"
      
    ></MyDialog>

    <!-- 增加的弹窗 -->
      
    <AddDialog 
    :addform="addform" 
    :formLabelWidth="formLabelWidth" 
    :incrementform="incrementform" 
    @my_addconfirm="addconfirmfn"
      @my_addcancel="addcanaelfn"></AddDialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import instance from "../api/api";
import MyDialog from "@/components/MyDialog";
import AddDialog from "@/components/AddDialog";

export default {
  name: "index",
  data() {
    return {
      search: "",
      tableData: [],
      dialogFormVisible: false,
      form: {
        index: 0,
        date: null,
        name: "",
        address: "",
      },
      formLabelWidth: "120px",
      incrementform:false,//决定增加表单的隐藏
      addform:{//增加表单绑定的数据
        date:null,
        name:"",
        address:""
      },
    };
  },
  components: {
    MyDialog,
    AddDialog
  },
  created() {
    this.getall();
  },
  methods: {
    // 增加的取消功能
    addcanaelfn(){},
    // 增加的确定功能
    addconfirmfn(){
      this.incrementfn()
      .then(()=>{
        this.$message({
          type:"success",
          message:"添加成功",
          duration:3000,
          onClose:()=>{
            this.incrementform=false
            this.getall()
          }
        })
      })
      .catch(()=>{

      })
    },
    addfn() {
      this.incrementform=true
    },
    handleEdit(scope) {
      this.form = scope.row;
      //   this.form.date = JSON.stringify(this.form.date);
      this.form.index = scope.$index;
      this.dialogFormVisible = true;
    },
    handleDelete(scope) {
      console.log(scope);
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deletefn(scope.$index).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      //   this.deletefn(scope.$index);
    },
    confirmfn() {
      this.dialogFormVisible = false;
      this.form.date = dayjs(new Date(this.form.date)).format("YYYY-MM-DD");
      console.log(this.form.date);
      //   this.form.date=this.form.date.toDateString()
      this.updatefn();
    },
    cancelfn() {
      this.dialogFormVisible = false;
    },
    // 增加业务
    async incrementfn() {
      let {date,name,address}=this.addform
      let {data}=await instance.post("/add",{date,name,address})
    },
    // 修改业务
    async updatefn() {
      let { date, name, address, index } = this.form;
      let { data } = await instance.put("/update", {
        date,
        name,
        address,
        index,
      });
    },
    // 删除业务
    async deletefn(index) {
      let { data } = await instance.delete("/delete", { params: { index } });
      console.log(data);
      this.getall();
    },
    // 请求数据的业务
    async getall() {
      let { data } = await instance.get("/all");
      this.tableData = data.tableData;
    },
  },
  components: { MyDialog, AddDialog },
};
</script>
