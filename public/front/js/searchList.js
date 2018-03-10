(function () {

    var page=1;
    var pageSize=4;

    function render(callback) {

        var param = {};

        param.page=page;
        param.pageSize=pageSize;
        param.proName = key;

        //对于price与num两个参数不一定要加
        //判断价格是否有now这个类，如果有now这个类，就需要传递price
        //判断库存是否有now这个类，如果有now这个类，就需要传递num
        //如果确定值：1 升序   2 降序

        //获取lt_sort下有没有now这个类的a

        var temp=$('.lt_sort a.now');

        if(temp.length>0){
            var sortName=temp.data('type');
            console.log(sortName);

            var sortValue=temp.find("span").hasClass("fa-angle-down")?2:1;

            param[sortName]=sortValue;
        };
        
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:param,
            success:function (info) {
                // console.log(info);
                setTimeout(function () {
                   callback(info);
                },1000);

            }
        })
    }

    //把地址栏中的key放到input 里面
    var key=getSearch("key");
    $(".search_input").val(key);

    mui.init({
        //配置下拉刷新和上拉加载的
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto:true,
                style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                callback :function () {
                    page=1;
                    render(function (info) {
                        //渲染数据
                        $('.product').html(template('tpl1',info));
                        //结束下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        //重置上拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                    })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up : {
                callback:function () {
                    page++;
                    render(function (info) {
                        if(info.data.length>0){
                            $('.product').append(template("tpl1",info));
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        }else{
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }
                    })
                }
            }
        }
    });


    //功能二：点击搜索按钮
    //1. 直接获取到input框中的value值
    //2. 再次发送ajax请求。
    $('.search_btn').on("tap",function () {
        $(".lt_sort a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        // console.log(666);
        key=$('.search_input').val();

        //让容器再刷新一次即可
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    })

    //功能三：排序功能
    //1. 给lt_sort下的a注册点击事件
    //2. 判断点击的a是否有now这个类，
    // 如果没有,加上now这个类，并且删除其他a的类, 让所有的箭头都向下
    // 如果有，改变这个a下的span的箭头方向

    $('.lt_sort a[data-type]').on('click',function () {
        // console.log(666);

        var $this=$(this);
        if($this.hasClass('now')){
            $this.find('span').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else {
            $this.addClass("now").siblings().removeClass("now");
           $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");

        }
        //让容器再刷新一次即可
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    })


})();