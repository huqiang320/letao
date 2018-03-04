$(function () {

    var page=1;
    var pageSize=5;

    function render() {
        $.ajax({
            type:'GET',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
                // console.log(info);
                $('tbody').html(template('tpl',info));

                //6. 渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3, //如果使用了bootstrap3版本，必须指定
                    currentPage: page,  //设置当前页
                    totalPages: Math.ceil(info.total/info.size),//设置总页数
                    numberOfPages:5,// 设置显示多少页
                    //当页码被点击的时候触发
                    onPageClicked: function (a,b,c,p) {
                        //修改一下page的值
                        page = p;
                        //重新渲染
                        render();
                    }

                });
            }
        })
    }

    render();

    //启用禁用按钮
    $('tbody').on('click','.btn',function () {
        console.log(666);
        $('#userModal').modal('show');

        var id=$(this).parent().data('id');

        var isDelete=$(this).hasClass('btn-success')?1:0;

        $('.btn_confirm').off().on('click',function () {
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function (info) {
                    if(info.success){
                        $('#userModal').modal('hide');
                        render();
                    }
                }
            })
        });
    })
});