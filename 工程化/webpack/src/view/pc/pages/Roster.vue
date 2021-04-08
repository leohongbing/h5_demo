<template>
  <hw-layout type="common">
    <!--页面头部-->
    <hw-layout-header>
      <!--一级标题-->
      <template slot="title">
        <hw-title :level="1">标题XX</hw-title>
      </template>
      <!--一级标题 end-->
    </hw-layout-header>
    <!--页面头部 end-->
    <!--工具栏-->
    <hw-layout-toolbar>
      <template slot="left">
        <el-button type="primary" @click="handleClickAdd">新增</el-button>
        <el-button type="primary" @click="handleClickJump">测试跳转多page1的页面</el-button>
      </template>
    </hw-layout-toolbar>
    <!--工具栏 end-->
    <!--筛选区域-->
    <hw-layout-filter>
      <el-form label-width="80px" :model="queryForm" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="安全类型">
              <el-select class="hw-common_select-full" clearable  v-model="queryForm.rosterType">
                <el-option
                  v-for="(item,index) in rosterTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="安全方式">
              <el-select class="hw-common_select-full" clearable v-model="queryForm.access">
                <el-option
                  v-for="(item,index) in accessOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select class="hw-common_select-full" clearable v-model="queryForm.state">
                <el-option
                  v-for="(item,index) in stateOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="安全级别">
              <el-select class="hw-common_select-full" clearable v-model="queryForm.level">
                <el-option
                  v-for="(item,index) in levelOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户名称" prop="companyInfoID">
              <el-input v-model="queryForm.companyInfoID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="成员单位" prop="companyID">
              <el-input v-model="queryForm.companyID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="handleClickSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </hw-layout-filter>
    <!--筛选区域 end-->
    <!--表格-->
    <hw-layout-table>
      <el-table class="common-table" :data="rosterTableData" border stripe v-loading="tableLoading" empty-text="暂无数据 ">
        <el-table-column v-for="(item,index) in tableColumns" :key="index" :prop="item.prop" :label="item.label">
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClickEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleClickDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </hw-layout-table>
    <!--表格 end-->
    <!--分页-->
    <hw-layout-pagination>
      <el-pagination
        @size-change="handleChangePaginationSize"
        @current-change="handleChangePaginationCurrent"
        :current-page="currentPageNumber"
        :page-sizes="[10, 20, 30]"
        :page-size="pageMaxSize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="totalSize">
      </el-pagination>
    </hw-layout-pagination>
    <!--分页 end-->
    <!--编辑弹层-->
    <el-dialog title="安全内容" :visible.sync="rosterDialog" custom-class="hw-common_dialog" v-loading="dialogLoading">
      <el-form :model="rosterForm" label-width="70px" ref="rosterForm">
        <el-form-item label="客户名称">
          <el-input v-model="rosterForm.companyInfoID"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="成员单位">
          <el-input v-model="rosterForm.companyID"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="安全类型">
          <el-select v-model="rosterForm.rosterType" :disabled="true">
            <el-option
              v-for="(item,index) in rosterTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安全方式">
          <el-select v-model="rosterForm.access" :disabled="true">
            <el-option
              v-for="(item,index) in accessOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正文" prop="roleName">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3}"
            placeholder="请输入内容"
            v-model="rosterForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="state">
          <el-radio-group v-model="rosterForm.state">
            <el-radio :label="0">无效</el-radio>
            <el-radio :label="1">有效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="rosterForm.createTime" clearable :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="rosterForm.updateTime" clearable :disabled="true" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClickDialogConfirmEdit">确 定</el-button>
        <el-button @click="rosterDialog=false">取 消</el-button>
      </div>
    </el-dialog>
    <!--编辑弹层end-->
  </hw-layout>
</template>
<script>
  import rosterService from '../service/rosterService';
  import rosterBusiness from '../business/rosterBusiness';
  import { LEVEL_OPTIONS } from '../business/consts';

  export default {
    name:'roster',
    mixins: [rosterBusiness],
    data() {
      return {
        queryForm:{},
        rosterTypeOptions:[],
        accessOptions:[],
        stateOptions:[],
        levelOptions:LEVEL_OPTIONS,
        rosterTableData: null,
        tableColumns:[{
          prop:"companyInfoID",
          label:"客户名称"
        },{
          prop:"level",
          label:"级别"
        },{
          prop:"rosterType",
          label:"类型"
        },{
          prop:"access",
          label:"安全方式"
        },{
          prop:"state",
          label:"状态"
        },{
          prop:"createTime",
          label:"创建时间"
        }],
        tableLoading: false,
        pageMaxSize: 10,
        currentPageNumber: 1,
        totalSize: 0,
        totalNumber: 0,
        rosterDialog: false,
        dialogLoading:false,
        rosterForm: {
          rosterType:1,
          access:1,
          state:1
        },
      };
    },
    created(){
      this.init();
    },
    methods: {
      // 初始化
      init(){
        this.handleClickSearch();
        this.initRosterParam();
      },
      // 点击新增
      handleClickAdd(){},
      // 点击测试跳转到page1的页面
      handleClickJump(){
        window.location.href=`/${window.location.pathname.split("/")[1]}/mobile.html#/`;
      },
      // 点击查询
      handleClickSearch() {
        if(!this.$refs['ruleForm']) return;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.currentPageNumber = 1;
            this.findTableData();
          } else {
            return false;
          }
        });
      },
      // 点击编辑
      handleClickEdit(row) {
        this.rosterForm.rosterID = row.rosterID;
        this.rosterForm.companyInfoID = row.companyInfoID;
        this.rosterForm.companyID = row.companyID;
        this.rosterForm.rosterType = row.rosterType;
        this.rosterForm.access = row.access;
        this.rosterForm.content = row.content;
        this.rosterForm.state = row.state;
        this.rosterForm.createTime = row.createTime;
        this.rosterForm.updateTime = row.updateTime;
        this.rosterDialog = true;
      },
      // 点击删除
      handleClickDelete(row) {
        let rosterID = row.rosterID;
        this.$confirm('是否确认删除防御记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rosterService.deleteRoster(rosterID).then(() => {
            this.totalNumber -= 1;
            this.$message.success('删除成功!');
            this.tableLoading = true;
            this.findTableData();
          }).catch((e) => {
            this.$message.warning('删除失败' + (e&&e.errorMsg ? e.errorMsg :""));
          });
        });
      },
      // 切换分页size
      handleChangePaginationSize(val) {
        this.tableLoading = true;
        this.pageMaxSize = val;
        this.findTableData();
      },
      // 切换分页当前页码
      handleChangePaginationCurrent(val) {
        this.tableLoading = true;
        this.currentPageNumber = val;
        this.findTableData();
      },
      // 点击编辑弹层-保存
      handleClickDialogConfirmEdit() {
        this.$refs['rosterForm'].validate((valid) => {
          if (valid) {
            this.dialogLoading = true;
            rosterService.editRoster(this.rosterForm).then(() => {
              this.$message.success('编辑成功!');
              this.dialogLoading = false;
              this.rosterDialog = false;
              this.findTableData();
            }).catch((e) => {
              this.$message.warning('操作错误!' + (e&&e.errorMsg ? e.errorMsg :""));
              this.dialogLoading = false;
            });
          } else {
            return false;
          }
        });
      },
      // 初始化roster参数
      initRosterParam(){
        rosterService.findParam().then((val)=>{
          const data = val.data;
          if(data.type){
            this.rosterTypeOptions = data.type;
          }
          if(data.access){
            this.accessOptions = data.access;
          }
          if(data.state){
            this.stateOptions = data.state;
          }
        }).catch((error)=>{
        });
      },
      // 请求数据
      findTableData() {
        var self = this;
        this.tableLoading = true;
        rosterService.findPage(this.currentPageNumber, this.pageMaxSize, this.queryForm).then(res => {
          self.totalSize = res.data.totalSize;
          self.rosterTableData = res.data.dataList;
          self.totalNumber = this.totalSize;
          self.tableLoading = false;
        }).catch(() => {
          self.tableLoading = false;
        });
      },
    }
  };
</script>
<style lang="scss">
</style>
