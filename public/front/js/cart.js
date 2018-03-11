$(function () {


    function render() {

        $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function (info) {
                console.log(info);

                if(info.error){
                    location.href = "login.html?retUrl="+location.href;
                    return false;
                };


                $('#OA_task_2').html(template('tpl',{info:info}));

                mui(".mui-scroll-wrapper").scroll({
                    indicators:false
                });

                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();


                $(".lt_order span").text("00.00");

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
    });

    // 点击编辑

      $('#OA_task_2').on('tap',".btn_edit",function () {
          // console.log(666);
          var data=this.dataset;  //获取到我们在它身上传的data- 一系列的参数
          console.log(data);

          var html=template('editTpl',data);

             //替换掉html中所有的换行
              html = html.replace(/\n/g, "");

             mui.confirm(html,"编辑商品",['取消','确认'],function (e) {
                 if(e.index==1){

                     var id= data.id;
                     var size=$(".lt_edit_size span.now").text();
                     var num=$(".mui-numbox-input").val();

                     $.ajax({
                         type:'post',
                         url:'/cart/updateCart',
                         data:{
                             id:id,
                             size:size,
                             num:num
                         },
                         success:function (info) {
                             if(info.success){
                                 console.log(info);
                                 mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

                             }
                         }

                     })
                 }
             });

          //给span添加tap点击事件

          $('.lt_edit_size').on('tap','span',function () {
              console.log(666);
              $(this).addClass('now').siblings().removeClass('now');

          });

          // 初始化输入框按钮
          mui('.mui-numbox').numbox();


      });


      //计算总金额

    $('#OA_task_2').on('change','.ck',function () {
        // console.log(666);

        var total=0;

        $(':checked').each(function () {

            var price = $(this).data('price');
            var num = $(this).data('num');

            total +=price*num;

        });

        $(".lt_order span").text(total.toFixed(2));   //toFixed(2) 保留两位有效

    })
      



});