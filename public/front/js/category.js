(function () {

    $.ajax({
        type:'GET',
        url:' /category/queryTopCategory',
        data:{},
        dataType:'json',
        success:function (info) {
            // console.log(info);
            $('.first').html(template('tmp1',info));
            render(info.rows[0].id);
        }
    })

    $('.first').on('click','li',function () {
        console.log(666);
        $(this).addClass('now').siblings().removeClass('now');
        var id=$(this).data('id');

        render(id);
    })

    function render(id) {

        $.ajax({
            type:'GET',
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            dataType:'json',
            success:function (info) {
                console.log(info);
                $(".second").html( template("tmp2", info) );
            }
        })
    }


})();