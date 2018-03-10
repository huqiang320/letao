$(function () {


    function render() {

        $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function (info) {
                console.log(info);
                if(info.error){
                    location.href = "login.html?retUrl="+location.href;
                };
                $('#OA_task_2').html(template('tpl',{info:info}));

                mui(".mui-scroll-wrapper").scroll({
                    indicators:false
                });

                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();

            }
        })
    };


    //配置下拉刷新
    mui.init({
        pullRefresh:{
            container:".mui-scroll-wrapper",
            down:{
                auto: true,//页面进入，自动下拉刷新一次
                //indicators:false,//禁用滚动条
                callback: function () {
                    render();

                }
            }
        }
    });

    // 点击删除

    $("#OA_task_2").on('tap',".btn_delete",function () {

        var id=$(this).data('id');

         mui.confirm("您确认要删除该条商品吗","温馨提示",['再看看',"删除"],function (e) {
             if(e.index==1){
                 $.ajax({
                     type:'GET',
                     url:'/cart/deleteCart',
                     data:{
                         id:[id]
                     },
                     success:function (info) {
                         console.log(info);
                         if(info.success){
                             //触发一次下拉刷新就行
                             mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                         }
                     }
                 })
             }
         })
    })


});