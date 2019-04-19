<!-- 图片预览 -->
<template>
  <transition name="fade">
    <div class="image-preview-wrap">
      <div class="image-preview-close el-icon-close" :class="[{'top-5': type === constants.PDF}]" title="关闭" alt="关闭" @click="handelOnClose"></div>

      <div class="image-preview-loading" v-show="isLoading">
        <!-- 圈圈 -->
        <div></div>
      </div>

      <!-- 图片预览 -->
      <div v-if="type === constants.IMAGE">
        <img class="image-preview-img" :src="currentShowImg.url" :alt="currentShowImg.title">

        <div v-if="isImgLoadError" class="image-error-tip">
          <span>图片加载失败...</span>
          <div class="el-icon-loading"></div>
        </div>

        <div class="image-preview-title">
          {{ currentShowImg.title }}
        </div>

        <div class="image-preview-nav-left" v-if="data.length !== 1">
          <span class="image-preview-arrow-icon el-icon-arrow-left" @click="handelLeftBtn"></span>
        </div>

        <div class="image-preview-nav-right" v-if="data.length !== 1">
          <span class="image-preview-arrow-icon el-icon-arrow-right" @click="handelRightBtn"></span>
        </div>
      </div>

      <!-- pdf预览 -->
      <div class="pdf-preview-wrap" v-if="type === constants.PDF">
        <div class="image-preview-title">
          {{ currentShowPDF.title }}
        </div>
        <embed :src="currentShowPDF.url" :type="currentShowPDF.type"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios'
  import {
    IMAGE,
    PDF
  } from '@/constants/dict'

  // 图片预览和下载的功能
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      },
      // type类型为 image、pdf
      type: {
        type: String,
        default: IMAGE
      }
    },
    data() {
      return {
        constants: {
          IMAGE,
          PDF
        },
        imageSrcList: [],
        copyData: [],
        isLoading: true,
        isImgLoadError: false,
        currentShowImg: {
          title: '',
          url: ''
        },
        currentIndex: 0,
        currentShowPDF: {
          url: '',
          title: '',
          type: ''
        }
      }
    },
    computed: {
      downloadUrl() {
        if (this.type === IMAGE) {
          return this.currentShowImg.url
        } else if (this.type === PDF) {
          return this.currentShowPDF.url
        }
      },
      downloadName() {
        if (this.type === IMAGE) {
          return this.currentShowImg.title
        } else if (this.type === PDF) {
          return this.currentShowPDF.title
        }
      }
    },
    created() {
      // 对data第一个元素的操作
      this.getSignUrl(this.data[0].url).then(res => {
        if (res.status === 200) {
          switch (this.type) {
            case IMAGE:
              this.judgeImageLoad(res.data)
              this.currentShowImg.title = this.data[0].title
              break
            case PDF:
              this.currentShowPDF.url = res.data
              this.currentShowPDF.title = this.data[0].title
              this.currentShowPDF.type = 'application/pdf'
          }
        }
      })
    },
    mounted() {
      document.addEventListener('keydown', this.onKeyDownEsc)
    },
    methods: {
      getSignUrl(url) {// 获取阿里云签证的图片地址
        let config = {headers:{}}
        config.headers['Authorization'] = 'Bearer ' + 'token'
        axios.get(`host/api/upload/sign?url=${url}`,config).then(res => {
              resolve(res)
        }).catch(() => {

        })
      },
      handelOnClose() {
        this.$emit('close')
      },

      // 渲染这些图片
      renderAllImage() {
        this.imageSrcList = []
        this.copyData = this.data.slice()

        this.readFile(this.copyData.shift())
      },

      readFile(file) {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = e => {
          this.imageSrcList.push({
            title: file.name,
            url: e.target.result
          })

          if (this.copyData.length) {
            this.readFile(this.copyData.shift())
          }
        }
      },

      // 判断图片是否能加载成功
      judgeImageLoad(url) {
        let img = new Image()
        img.src = url

        img.onload = () => {
          this.isLoading = false
          this.currentShowImg.url = url
          img = null
        }

        img.onerror = () => {
          this.isLoading = false
          this.isImgLoadError = true
          img = null
        }
      },

      // 给currentShowImg对象进行赋值
      setCurrentShowImg(index) {
        const currentImgObj = this.data[index]
        this.getSignUrl(currentImgObj.url).then(res => {
          if (res.status === 200) {
            this.judgeImageLoad(res.data)
            this.currentShowImg.title = currentImgObj.title
          }
        })
      },

      // 对变量进行置空
      resetCurrentShowImg() {
        this.currentShowImg.url = ''
        this.currentShowImg.title = ''
      },

      handelLeftBtn() {
        this.isLoading = true
        this.isImgLoadError = false

        this.resetCurrentShowImg()

        if (this.currentIndex === 0) {
          const arrayLastIndex = this.data.length - 1
          this.setCurrentShowImg(arrayLastIndex)
          this.currentIndex = arrayLastIndex
          return
        }

        const prevIndex = (this.currentIndex -= 1)
        this.setCurrentShowImg(prevIndex)
      },

      handelRightBtn() {
        this.isLoading = true
        this.isImgLoadError = false

        this.resetCurrentShowImg()

        if (this.currentIndex === this.data.length - 1) {
          this.setCurrentShowImg(0)
          this.currentIndex = 0
          return
        }

        const nextIndex = (this.currentIndex += 1)
        this.setCurrentShowImg(nextIndex)
      },

      onKeyDownEsc(e) {
        if (e.keyCode === 27) {
          this.handelOnClose()
        }
      }
    },
    destroyed() {
      document.removeEventListener('keydown', this.onKeyDownEsc)
    }
  }

</script>

<style lang="scss" scoped>
  .image-preview-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    text-align: center;
    background-color: rgba(51, 51, 51, 0.95);
    transition: 0.3s;

    .image-preview-close,
    .image-preview-download {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 10001;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }

    .image-preview-close.top-5 {
      top: 5px;
    }

    .image-preview-download {
      top: 100px;
    }

    .image-body {
      // margin: 100px auto 0;
      // background: #fff;

      .image-wrap {
        float: left;
        width: 80%;
        overflow: hidden;

        img {
          display: block;
          width: 600px;
        }
      }
    }

    .image-container {
      .icon-arrow {
        font-size: 40px;
        color: #fff;
      }
    }
  }

  .image-preview-loading {
    position: absolute;
    width: 30px;
    height: 35px;
    top: 50%;
    left: 50%;
    margin-top: -17.5px;
    margin-left: -15px;

    > div {
      display: inline-block;
      width: 25px;
      height: 25px;
      background: transparent;
      border-radius: 100%;
      border: 2px solid #fff;
      border-bottom-color: transparent;
      animation: rotate 0.75s linear infinite;
    }
  }

  .image-preview-img,
  .pdf-preview-wrap {
    max-width: 100%;
    max-height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .image-error-tip {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    font-size: 14px;
    color: #FFF;
  }

  .pdf-preview-wrap {

    embed {
      margin: 40px auto 0;
      width: 100%;
      height: 100%;
    }
  }

  .image-preview-title {
    position: absolute;
    left: 0;
    top: 0;
    // bottom: 0;
    text-align: center;
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
  }

  .image-preview-nav-left,
  .image-preview-nav-right {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    width: 70px;
    height: 100px;
    transform: translateY(-50%);
    transition: background .2s ease-in-out;
    color: #999;
    cursor: pointer;

    .image-preview-arrow-icon {
      font-weight: bold;
      font-size: 40px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  .image-preview-nav-left {
    left: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;

    .image-preview-nav-arrow {
      // left: 0;
      // margin-left: 40px;
      transform: rotate(-45deg);
    }
  }

  .image-preview-nav-right {
    right: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;

    .image-preview-nav-arrow {
      // right: 0;
      // margin-right: 40px;
      transform: rotate(135deg);
    }
  }

  .image-preview-nav-arrow {
    position: absolute;
    top: 50%;
    margin-top: -15px;
    background: rgba(0, 0, 0, 0);
    line-height: 40px;
    width: 20px;
    height: 20px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    cursor: pointer;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

</style>
