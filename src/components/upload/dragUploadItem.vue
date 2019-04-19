<template>
  <div class="drag-upload-wrap">
    <div class="drag-btn">
      <el-button v-if="!isOnlyShow" type="text" :disabled="disabled" @click="handleBtn">拖拽上传
      </el-button>
    </div>
    <div class="file-item" v-for="(fileItem, index) in fileList" :key="index">
      <div class="file-item-con">
        <div class="file-item-text">
          <span class="name">{{ fileItem.fileName}}</span>

          <!-- 操作按钮 -->
          <span v-if="fileItem.progress === 100">
            <span class="operate-btn" :class="[{'text-red': !blue}, {'text-blue': blue}]"
                  v-if="['jpg', 'png', 'jpeg'].indexOf(getExtName(fileItem.fileName)) > -1"
                  @click="$emit('preview', fileItem, constants.IMAGE, dataList, subFileKey)">预览</span>

            <span class="operate-btn" :class="[{'text-red': !blue}, {'text-blue': blue}]"
                  v-if="getExtName(fileItem.fileName) === 'pdf'" @click="handelPreviewPDF(fileItem.fileUrl)">预览</span>

            <span class="operate-btn" :class="[{'text-red': !blue}, {'text-blue': blue}]"
                  v-if="constants.DOWNLOAD_EXT.indexOf(getExtName(fileItem.fileName)) > -1 || isHasUpload"
                  @click="handelFileDownload(fileItem)">下载</span>
          </span>

          <span class="remove-btn text-red" @click.prevent.stop="$emit('removeFile', fileList, index)"
                v-if="!isHasUpload">删除</span>
        </div>

        <div class="file-item-progress" v-if="fileItem.progress !== 100">
          <el-progress :percentage="fileItem.progress"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    downloadMixin
  } from '@/mixins/mixins'
  import {
    fileUtil
  } from '@/utils/utils'
  import {
    IMAGE,
    PDF,
    DOWNLOAD_EXT
  } from '@/constants/dict'

  export default {
    mixins: [downloadMixin],

    props: {
      disabled: {
        type: Boolean,
        default: false
      },

      fileList: {
        type: Array,
        default: () => []
      },

      attrName: {
        type: String,
        default: 'fileList'
      },

      // 是否有拖拽功能
      isOnlyShow: {
        type: Boolean,
        default: false
      },

      // 控制 仅有 预览，下载 ， 无删除
      isHasUpload: {
        type: Boolean,
        default: false
      },

      // 文字颜色
      blue: {
        type: Boolean,
        default: false
      },

      // 使用该组件的list数据，预览时可将该数据进行传递
      dataList: {
        type: Array,
        default: () => []
      },

      // 数组内子对象存储文件的key
      subFileKey: {
        type: String,
        default: 'fileList'
      }
    },

    data () {
      return {
        constants: {
          IMAGE,
          PDF,
          DOWNLOAD_EXT
        }
      }
    },

    created () {},
    methods: {
      // 点击拖拽上传，出现上传浮层
      handleBtn () {
        this.$emit('dragClick', this.fileList)
      },
      // 获取文件的扩展名
      getExtName (fileName) {
        return fileUtil.getExtName(fileName)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .drag-upload-wrap {
    .file-item {
      margin: 5px 0;
    }
  }

  .file-item-con {
    display: inline-block;
  }
</style>
