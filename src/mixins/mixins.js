import {
  fileUtil
} from '@/utils/utils'
export const downloadMixin = {
  methods: {
    handelFileDownload (fileItem) {
      getSignUrl(fileItem.fileUrl).then(res => {
        if (res.status === 200) {
          const url = res.data
          fileUtil.downloadFile(fileItem, url)
        }
      })
    }
  }
}

/**
 * 上报项目维护遮罩层
 */
export const maskMixin = {
  props: {
    projectState: [String]
  },
  computed: {
    isProjectCanEdit () {
      return false
    }
  }
}
