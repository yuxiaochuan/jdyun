$(function () {
    var register = {
        init: function () {
            this.bindEvents();
        },
        bindEvents: function () {
            $("#js-submit").on("click", this.toAjax);
        },
        toAjax: function () {
            var userName = $("#username").val();
            var userPassword = $("#password").val();
            if (!userName || !userPassword) {
                alert("请输入完整的用户名密码！");
                return
            }
            $.ajax({
                url: "/user/login",
                data: {
                    username: userName,
                    password: userPassword
                },
                type: "get",
                dataType: "json",
                success: function (result) {
                    if (result.status == "100") {
                        location.href = "/index";
                    }
                    else {
                        alert(result.msg);
                    }
                },
                error: function (err) {
                    console.log(err);
                }

            })
        }
    };

    register.init();
    
    
    
    
});