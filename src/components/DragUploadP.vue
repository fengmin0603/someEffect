<template>
  <div class="">
    <drag-upload-item :file-list="fileList" :data-list="fileList" @dragClick="handelDragBtn" @preview="handelOnPreview" @removeFile="handelRemoveFile"></drag-upload-item>
    <drag-mask v-show="isDragMaskShow" @drop="handelOnDrop" @click="handelDragMaskClick"></drag-mask>
    {{imageFileList}}
    <preview v-if="showPreview" :data="imageFileList" :type="previewType" @close="handelPreviewClose"></preview>
  </div>
</template>

<script>
  import DragUploadItem from '@/components/upload/dragUploadItem'
  import DragMask from '@/components/upload/dragMask'
  import Preview from '@/components/upload/preview'
  import uploadUtil from '@/utils/upload'
  import { fileUtil } from '@/utils/utils'
  export default {
    data () {
      return {
        //
        fileList: [],
        // 蒙层是否展示
        isDragMaskShow: false,
        // 缓存表格中的当前项（行、数据为对象）
        cacheObject: [],
        showPreview: false,
        // 收集所有的图片数据以供预览组件使用
        imageFileList: [],
        // 预览组件接受的类型：分为image、pdf
        previewType: 'image'
      }
    },
    created () {
    },
    methods: {
      // 判断文件是否上传完成
      getIsUploadDone (data) {
        let flag = true
        _.forEach(data, fileItem => {
          // 判断附件是否已经上传完成
          if (fileItem.progress !== 100 || fileItem.fileUrl === '') {
            flag = false
            this.errorMessageTip(UPLOAD_NOT_DONE)
            return false
          }
        })
        return flag
      },

      // 点击拖拽上传按钮
      handelDragBtn (fileList) {
        this.isDragMaskShow = true
        this.fileList = fileList
      },

      handelDragEnter (e) {
        console.log('DragEnter')
      },

      handelDragOver (e) {
        console.log('DragOve')
      },

      // 拖拽释放
      handelOnDrop (e) {
        // 对上传的文件进行校验、扩展名、附件大小、数量
        const fileList = Array.from(e.dataTransfer.files)

        if (fileList.length > 3 || this.fileList.length + fileList.length > 3) {
          this.$notify({
            type: 'error',
            title: '上传',
            message: '附件上传不能超过3张'
          })
          return
        }
        console.log('fileList::',fileList)
        fileList.forEach((file, index) => {
          let flag = true
          // 判断是否为允许的扩展名
          const resultExtName = fileUtil.isAllowExtName(file)
          // 判断是否为允许的文件大小（本次前端暂不做判断）
          // const resultSize = fileUtil.isFileSize(file)

          if (!resultExtName) {
            flag = false
            this.$notify({
              type: 'error',
              title: '文件名：' + file.name + '格式错误',
              message: '附件仅支持pdf、jpg、jpeg、png、word、excel、ppt、压缩包格式'
            })
          }

          // 如果为true则放进数组中，只把扩展名在允许的范围内的file存储到数组当中
          if (flag) {
            const fileItem = {
              fileName: file.name,
              // 通过util返回
              newName: '',
              fileUrl: '',
              progress: 0,
              cancel: null
            }
            this.fileList.push(fileItem)
            uploadUtil.postUploadFile(
              file,
              progress => {
                fileItem.progress = progress
              },
              (fileUrl, newName) => {
                fileItem.newName = newName
                fileItem.fileUrl = fileUrl
              },
              cancel => {
                fileItem.cancel = cancel
              }
            )

          }
        })

        this.handelDragMaskClick()
      },

      handelDragMaskClick () {
        this.isDragMaskShow = false
      },

      // 删除读取的文件
      handelRemoveFile (fileList, fileIndex) {
        const fileItem = fileList[fileIndex]

        if (fileItem.progress !== 100) {
          // 取消当前文件上传
          fileItem.cancel()
        }

        fileList.splice(fileIndex, 1)
      },

      // 初始预览
      initPicturePreview (fileItem, type) {
        this.imageFileList = [
          {
            url: fileItem.fileUrl,
            title: fileItem.fileName
          }
        ]

        this.previewType = type
        this.showPreview = true
      },

      // 图片、PDF预览
      handelOnPreview (fileItem, type, dataList, key) {

        this.initPicturePreview(fileItem, type)

        // 将图片的数据收集起来供预览组件进行所有图片的预览
        dataList.forEach(file => {
          if (file.fileUrl === fileItem.fileUrl) return

          if (fileUtil.getIsImage(file.fileName)) {
            this.imageFileList.push({
              title: file.fileName,
              url: file.fileUrl
            })
          }
        })
      },

      handelPreviewClose () {
        // 将预览遮罩层关闭掉
        this.showPreview = false
      }
    },
    components: {
      DragUploadItem,
      DragMask,
      Preview
    }
  }
</script>

<style scoped>
</style>
