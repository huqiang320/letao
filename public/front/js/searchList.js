(function () {

    var key= getSearch("key");
    console.log(key);

    function render() {

        $(".product").html('<div class="loading"></div>');

        var param = {};

        param.page=1;
        param.pageSize=100;
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
        }
        
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:param,
            success:function (info) {
                // console.log(info);
                setTimeout(function () {
                    $('.product').html(template('tpl1',info))
                },1000);

            }
        })
    }
    render();

    //功能二：点击搜索按钮
    //1. 直接获取到input框中的value值
    //2. 再次发送ajax请求。
    $('.search_btn').on("click",function () {
        // console.log(666);

        key=$(".search_input").val();

        render();

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
        render();

    })


})();