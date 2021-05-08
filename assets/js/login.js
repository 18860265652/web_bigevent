
$(function(){


  $('#link_reg').on('click',function(){
      $('.login-box').hide();
      $('.reg-box').show();
  })

  $('#link_login').on('click',function(){
    $('.login-box').show();
    $('.reg-box').hide();
})
  
 var form = layui.form

 form.verify({

  pwd: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] ,

  repwd:function(value){
   
  //  $pwd = $('.reg-box [name=repassward]').val();
  // var pwd = $('.reg-box').children('.layui-input:nth-child(2)').val();
  var pwd = $('.reg-box [name=password]').val()
   if (pwd !== value) {
     layui.layer.msg('两次密码必须相同');
  }
  
  }

 
  
 })

 var layer = layui.layer;
  // 监听注册表单的提交事件
 $('#form_reg').on('submit',function(e){
     console.log('niij');
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/api/reguser",
        data:{username: $('.reg-box [name=username]').val(),
      password: $('.reg-box [name=password]').val()},
        // dataType: "json",
        success: function (data) {
          console.log(data);
           layer.msg(data.message);
           if(data.status == 0){
            //  模拟点击事件
             $('#link_login').click();
           }
           
        }
      });
})
  

$('#form_login').submit(function(e) {
  // 阻止默认提交行为
  e.preventDefault()
  $.ajax({
    url: '/api/login',
    method: 'POST',
    // 快速获取表单中的数据
    data: $(this).serialize(),
    success: function(res) {
      if (res.status !== 0) {
        return layer.msg('登录失败！')
      }
      layer.msg('登录成功！')
      // 将登录成功得到的 token 字符串，保存到 localStorage 中
      localStorage.setItem('token', res.token)
      // 跳转到后台主页
      location.href = '/index.html'
    }
  })
})



})