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
                url: "/user/register",
                data: {
                    username: userName,
                    password: userPassword
                },
                type: "get",
                dataType: "json",
                success: function (result) {
                    if (result.status == "100") {
                        $("#js-submit").addClass("btn-success").html("注册成功，点击登录").off("click").on("click", function () {
                            location.href = "/login";
                        });
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