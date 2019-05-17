var baseUrl = "http://58.16.64.103:81/zwface/";
var data = {}

try {
    if (GetQueryString("zww")) {
        baseUrl = "http://59.215.224.61/zwface/";
    }
} catch (error) {

}

window.ondragstart = function () {
    return false;
}

function formatDate(date, formatStr) {
    var str = formatStr;
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/ss/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    return str;
}

function hideToast() {
    $(".modelFream").remove();
    $(".toast").remove();
}

function ajax(url, data, success, notOk, error) {
    $.post({
        url: baseUrl + url + "?devId=" + devId,
        type: "POST",
        data: data,
        timeout: 20000,
        success: function (e) {
            if (e.ok) {
                success(e.obj);
            } else {
                notOk(e.msg);
            }
        }, error: function (e) {
            error();
        }
    })
}

function ajaxLc(data, success, notOk, error) {
    $.post({
        url: setting.lcUrl,
        type: "POST",
        data: data,
        contentType: "application/json",
        timeout: 20000,
        success: function (e) {
            if (e.Succ == 1) {
                success(e);
            } else {
                notOk(e);
            }
        }, error: function (e) {
            error();
        }
    })
}

function ajaxLcCom(data, complete) {
    $.post({
        url: setting.lcUrl,
        type: "POST",
        data: data,
        contentType: "application/json",
        timeout: 20000,
        complete: function (e) {
            complete();
        }
    })
}

function ajaxPj(data, success, notOk, error) {

    $.get(setting.tokenUrl, function (token) {
        data.token = token;

        var sds = JSON.stringify(data);
        console.log(sds)
        $.post({
            url: setting.interfaceUrl,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            timeout: 20000,
            success: function (e) {
                if (e.Succ == 1) {
                    success(e);
                } else {
                    notOk(e);
                }
            }, error: function (e) {
                error();
            }
        })
    })
}

var devId = ft.getConfig("设备编号");
sessionStorage.guanjitime = ft.getConfig("关机时间");
var deptId = "";

var setting = {
    govName: "",
    lcUrl: "",
    winId: "",
    tokenUrl: "",
    interfaceUrl: "",
    socketUrl: "",
    loginCode: "",
    waitCode: "",
    completeCode: "",
    callCode: "",
    reCallCode: "",
    dropCode: "",
    userInfoCode: "",
    speciallyCallCode: ""
};

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return "";
}

function showLoading(time = 5000) {
    if ($(".modelFream").length == 0 && $(".box").length == 0) {
        $("body").append('<div class="modelFream"></div><div class="box"><div class="thing"></div><div class="thing"></div><div class="thing"></div><div class="thing"></div></div>');

        setTimeout(function () {
            hideLoading();
        }, time);
    }
}

function hideLoading() {
    $(".modelFream").remove();
    $(".box").remove();
}

function send(data, success, notOk, error) {
    $.post({
        url: setting.socketUrl + "?winId=" + setting.winId,
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json;charset=uth-8",
        timeout: 10000,
        success: function (e) {
            if (e.ok) {
                if (success) {
                    success(e);
                }
            } else {
                if (notOk) {
                    notOk(e);
                }
            }
        }, error: function (e) {
            if (error) {
                error();
            }
        }
    })
}

function showToast(titleText = "信息", messageText, buttonText = "确定", okFunc) {
    if ($(".toast").length == 0) {
        $("body").append('<div class="modelFream"></div><div class="toast"><div class="toastTitle">信息</div><div class="toastMessage"></div><div class="toastButton"><div class="button">确定</div></div></div>');

        if (titleText) {
            $(".toastTitle").text(titleText);
        }
        $(".toastMessage").text(messageText);

        if (buttonText) {
            $(".toastButton div").text(buttonText);
        }

        setTimeout(() => {
            hideToast();
        }, 10000);

        $(".toastButton div").click(function () {
            hideToast();

            if (okFunc) {
                okFunc();
            }
        });
    }
}

function hideToast() {
    $(".modelFream").remove();
    $(".toast").remove();
}