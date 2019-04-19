import axios from 'axios'
const uuidv5 = require('uuid/v5')

const util = {
  // 获取unix当前时间戳
  getCurrentUnixTime () {
    return Math.round(Date.now() / 1000)
  },
  // 例: demo1.PNG -> .png
  getExtStr (name) {
    let index = name.lastIndexOf('.')
    return index === -1 ? '' : name.substring(index).toLocaleLowerCase()
  },
  getUUID (str) {
    return uuidv5(str, uuidv5.DNS).replace(/-/g, '')
  }
}

// 封formData数据
const getFormData = (file, newName, ossTicket = {}) => {
  const formData = new FormData(file)
  formData.append('OSSAccessKeyId', ossTicket.accessid)
  formData.append('policy', ossTicket.policy)
  formData.append('signature', ossTicket.signature)
  // 上传的路径+文件名
  formData.append('key', `${ossTicket.dir}${newName}`)
  // 让服务端返回200，不设置则默认返回204
  formData.append('success_action_status', 200)
  formData.append('file', file)
  return formData
}

// 上传
const upload = (ossTicket, file, progressCallback, successCallback, abortCallback) => {
  const CancelToken = axios.CancelToken
  const config = {
    // 上传进度条数据更新
    onUploadProgress (progressEvent) {
      if (progressEvent.lengthComputable) {
        let percent = Math.floor(progressEvent.loaded / progressEvent.total * 100 | 0)
        if (percent > 100) percent = 100
        progressCallback(percent)
      }
    },
    cancelToken: new CancelToken(abortCallback)
  }

  const newName = util.getUUID(file.name) + util.getExtStr(file.name)
  axios.post(ossTicket.host, getFormData(file, newName, ossTicket), config).then(res => {
    const fileUrlPath = `${ossTicket.host}/${ossTicket.dir}${newName}`
    successCallback(fileUrlPath, newName)
  }).catch(() => {

  })
}

export default {
  // 暴露给外部使用的函数
  postUploadFile (file, progressCallback, successCallback, abortCallback) {
    // getTicket().then(({data}) => {获取阿里云签证信息
      let data = {
        accessid: "",
        dir: "",
        expire: '',
        host: "http://bpit-protected-dev.oss-cn-beijing.aliyuncs.com",
        policy: "",
        signature: ""
      }
      upload(data, file, progressCallback, successCallback, abortCallback)
    // })
  }
}
