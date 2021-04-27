$(function () {
    var error_name = false;
    $('#username').blur(function () {
        check_user_name();
    });

    function check_user_name() {
        var len = $('#username').val().length;
        if (len < 5 || len > 20) {
            $('#username').next().html('请输入5-20个字符的用户名')
            $('#username').next().show();
            error_name = true;
        } else {
            $('#username').next().hide();
            error_name = false;
        }
    }
})