<template>

  <div style="padding: 20px">
    <el-button type="primary" @click="getData('')">点击获取默认数据</el-button>
    <el-button type="primary" @click="getData(1)">点击获取type=1数据</el-button>
    <el-button type="primary" @click="getData(2)">点击获取type=2数据</el-button>
    <el-button type="primary" @click="getData(3)">点击获取type=3数据</el-button>
    <div style="font-size: 16px;margin-top: 10px">{{ myData }}</div>
  </div>

</template>

<script>
  import moreDataService from "../service/moreDataService";

  export default {

    name: 'moreData',

    data() {
      return {
        myData: null,
      };
    },
    created() {
      moreDataService.postTest()
        .then(res => {
          console.log(res)
        })
    },
    methods: {
      getData(type) {
        let params = {
          type
        }
        moreDataService.getData(type && params)
          .then(res => {
            this.myData = res
            console.log(res)
          })
      }
    }

  };

</script>
