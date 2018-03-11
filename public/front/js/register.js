$(function () {


    $('.btn_vcode').on('click',function (e) {
         e.preventDefault();   //禁用默认

        $(this).prop('disabled',true).addClass('huise').text('正在发送中...')

        $this=$(this);

        $.ajax({
            type:"get",
            url:'/user/vCode',
            success:function (info) {
                console.log(info);


                var count = 5 ;

                var timer = setInterval(function () {
                    count--;
                    $this.text(count+"秒后再发送");

                    if(count==0){
                        clearInterval(timer);
                        $this.prop('disabled',false).removeClass('huise').text('获取验证码')
                    };
                },1000)
            }

        })
    });

    $('.btn_register').on('click',function (e) {
        e.preventDefault();

        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        var mobile = $('[name=mobile]').val();
        var vCode = $('[name=vCode]').val();
        var repassword = $('[name=repassword]').val();

        if(!username){
            mui.toast('用户名不能为空');
            return false;
        }
        if(!password){
            mui.toast('密码不能为空');
            return false;
        }
        if(repassword !=password){
            mui.toast('确认密码不正确');
            return false;
        }
        if(!mobile){
            mui.toast('手机号不能为空');
            return false;
        }
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast('手机号格式不正确');
            return false;
        }

        if(!vCode){
            mui.toast('验证码不能为空');
            return false;
        }

        $.ajax({
            type:'post',
            url:' /user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function (info) {
                console.log(info);
                if(info.error==403){
                    mui.toast(info.message)
                }
                if(info.success){
                    location.href="login.html";
                }
            }
        })


    })



});