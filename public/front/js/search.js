(function () {

 function getHistory() {
     var history =localStorage.getItem("search_list") || '[]';
     var arr = JSON.parse(history);    //JSON.parse() 从一个字符串中解析出json对象
      return arr;
     console.log(arr);
 }

   function render() {
       var arr=getHistory();

       arr = {arr:arr}
       // console.log(arr);
       $(".lt_history").html( template("tpl", arr) );
   }
   render();

    //功能二：清空
    //1. 给清空按钮注册点击事件(委托)
    //2. 清空 search_list 这个值
    //3. 重新渲染

    $(".lt_history").on('click',".btn_empty",function () {
        // 弹出一个确认框
       mui.confirm('你确认要全部清除吗',"温馨提示",["否","是"],function (e) {
           console.log(e);
           if(e.index===1){
               localStorage.removeItem("search_list");
               render();
           }
       })
    });

    //功能3：删除
    //1. 给删除按钮注册点击事件
    //2. 获取到删除的下标
    //3. 获取到web存储中的数组
    //4. 删除数组中对应下标那项
    //5. 重新设置search_list的值
    //6. 重新渲染
    $(".content").on("click",".btn_delete",function () {

        var that=this;
        mui.confirm("你确认要删除该项吗","温馨提示",["否","是"],function (e) {
            if(e.index===1){
                var index= $(that).data('index');
                var arr =getHistory();

                arr.splice(index,1);

                // console.log(arr);

                localStorage.setItem("search_list",JSON.stringify(arr));

                render();
            }
        })
    });

    //功能4： 增加
    //1. 给搜索按钮注册事件
    //2. 获取到文本框value值
    //3. 获取到存储中的数组
    //4. 把value值添加到数组中的最前面
    //5. 重新设置search_list的值
    //6. 重新渲染 （跳转到搜索详情页）

       $(".search_btn").on("click",function () {

           var value =$('.search_input').val().trim();

           $('.search_input').val("");
           if(value===""){
               mui.toast("请输入关键字");
               return;
           }

           var arr=getHistory();

           var index=arr.indexOf(value);

           if(index !=-1){
               arr.splice(index,1);
           }

           if(index>10){
               //删除数组的最后一项
               arr.pop();
           }
           arr.unshift(value);

           localStorage.setItem("search_list",JSON.stringify(arr));

           location.href="searchList.html?key="+value;


           render();


       })

})();