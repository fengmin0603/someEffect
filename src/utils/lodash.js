import forEach from 'lodash.foreach'
import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'
import uniq from 'lodash.uniq'
import debounce from 'lodash.debounce'

const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {}
  )

export default {
  forEach,
  // 对象、数组深克隆
  cloneDeep,
  getURLParameters,
  // 比较两个数组值是否一样
  isEqual,
  // 数组值去重
  uniq,
  // 函数防抖
  debounce
}
