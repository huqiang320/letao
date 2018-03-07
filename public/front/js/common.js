

    mui('.mui-slider').slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });

    mui(".mui-scroll-wrapper").scroll({
        indicators:false
    });


    // 封装一个截取地址栏所有的参数

    function getSearch(key) {
        //1.获取到参数
        var search=location.search;

        //2.对参数列表进行解码
        search=decodeURI(search);

        //3.去掉？
        search = search.slice(1);

        //4.把字符串根据&切割成数组
        var arr =search.split("&");

        //5.遍历数组
        var obj={};
        arr.forEach(function (element,index) {
            var k =element.split("=")[0];
            var v =element.split("=")[1];

            obj[k]=v;
1        });
        return obj[key];
    }


