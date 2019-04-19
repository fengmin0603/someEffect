<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <span>CSS</span>
          </template>
          <el-menu-item-group>
            <template slot="title">瀑布流布局</template>
            <el-menu-item index="1-1">多列布局实现</el-menu-item>
            <el-menu-item index="1-2">flex实现</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">其他效果待续...</template>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <span>Vue实现的效果</span>
          </template>
          <el-menu-item-group>
            <template slot="title">上传</template>
            <el-menu-item index="2-1">按钮上传</el-menu-item>
            <el-menu-item index="2-2">拖拽上传</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        active: '1-1',
        thanksWord:{
          Masonry_multi_columns:'https://www.w3cplus.com/css/pure-css-create-masonry-layout.html',
          DragUpload:'杨泽坤'
        }
      }
    },
    created(){
      let routeName = this.$route.name;
      switch (routeName) {
        case 'Masonry_multi_columns':
          this.active = '1-1';
          break;
        case 'Masonry_flex':
          this.active = '1-2';
          break;
        case 'DragUpload':
          this.active = '2-2';
          break
      }
    },
    updated(){
      console.log('updated');
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(index, indexPath){
        switch (index) {
          case '1-1':
            this.$emit('getLeft',{
              "page":'Masonry_multi_columns',
              "msg": this.thanksWord.Masonry_multi_columns
            });
            break;
          case '1-2':
            this.$emit('getLeft',{
              "page":'Masonry_flex',
              "msg": this.thanksWord.Masonry_multi_columns
            });
            break;
          case '2-2':
            this.$emit('getLeft',{
              "page":'DragUpload',
              "msg":this.thanksWord.DragUpload
            });
            break;
        }
      }
    }
  }
</script>

<style>
  .el-submenu .el-menu-item{
    background-color: #fff;
    /*border-bottom:1px solid #909399;*/
  }
  .el-submenu .el-menu-item:hover{
    background-color: #fcf0f0;
  }
  .el-menu-item, .el-submenu__title{
    background-color: #f9e3e2;
  }
  .el-menu-item, .el-submenu__title:hover{
    background-color: #fcf0f0;
  }
</style>
