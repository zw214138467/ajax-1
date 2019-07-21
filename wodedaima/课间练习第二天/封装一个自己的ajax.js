/*
  确定：
    1.不一定所有的请求都带参数 - 默认值
    2.多个参数传递按照一定的顺序就比较复杂 - 使用无序传参 - 对象传参
*/

/*
  options 是一个对象 - 
    -要求的属性是4个
      type,url,data,callback
*/
function ajax(options) {
    options = options || {};
    options.type = options.type || 'get';
    options.data = options.data || '';
    options.url = options.url || '';
    options.callback = options.callback || function(res){
        console.log('你的回调函数没给，我们不建议这样干');  
        console.log(res);
    }

    let xhr = new XMLHttpRequest();

    // 判断如果是get请求，就把数据拼接在url的后面
    if(options.type ==='get'){
        options.url +='?'+options.data;
    }
    xhr.open(options.type,options.url);
    // 然后在判断是否是post请求，把数据放在send的里面，在之前还要设置请求头
    if(options.type === 'post'){
        // 先设置请求头
        xhr.setRequestHeader('content-Type','application/x-www-form-urlencoded')
        xhr.send(options.data);
    }else{
        xhr.send();
    }
    // 然后在设置监听
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            if(xhr.status ===200 ){
                // 请求成功
        // console.log(xhr.responseText);
        // 如果遇上别人的逻辑在封装的代码里面，最好的处理方式——回调函数
                options.callback(xhr.responseText)
            }
        }
    }
}