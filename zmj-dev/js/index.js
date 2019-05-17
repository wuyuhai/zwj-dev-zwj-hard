// webSocket变量
var ws = null;
// 等待人数Timer
var numberTime = null;
// 呼叫者
var call = {};
// 办事者
var userInfo = {};
// 呼叫器状态缓存
var stateTemp = {};
// 关闭time
var t = null;

window.onload = function () {

    document.oncontextmenu = function () { return false; }
    document.onselectstart = function () { return false; }
    document.onselect = function () { return false; }

    document.onkeydown = function (key) {
        if (key.keyCode == 123 && key.ctrlKey) {
            ft.showDevTools();
        }
    }

    console.log("程序启动");
    init();

    var vue = new Vue({
        el: ".main",
        data: data,
        methods: {
            pj: function (e, item) {
                pingJia(e, item);
            },
            showClose: function (e) {
                data.timer++;
                clearTimeout(t);
                t = setTimeout(() => {
                    data.timer = 0;
                }, data.timer >= 5 ? 5000 : 500);
            },
            close: function (e) {
                ft.close();
            }
        },
        created: function (e) {
            console.log("vue界面渲染成功");

            // 时间显示
            showTime();

            // 获取用户信息
            getDevInfo()

            ft.setTopMost(true);
            ft.setWindowState(2);
        }
    });

    dlcg = document.getElementById("dlcg");
    ckbcz = document.getElementById("ckbcz");
    myyg = document.getElementById("myyg");
    tcdl = document.getElementById("tcdl");
    zzhj = document.getElementById("zzhj");
    qpj = document.getElementById("qpj");
    zcfw = document.getElementById("zcfw");
    ztfw = document.getElementById("ztfw");
    gxpj = document.getElementById("gxpj");
    dlsb = document.getElementById("dlsb");
    whm = document.getElementById("whm");
    hjsb = document.getElementById("hjsb");
    qhcg = document.getElementById("qhcg");
    qhsb = document.getElementById("qhsb");
    wlzd = document.getElementById("wlzd");
}

/*
    页面初始化
*/
function init() {
    data.page = "page1";

    // top
    data.govName = "";
    data.time = "";
    data.date = "";

    // left
    data.head = "img/head.jpg";
    data.workName = "";
    data.workId = "";
    data.deptName = "";
    data.pingjia = 5;
    data.mobile = "";
	data.guanjibol = true;
    // page1
    data.banners = ["img/办全省事.jpg"];
    data.bannerIndex = 0;
    setInterval(function () {
        if (data.bannerIndex >= data.banners.length - 1) {
            data.bannerIndex = 0;
        } else {
            data.bannerIndex++;
        }
    }, 5000)

    // page4
    data.ligang = "";
    data.waitNum = 0;
    data.timer = 0;
    data.tips = "";
    data.dengColor = "";
    data.isLiang = true;
    data.winId = "";

    console.log("程序初始化成功");
}


/*
    时间和日期显示
*/
function showTime() {
    setInterval(() => {
        var date = new Date();
        data.time = formatDate(date, "HH:mm:ss");
        var d = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/";
        switch (date.getDay()) {
            case 0:
                d += "星期日";
                break;
            case 1:
                d += "星期一";
                break;
            case 2:
                d += "星期二";
                break;
            case 3:
                d += "星期三";
                break;
            case 4:
                d += "星期四";
                break;
            case 5:
                d += "星期五";
                break;
            case 6:
                d += "星期六";
                break;
        }
        data.date = d;
        var gjstr = date.getHours()*60 +  date.getMinutes();
//		console.log(gjstr)
//		console.log(Number(sessionStorage.guanjitime.substr(0,2))*60 + Number(sessionStorage.guanjitime.substr(2,2)))
		if(sessionStorage.guanjitime && sessionStorage.guanjitime != "null"){
			
		}else{
			sessionStorage.guanjitime = 1800;
		}
		console.log(sessionStorage.guanjitime)
		if(Number(gjstr)>(Number(sessionStorage.guanjitime.substr(0,2))*60 + Number(sessionStorage.guanjitime.substr(2,2)))){
			if(data.guanjibol == true){
				console.log("1分钟后关机")
				data.guanjibol = false;
				setTimeout(function(){				
					ft.shutDown();
				},60000)
			}						
		}
    }, 1000);
    console.log("右上角时间显示成功");
}

/*
    获取设备信息
*/
function getDevInfo() {
    ajax("/face/getDevInfo", {

    }, function (success) {
        console.log("获取到设备信息：" + JSON.stringify(success));

        localStorage.setItem("devInfo", JSON.stringify(success));

        setting = JSON.parse(success.setting);
        data.govName = setting.govName;

        if (setting.winId) {
            data.winId = "窗口编号：" + setting.winId;
        }

        connectionOpen();
        message();
    }, function (fail) {
        console.log("获取设备信息失败" + fail);
        deng(fail, false);
        getDevInfo();
    }, function (error) {

        var strDevInfo = localStorage.getItem("devInfo");
        if (strDevInfo) {
            var devInfo = JSON.parse(strDevInfo);

            setting = JSON.parse(devInfo.setting);
            data.govName = setting.govName;

            if (setting.winId) {
                data.winId = "窗口编号：" + setting.winId;
            }

            connectionOpen();
            message();
        } else {
            console.log("获取设备信息网络中断");
            deng("r", "网络中断了：获取设备信息", false);
            getDevInfo();
        }
    })
}

/*
    轮询等待人数
*/
function connectionOpen() {
    setTimeout(() => {
        if (data.workId) {
            ajaxLc(JSON.stringify(setting.waitCode).replace("#winId#", setting.winId)
                , function (success) {
                    data.waitNum = success.Wait;

                    send({
                        winId: setting.winId,
                        workId: data.workId,
                        option: "waitNum",
                        value: success.Wait
                    })

                }, function () {

                }, function () {

                })
        }

        connectionOpen();
    }, 1000);
}

/*
    message
*/
function message() {

    setTimeout(() => {
        send({
            winId: setting.winId,
            workId: data.workId,
            option: "getinfo",
        }, function (suc) {
            var state = suc.obj;
            if (stateTemp.typeData != state.typeData || stateTemp.workId != state.workId) {
                console.log("onmessage：" + JSON.stringify(state));

                var isLogin = false;

                if (state.workId && state.workId != data.workId) {
                    // 重新登录
                    login(state.workId, setting.winId);
                    isLogin = true;
                }

                if (stateTemp.typeData == "E" && state.typeData != "E") {
                    data.page = "page1";
                    zcfw.play();
                }

                if (state.typeData == "Q") {
                    // 登录
                    if (!isLogin) {
                        login(state.workId, setting.winId);
                    }
                } else if (state.typeData == "L") {
                    // 空闲状态
                    if (stateTemp.typeData == "S") {
                        if (stateTemp.processNo) {
                            // 评价
                            ajaxLcCom(JSON.stringify(setting.completeCode).replace("#winId#", setting.winId)
                                , function () {
                                    data.page = "page2";
                                    qpj.play();
                                    setTimeout(function () {
                                        if (data.page == "page2") {
                                            data.page = "page1";
                                        }
                                    }, 10000)
                                })
                        }
                    } else if (stateTemp.typeData == "T" || stateTemp.typeData == "F") {
                        // 弃号
                        ajaxLc(JSON.stringify(setting.dropCode).replace("#winId#", setting.winId)
                            , function (suc) {
                                qhcg.play();
                            }, function () {
                                qhsb.play();
                            }, function () {
                                qhsb.play();
                            })
                    }

                } else if (state.typeData == "E") {
                    // 暂停服务
                    data.page = "page4";
                    ztfw.play();
                } else if (state.typeData == "N") {
                    // 未登录
                    data.deptName = "";
                    data.workName = "";
                    data.workId = "";
                    data.head = "img/head.jpg";
                    if (stateTemp.workId) {
                        tcdl.play();
                    }
                } else if (state.typeData == "T") {
                    // 呼叫
                    if (data.page == "page2") {
                        data.page == "page1";
                    }

                    ajaxLc(JSON.stringify(setting.callCode).replace("#winId#", setting.winId)
                        , function (success) {
                            zzhj.play();
                            send({
                                winId: setting.winId,
                                workId: data.workId,
                                option: "call",
                                value: success.QueueNum
                            });

                            ajaxLc(JSON.stringify(setting.userInfoCode).replace("#winId#", setting.winId)
                                , function (suc) {
                                    userInfo = suc;
                                }, function () {

                                }, function () {

                                })

                            call = success;
                        }, function (cerror) {
                            if (cerror.Msg == "无号码") {
                                whm.play();
                            } else {
                                hjsb.play();
                            }
                        }, function () {
                            hjsb.play();
                        })
                } else if (state.typeData == "P") {
                    // 重呼
                    if (state.processNo) {
                        if (data.page == "page2") {
                            data.page == "page1";
                        }

                        ajaxLc(JSON.stringify(setting.reCallCode).replace("#winId#", setting.winId)
                            , function (suc) {
                                zzhj.play();
                            }, function () {
                                hjsb.play();
                            }, function () {
                                hjsb.play();
                            })
                    } else {
                        var aa = "";
                    }
                } else if (state.typeData == "F" && state.processNo && stateTemp.typeData == "P" && !stateTemp.processNo) {
                    // 特呼
                    if (data.page == "page2") {
                        data.page == "page1";
                    }

                    ajaxLc(JSON.stringify(setting.speciallyCallCode).replace("#winId#", setting.winId).replace("#queueNum#", state.processNo)
                        , function (suc) {
                            zzhj.play();
                        }, function () {
                            hjsb.play();
                        }, function () {
                            hjsb.play();
                        })
                }

                stateTemp = state;
            }

            deng("", true)
            message();
        }, function (no) {
            deng(no && no.msg ? no.msg : "", false)

            message();
        }, function (err) {

            deng("未能连接到天线服务", false)
            message();
        })
    }, 500);
}

/*
    评价操作
*/
function pingJia(e, item) {
    try {
        ajaxPj({
            "token": "",
            "Service": "QueueCity.AddScore",
            "QueueNum": call.QueueNum,
            "ItemScore": e,
            "ItemContent": item,
            "DetailScore": 1,
            "DetailContent": "",
            "BatchCnt": 1,
            "CreateTime": formatDate(new Date(), "HH:mm:ss"),
            "DeptName": data.deptName,
            "EmpNo": data.workId,
            "EmpName": data.workName,
            "ScoreMode": "评价器",
            "WindowID": setting.winId,
            "Tc": 0,
            "Valid": 1,
            "DeptID": deptId,
            "Date": formatDate(new Date(), "yyyy-MM-dd"),
            "BizID": call.BizID,
            "BizName": call.BizName,
            "CardID": userInfo.IdNo
        }, function (e) {
            data.page = "page3";
            setTimeout(function () {
                data.page = "page1";
            }, 5000)
            gxpj.play();
        }, function (e) {
            data.page = "page3";
            setTimeout(function () {
                data.page = "page1";
            }, 5000)
            gxpj.play();
        }, function (e) {
            data.page = "page3";
            setTimeout(function () {
                data.page = "page1";
            }, 5000)
            gxpj.play();
        })
    } catch (error) {
        data.page = "page1";
        gxpj.play();
    }
}

/*
    通过员工号和窗口编号登录
*/
function login(workId, winId) {
    ajaxLcCom(JSON.stringify(setting.completeCode).replace("#winId#", setting.winId)
        , function () {
            login1(workId, winId);
        })
}

function login1(workId, winId) {
    ajaxLc(JSON.stringify(setting.loginCode).replace("#winId#", winId).replace("#workId#", workId)
        , function (success) {
            console.log("获取到浪潮登录信息：" + JSON.stringify(success));

            data.deptName = success.DeptName;
            data.workName = success.UserName;
            data.workId = success.UserID;
            data.pingjia = 5;

            send({
                winId: setting.winId,
                workId: data.workId,
                option: "login",
                value: data.workName
            });

            ajaxPj({
                Service: "QueueCity.GetUserInfo",
                token: "",
                EmpNo: data.workId
            }, function (e) {
                if (e.Image) {
                    data.head = "data:image/png;base64," + e.Image;
                }

                if (e.DeptID) {
                    deptId = e.DeptID;
                }

                if (e.Mobile) {
                    data.mobile = e.Mobile
                }
            }, function (e) {

            }, function (e) {

            })

            dlcg.play();
        }, function (error) {
            console.log(JSON.stringify(error))

            if (error && error.Msg) {
                if (error.Msg == "未设置窗口LED显示内容") {
                    ckbcz.play();
                } else if (error.Msg == "未找到该员工部门记录" || error.Msg == "不是本局员工") {
                    myyg.play();
                } else {
                    dlsb.play();
                }
            } else {
                dlsb.play();
            }
        }, function () {
            wlzd.play();
        })
}

function deng(msg, color) {
    if (color) {
        data.dengColor = "green";
    } else {
        data.dengColor = "red";
    }

    data.tips = msg;
    data.isLiang = !data.isLiang;
}