$(function () {

    $('.btn_login').on('click',function () {

        var password=$('[name=password]').val();
        var username=$('[name=username]').val();

        if(!username){
            mui.toast('请输入用户名');
            return;
        };
        if(!password){
            mui.toast('请输入密码');
            return;
        };

        $.ajax({
            type:"post",
            url:"/user/login",
            data:{
                username:username,
                password:password
            },
            success:function (info) {
                console.log(info);
                if(info.error){
                    mui.toast(info.message);
                    return;
                };
                if(info.success){
                    //判断，如果有retUrl参数，说明需要调回去， retUrl对应的地址去，
                    //如果没有，默认去 user.html

                    if(location.search.indexOf("retUrl") !==-1){
                        //说明有，跳转到上一页,调回到retUrl指定的地址
                        location.href= location.search.replace("?retUrl=", "");
                    }else {
                        location.href="user.html";
                    }

                }
            }
        })

    })




});