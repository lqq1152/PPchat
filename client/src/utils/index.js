//工具函数模块

export function getRedirectTo(type, header) {
    let path = '';
    if(type==='Boy'){
        path = 'boy'
    }else {
        path = 'girl'
    }
    if(!header){
        path += 'info'
    }
    return path
}