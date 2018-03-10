$(function () {

    var productId=getSearch("productId");

    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:productId
        },
        success:function (info) {
            // console.log(info);
            //给info添加一个数组  用来储存尺码
            var tempArr=info.size.split("-");
            var arr=[];
            for(var i=+tempArr[0];i<=tempArr[1];i++){
                arr.push(i);
            };
            info.sizeArray=arr;


            $('.mui-scroll').html(template('tpl',info));

            //重新初始化轮播图

            mui('.mui-slider').slider({
                interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //重新初始化numbox
            mui('.mui-numbox').numbox();

            //可以选择尺码
            $('.size span').on('click',function () {
                $(this).addClass("now").siblings().removeClass("now");
            })
        }

    });

    // 功能二  加入购物车

   //给加入购物车添加点击事件
    $('.btn_add_cart').on('click',function () {
        // console.log(666);
      var size =$('.size span.now').text();
      var num=$(".mui-numbox-input").val();

      if(!size){
          mui.toast('请选择尺码');
          return;
      };

      $.ajax({
          type:"post",
          url:"/cart/addCart",
          data:{
              productId:productId,
              size:size,
              num:num
          },
          success:function (info) {
              console.log(info);
              if(info.error){
                  //跳转到登录页面， ,并且把当前页给传递过去。
                  location.href="login.html?retUrl="+location.href;
              }
              if(info.success){
                  mui.confirm('添加成功',"温馨提示",['继续浏览',"去购物车"],function (e) {
                      if(e.index==1){
                          location.href="cart.html";
                      }
                  })
              }
          }
      })

    })

});