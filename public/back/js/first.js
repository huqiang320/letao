(function () {

    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (info) {
                console.log(info);
                $("tbody").html( template("tpl", info));

                //渲染分页
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:currentPage,
                totalPages:Math.ceil(info.total/pageSize),
                onPageClicked:function (a,b,c,page) {
                    currentPage = page;
                    render();
                }
            })
          }
      })
    }
    render();

    // 分类模态框点击显示
    $('.btn_add').on('click',function () {
        $("#addModal").modal('show');
    });
    // 初始化表单验证
    var $form = $("#form");
    $form.bootstrapValidator({
        // 验证小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields:{
            categoryName: {
                validators:{
                    notEmpty:{
                        message:'一级分类的名称不能为空'
                    }
                }
            }
        }
      });

    //给表单注册校验成功的事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:"POST",
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function (info) {
                if(info.success){
                    //成功关闭模态框
                    $('#addModal').modal('hide');
                    // 重置表单的样式和内容
                    //重置表单的样式和内容
                    $form.data("bootstrapValidator").resetForm(true);

                    //重新渲染第一页
                    page=1;
                    render();
                }

            }
        })
    });

})();