<template>
  <div class="mobile-detail">
    <div class="mobile-detail_header">{{title}}</div>
    <div>{{author}}  {{date}}</div>
    <div><img :src="imgSrc" class="mobile-detail_img"></div>
    <div class="mobile-detail_content">{{text}}</div>
  </div>
</template>

<script>
  import ProductService from '../service/ProductService';

  export default {
    data() {
      return {
        id: '',
        imgSrc: '',
        title: '',
        text: '',
        author: '',
        date: ''
      };
    },

    created() {
      // 获取界面间传递的参数
      this.id = this.$route.query.id;
      this.imgSrc = this.$route.query.imgSrc.replace('200x200', '360x200');
      this.title = this.$route.query.title;
      this.text = this.$route.query.text;
    },

    mounted() {
      window.scrollTo(0, 0);
      this.getProductDetail();
    },

    methods: {
      getProductDetail() {
        ProductService.getProductDetail(this.id, this.imgSrc, this.title, this.text).then((data) => {
          if (data) {
            this.author = data.author;
            this.date = data.date;
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  .mobile-detail {
    &_header {
      font-size: 16px;
      font-weight: 600;
      margin: 5px;
    }

    &_img {
      margin-top: 5px;
      height: 200px;
      width: 360px;
    }

    &_content {
      font-size: 14px;
      margin: 5px 15px 0 15px;
    }
  }
</style>
