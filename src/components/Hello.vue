<template>
  <div class="container">
    <el-container>
      <el-header>
        <el-tag type="success"><a href="https://listenfeng.github.io/#/">回到首页</a></el-tag>
        <span>欢迎点阅~</span>
        <span></span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Left @getLeft="getLeft"/>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>
            感谢 <el-tag type="success"><a href="https://www.w3cplus.com/css/pure-css-create-masonry-layout.html">https://www.w3cplus.com/css/pure-css-create-masonry-layout.html</a></el-tag>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Left from './Left.vue';
  import Masonry_multi_columns from './Masonry_multi_columns.vue';
  import Masonry_flex from './Masonry_flex.vue';

  export default {
    name: 'Hello',
    components: {
      Left,
      Masonry_multi_columns,
      Masonry_flex
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      getLeft(page){
        console.log("page",page);
        this.$router.push({path: '/' + page.page, query: {id: ''}});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a{
    color: #67c23a;
  }
  .el-tag{
    cursor: pointer;
  }
  .container, .el-container {
    height: 100%;
  }

  .el-header, .el-footer {
    /*background-color: #F56C6C;*/
    color: #333;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border:1px solid #F56C6C;
  }
  .el-header{
    display:flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-footer{
    border-left:none;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    /*background-color: #fcf0f0;*/
    color: #333;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border:1px solid #F56C6C;
    border-top:none;
  }

  .el-main {
    color: #333;
    text-align: center;
    padding: 0;
  }

  /*body > .el-container {*/
  /*margin-bottom: 40px;*/
  /*}*/

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
  /*line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
  /*line-height: 320px;*/
  /*}*/
</style>
