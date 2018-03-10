
//截取地址栏上数据的方法

//首先使用

  function getSearch(key) {


    var search = location.search;

    console.log(location.search);

    //吧前面的问号去掉

    search = search.splice(1);

    //对参数进行解码
    search = decodeURI(search);

    //4. 把字符串根据&切割成数组
    var arr = search.split("&")

    //遍历数组
      var obj={};
    arr.forEach(function (element, index) {
        var k = element.split("=")[0];
        var v = element.split("=")[1];

        obj[k] = v;
    })

    return obj[key];

  }




