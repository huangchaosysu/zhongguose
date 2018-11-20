/* global window */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import cloneDeep from 'lodash.clonedeep'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneData = cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/)
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  }
  //console.log("in fetch url:" + url + ", opts:" + JSON.stringify({'method': method, "fetchType": fetchType}) + ", params(cloneData):" + JSON.stringify(cloneData))

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData, {headers: {'Content-type': 'application/json'}})
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    case 'post-multi':
      const postData = new FormData()
      for (let key in cloneData) {     
        if(key==='files'&&cloneData.files!==undefined){
          const {fileList} = cloneData.files
          for(let i=0;fileList!==undefined&&i<fileList.length;i++){
            //console.log('file', i, fileList[i].originFileObj) //这里必须使用originFileObj
            postData.append('files', fileList[i].originFileObj)
          }
        }else{
          postData.append(key, cloneData[key])
        }
      }
      return axios.post(url, postData)
    case 'post-form':
      return axios({
        method: 'post',
        url,
        data: qs.stringify(cloneData),
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
    default:
      return axios(options)
  }
}

export default function request (options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
        options.fetchType = 'JSONP'
    }
  }

  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = response.data
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }
    //console.log("in request url:" + options.url + ", resp:" + JSON.stringify(Object.keys(data)) + ", status:" + status)
    return Promise.resolve({
      success: data.ok!==undefined?data.ok===0:true,
      message: statusText,
      statusCode: status,
      ...data,
    })
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }

    //console.log("resp:" + JSON.stringify(error))
    /* eslint-disable */
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
