<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="1-2"
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
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <span>Javascript</span>
          </template>
          <el-menu-item-group>
            <template slot="title">1</template>
            <el-menu-item index="2-1">2</el-menu-item>
            <el-menu-item index="2-2">3</el-menu-item>
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
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(index, indexPath){
        console.log(index, indexPath);
        switch (index) {
          case '1-1':
            this.$emit('getLeft',{
              "page":'Masonry_multi_columns'
            });
            break;
          case '1-2':
            this.$emit('getLeft',{
              "page":'Masonry_flex'
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
