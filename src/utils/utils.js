// import FileSaver from 'file-saver'

/**
 * 配合租约附件上传 --- 操作文件的相关方法
 */
export const fileUtil = (() => {
  const defaultAllowExtName = ['pdf', 'jpg', 'png', 'jpeg', 'zip', 'rar', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
  const imageExt = ['jpg', 'png', 'jpeg']
  const zipExt = ['zip', 'rar']
  const toString = Object.prototype.toString

  /**
   * 文件扩展名判断
   * @param {File} file
   * @param {Array} extNameList|default = ['pdf', 'jpg', 'png']
   */
  const isAllowExtName = (file, extNameList) => {
    if (toString.call(file) !== '[object File]') return false
    const extName = extNameList || defaultAllowExtName
    return extName.indexOf(getExtName(file.name)) > -1
  }

  /**
   * 判断文件的大小，不能大于100M
   * @param {*} file
   * @param {*} size
   */
  const isFileSize = (file, size = 100 * 1024 * 1024) => {
    if (toString.call(file) !== '[object File]') return false
    return file.size <= size
  }

  /**
   * 获取文件的扩展名
   * @param {string} name
   * @returns {string} extName
   */
  const getExtName = (name) => name.substr(name.lastIndexOf('.') + 1).toLocaleLowerCase()

  /**
   * 获取图片的MIME类型
   * @param {string} name 文件名称包含扩展名
   */
  const getImageMIME = (name) => {
    const type = getExtName(name)

    switch (type) {
      case 'png':
        return 'image/png'
      case 'jpg':
        return 'image/jpg'
      case 'jpeg':
        return 'image/jpeg'
    }
  }

  /**
   * 判断当前文件是否为图片类型
   * @param {string} fileName
   * @returns {boolean} bool
   */
  const getIsImage = (fileName) => imageExt.indexOf(getExtName(fileName)) > -1

  /**
   * 下载图片
   * @param {Object} fileItem
   * @param {string} imgUrl OSS有签名字符串的URL
   */
  const downloadPic = (fileItem, imgUrl) => {
    const image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height

      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
      const url = canvas.toDataURL(getImageMIME(fileItem.fileName))

      // 生成一个a元素
      const a = document.createElement('a')
      // 创建一个单击事件
      const event = new MouseEvent('click')

      // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
      a.download = fileItem.fileName
      a.target = '_blank'
      // 将生成的URL设置为a.href属性
      a.href = url

      // 触发a的单击事件
      a.dispatchEvent(event)
    }

    image.src = imgUrl
  }

  /**
   * 下载PDF
   * @param {Object} fileItem
   * @param {string} pdfUrl
   */
  const downloadPdf = (fileItem, pdfUrl, progressCallback) => {
    const oReq = new XMLHttpRequest()
    // The Endpoint of your server
    // const URLToPDF = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
    // Configure XMLHttpRequest
    oReq.open('GET', pdfUrl, true)
    // Important to use the blob response type
    oReq.responseType = 'blob'
    // When the file request finishes
    // Is up to you, the configuration for error events etc.
    oReq.onload = function () {
      // Once the file is downloaded, open a new window with the PDF
      // Remember to allow the POP-UPS in your browser
      const file = new Blob([oReq.response], {
        type: 'application/pdf'
      })

      // Generate file download directly in the browser !
      // FileSaver.saveAs(file, fileItem.fileName)
    }

    oReq.onprogress = (progressEvent) => {
      if (progressEvent.lengthComputable) {
        let percent = Math.floor(progressEvent.loaded / progressEvent.total * 100 | 0)
        if (percent > 100) percent = 100
        progressCallback(percent)
      }
    }

    oReq.send()
  }

  /**
   * 下载压缩包
   * @param {string} fileUrl
   */
  const downloadZip = (fileItem, fileUrl) => {
    const a = document.createElement('a')
    const event = new MouseEvent('click')
    a.download = fileItem.fileName
    a.target = '_blank'
    a.href = fileUrl
  }

  const downloadFile = (fileItem, fileUrl) => {
    window.open(fileUrl, '_blank')
  }

  return {
    isAllowExtName,
    isFileSize,
    getExtName,
    getIsImage,
    getImageMIME,
    downloadPic,
    downloadPdf,
    downloadZip,
    downloadFile
  }
})()

// 遍历对象，如果为空，删除
export const deleteNull = (obj) => {
  for (let key in obj) {
    if (obj[key] === '' || obj[key] === null || obj[key] === undefined || obj[key] === 'null') {
      delete obj[key]
    }
  }
}

// 删除对象某个属性，
export const deleteObj = (obj, str) => {
  delete obj[str]
}

// 清空数据
export const emptyData = (obj) => {
  for (let key in obj) {
    obj[key] = null
  }
}

/* 格式化数据（将字符串转换成整型） */
export const formatStrToInt = (obj) => {
  for (const key in obj) {
    obj[key] = parseInt(obj[key])
  }
}

// 保留两位小数
export const dealNumber = (e) => {
  e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
}

/* 保存数据到 localStorage 进度管理详情相关页面使用，目前先没有动之前逻辑，后期优化 */
export const getLocalData = (name, id) => JSON.parse(localStorage.getItem(name + id) || '{}')

// 本地存储数据
export const setLocalData = (name, id, data) => localStorage.setItem(name + id, JSON.stringify(data))

// 删除本地存储数据
export const deleteLocalData = (name, id) => localStorage.removeItem(name + id)

/**
 * 本地存储数据
 * @param {string} 当前页面数据键值
 * @returns {object} string
 * 存储时 存储一个 time 字段，值为当时时间戳 + 要设置的过期时间
 */
export const setData = (name, id, value) => {
  let currentTime = new Date().getTime()
  // 设置过期时间 (7天)
  let pastTime = 7 * 24 * 60 * 60 * 1000
  // let pastTime =  * 1000
  localStorage.setItem(name + id, JSON.stringify({data: value, time: currentTime + pastTime}))
}

/**
 * 获取数据的时候，用当前的时间戳 - 本地存储的时间戳，若 >， 则已过期，删除数据
 */
export const getData = (name, id) => {
  let dataObj = JSON.parse(localStorage.getItem(name + id) || 'null')
  if (!dataObj) return
  if (new Date().getTime() > dataObj.time) {
    deleteData(name, id)
    return null
  } else {
    return dataObj.data
  }
}

// 删除本地数据
export const deleteData = (name, id) => {
  localStorage.removeItem(name + id)
}

// 根据数组返回id
export const generateIdByArray = (array) => {
  const length = array.length

  if (length) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}

// 遍历对象，若为字符串对象，则将其变成对象
export const traverseString = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      try {
        obj[key] = JSON.parse(obj[key])
      } catch (error) {
      }
    }
  }
}

/**
 * 默认保留两位小数
 * @param {number} decimal
 * @returns {number} 返回修改好的数字
 */
export const keepTwoDecimals = (num, digit = 2) => {
  const baseNum = Math.pow(10, digit)
  return parseInt(num * baseNum, 10) / baseNum
}

/**
 * 计算数字的和，如有小数位只取前两位参与运算
 * @param  {...any} numbers
 * @returns {number} 算好后的值
 */
export const numAnd = (...numbers) => {
  const baseNum = Math.pow(10, 2)
  let sum = 0
  numbers.forEach(num => {
    sum = (parseInt(num * baseNum) + parseInt(sum * baseNum)) / baseNum
  })
  return sum
}

// 删除对象中的属性
export const deleteObjAttr = (obj, keys) => keys.forEach(key => delete obj[key])

/**
 * 获取数组中最后一个元素的id值
 * @param {Array} arr
 * @returns {number} 返回数组最后一个元素的id值
 */
export const getArrayLastEleId = arr => arr[arr.length - 1].id

/**
 * 将对象中的指定属性值变为string类型
 * @param {Object} obj
 * @param {Array} keys 修改的对象keyName字符串
 */
export const setObjKeysValToStrVal = (obj, keys) => {
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      obj[key] = obj[key] + ''
    }
  })
}

/**
 * 将对象中指定的属性名数据进行清空
 * @param {Object} obj
 * @param {Array} keys
 */
export const setObjKeysValToEmpty = (obj, keys) => {
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      obj[key] = null
    }
  })
}

/**
 * 序列化Cookie
 * @param {String} name
 * @param {*} val
 * @returns {String} serializeCookie('foo', 'bar'); // 'foo=bar'
 */
export const serializeCookie = (name, val) => `${encodeURIComponent(name)}=${encodeURIComponent(val)}`

/**
 * 获取指定位数的浮点数...
 * @param {number} num
 * @param {number} digit
 * @returns 返回指定位数的数字，如果没有小数返回值则没有小数
 */
export const toFixedToNum = (num, digit = 2) => Number(num.toFixed(digit))
// IOS 前端 时间乱码（ios时间显示NaN） 问题解决
const changeDate = (DiffTime) => {
  // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  var Time
  try {
    Time = DiffTime.replace(/\-/g, '/')
  } catch (e) {
    Time = DiffTime
  }
  return Time
}
export const formatDate = (date, fmt) => {
  date = new Date(changeDate(date))
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export const formatArrDate = (arr) => {

}
