import request from "utils/request";

//定义接口地址
const URL = {
    "GET_DETAIL":  `${GROBAL_HTTP_CTX}/show_off/getAssoVo`,
    "GET_LIST":  `${GROBAL_HTTP_CTX}/show_off/getListWithAttach`,
    "SAVE_ORDER":  `${GROBAL_HTTP_CTX}/show_off/SaveAssoVo`,
    "DEL_ORDER":  `${GROBAL_HTTP_CTX}/show_off/deleteBatch`,
    "GET_AUTH" : `/wbalone/security/auth`
}

/**
 * 获取列表
 * @param {*} params
 */
export const getList = (params) => {
    let url =URL.GET_LIST+'?1=1';
    for(let attr in params){
        if((attr!='pageIndex')&&(attr!='pageSize')){
            url+='&search_'+attr+'='+params[attr];
        }else{
            url+='&'+attr+'='+params[attr];
        }
    }
    return request(url, {
        method: "get",
        data: params
    });
}

/**
 * 获取下拉列表
 * @param {*} params
 */
export const getSelect = (params) => {
    return request(URL.GET_SELECT, {
        method: "get",
        data: params
    });
}
/**
 * 删除table数据
 * @param {*} params
 */
export const deleteList = (params) => {
    return request(URL.DELETE, {
        method: "post",
        data:params
    });
}

export const saveList = (params) => {
    return request(URL.SAVE, {
        method: "post",
        data:params
    });
}
export const saveMasterForm = (params) => {
    return request(URL.SAVE_ORDER, {
        method: "post",
        data: params
    });
}
export const delShowOff = (params) => {
    return request(URL.DEL_ORDER, {
        method: "post",
        data: params
    });
}

/**
 * 通过search_id 查询列表详情
*/

export const getDetail = (params) => {
    return request(URL.GET_DETAIL, {
        method: "get",
        param: params
    });
}

/** 
 * 通过funcCode查询按钮权限
*/
export const getAuth = (funcCode) => { 
    return request(URL.GET_AUTH, {
        method: "get",
        param: {
            funcCode
        }
    });
}