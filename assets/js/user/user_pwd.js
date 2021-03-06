$(function(){
    var form =layui.form;
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          somePwd:function(value){
             if(value == $('[name=oldPwd]').val()){
                 return "原密码与旧密码不能相同"
             }
          },
          rePwd:function(value){
               if(value !== $('[name=newPwd]').val()){
                   return "两次密码必须一致"
               }
          }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            // dataType: "dataType",
            success: function (data) {
                console.log(data);
                if(data.status !== 0 ){
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功');
                $('.layui-form')[0].reset();
            }
        });
    })
})
