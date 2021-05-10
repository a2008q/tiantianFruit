$(function () {

    var error_name = false;
    var error_password = false;
    var error_check_password = false;
    var error_email = false;
    var error_check = false;
    var error_phone = false;


    $('#id_uname').blur(function () {
        check_user_name();
    });

    $('#pwd').blur(function () {
        check_pwd();
    });

    $('#cpwd').blur(function () {
        check_cpwd();
    });

    $('#email').blur(function () {
        check_email();
    });

    $('#phone').blur(function () {
        check_phone();
    });

    $('#allow').click(function () {
        if ($(this).is(':checked')) {
            error_check = false;
            $(this).siblings('span').hide();
        } else {
            error_check = true;
            $(this).siblings('span').html('请勾选同意');
            $(this).siblings('span').show();
        }
    });

    function check_phone() {
        var re = /^1[3|4|5|7|8][0-9]{9}$/;
        if (re.test($('#phone').val())) {
            $('#phone').next().hide();
            error_phone = false;
            csrf = $('input[name="csrfmiddlewaretoken"]').val()
            phone = $("#phone").val()
            $.ajax({
                type: "POST",
                url: '/index/checkPhone/',
                data: {'csrfmiddlewaretoken': csrf, 'phone': phone},
                success: function (msg) {
                    if (msg != 'ok') {
                        $('#phone').next().html('您输入的手机号已经被注册')
                        $('#phone').next().show();
                        error_check_password = true;
                    }
                }
            });
        } else {
            $('#phone').next().html('你输入的手机号格式不正确')
            $('#phone').next().show();
            error_check_password = true;
        }
    }


    function check_user_name() {
        var len = $('#id_uname').val().length;
        if (len < 5 || len > 20) {
            $('#id_uname').next().html('请输入5-20个字符的用户名')
            $('#id_uname').next().show();
            error_name = true;
        } else {
            $('#username').next().hide();
            error_name = false;
            csrf = $('input[name="csrfmiddlewaretoken"]').val()
            name = $("#id_uname").val()
            $.ajax({
                type: "POST",
                url: '/index/checkName/',
                data: {'csrfmiddlewaretoken': csrf, 'name': name},
                success: function (msg) {
                    if (msg != 'ok') {
                        alert("您输入的用户名已被注册");
                        $('#username').next().html('您输入的用户名已经被注册')
                        $('#username').next().show();
                        error_check_password = true;
                    }
                }
            });
        }
    }

    function check_pwd() {
        var len = $('#pwd').val().length;
        if (len < 8 || len > 20) {
            $('#pwd').next().html('密码最少8位，最长20位')
            $('#pwd').next().show();
            error_password = true;
        } else {
            $('#pwd').next().hide();
            error_password = false;
        }
    }


    function check_cpwd() {
        var pass = $('#pwd').val();
        var cpass = $('#cpwd').val();

        if (pass != cpass) {
            $('#cpwd').next().html('两次输入的密码不一致')
            $('#cpwd').next().show();
            error_check_password = true;
        } else {
            $('#cpwd').next().hide();
            error_check_password = false;
        }

    }

    function check_email() {
        var re = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/;

        if (re.test($('#email').val())) {
            $('#email').next().hide();
            error_email = false;
            csrf = $('input[name="csrfmiddlewaretoken"]').val()
            email = $("#email").val()
            $.ajax({
                type: "POST",
                url: '/index/checkEmail/',
                data: {'csrfmiddlewaretoken': csrf, 'email': email},
                success: function (msg) {
                    if (msg != 'ok') {
                        $('#email').next().html('您输入的邮箱已经被注册')
                        $('#email').next().show();
                        error_check_password = true;
                    }
                }
            });
        } else {
            $('#email').next().html('你输入的邮箱格式不正确')
            $('#email').next().show();
            error_check_password = true;
        }

    }


    $('#reg_form').submit(function () {
        check_user_name();
        check_pwd();
        check_cpwd();
        check_email();

        if (error_name == false && error_password == false && error_check_password == false && error_email == false && error_check == false) {
            return true;
        } else {
            return false;
        }

    });


})