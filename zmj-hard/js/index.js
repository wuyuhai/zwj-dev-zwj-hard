window.onload = function () {
    document.oncontextmenu=function(){return false;} 
    document.onselectstart=function(){return false;} 
    document.onselect=function(){return false;}

    document.onkeydown = function(key) {
        if(key.keyCode == 123 && key.ctrlKey) {
            ft.showDevTools();
        }
    } 

    data.index = 0;
    data.name = null;
    data.sex = null;
    data.birthday = null;
    data.address = null;
    data.number = null;
    data.people = null;
    data.signOffice = null;
    data.effectivedate = null;
    data.photo = null;

    data.sign = false;
    var time = null;

    data.fingerPrint = [];

    data.is_gpy = false;
    data.is_sxt = false;
	data.is_hzsldl = false;
	
	data.sldlgonghao = "";
	data.sldlname = "";
	data.rlsbimg = "img/opencamera.gif"
	data.sldlhead = "";
	
	data.aslieveorback = 1;
	data.loginkind = 1;
	data.tishibol = 0;
	data.tishiyu = "";
	data.ghinput = "";
	
	
    var vue = new Vue({
        el: ".main",
        data: data,
        methods: {
        	loginkindchange(){
        		if(this.loginkind == 1){
        			if (time) {
	                    clearTimeout(time);
	                }
        			ft.closeCamera({})
        			this.loginkind = 2;
        		}else{
        			time = setTimeout(function(){
        				if(data.sldlname == ""){
                    		fc85bcm()
                    	}
        			},2000)	
        			this.loginkind = 1;
        		}		
        	},
        	logogh() {
				if(!data.ghinput) {
					data.tishibol = 1;
					data.tishiyu = "工号不能为空";
					return
				} else {													
					ajaxPj({
						Service:"QueueCity.GetUserInfo",
						EmpNo:data.ghinput,
					}, function(e){
						console.log(e)
						if(e){
							var success = e;
							var bmid = e.DeptID;
							ajaxPj({
								Service:"QueueCity.GetWindowList",
							}, function(e) {
								console.log(e)
								if(e){
									var arr = e.Windows;
									for(var i = 0;i<arr.length;i++){
										if(bmid == arr[i].DeptID){
                                            ajaxziji(ftbaseUrl + "employee_face/face/loginWithWorkerId",{"devId":devId,"workerId":data.ghinput},function(es){
                                                console.log(es)
                                                data.sldlgonghao = success.EmpNo;
                                                data.sldlname = success.EmpName;
                                                if(success.Image){
                                                    data.sldlhead = "data:image/png;base64," + success.Image;
                                                }else{
                                                    $.post(ftbaseUrl + "employee_face/face/findByWorkerId",{"workerId":success.EmpNo},function(e){
                                                        console.log(e)
                                                        if(e.ok == true){
                                                            if(e.obj.faceUrl){
                                                                data.sldlhead = "data:image/png;base64," + e.obj.faceUrl;
                                                            }else{
                                                                data.sldlhead = "";
                                                            }
                                                        }else{
                                                            data.sldlhead = "";
                                                        }
                                                    })
                                                }
                                            },function(es){
                                                console.log(es)
                                            },function(es){
                                                console.log(es)
                                            })
                                            return;
										}
									}
                                    showToast("提示", "该工号跟所在业务窗口不匹配", "确定", function () {
                                        hideToast();
                                    });
								}
							})
						}
					}, function(e){
						console.log(e)
						if(e){
							data.tishibol = 1;
							data.tishiyu = "该工号不存在";
							setTimeout(function() {
								data.tishibol = 0;
							}, 2000)
						}
					}, function(e){
						console.log(e)
					})
//					login(this.ghinput, setting.winId)
				}
			},
            mousemove: function (e) {
                ft.drag();
            },
            select: function (e) {
                if (e != data.index) {
                    data.index = e;
                }
            },
            min: function (e) {
                ft.setWindowState(1);
            },
            closecao(){
//          	if(data.sldlname != ""){
//                  this.tuichudl()
//             	} 
               	if (time) {
                    clearTimeout(time);
                }
    			ft.closeCamera({
				    success: function (e) {
				        console.log(e);
				        ft.close()
				    },
				    fail: function (e) {
				        console.log(e);
				        ft.close()
				    }
				});
//          	ft.close()
            },
            gpy_click: function (e) {
                ft.shootCamera({
                    success: function (s) {
                        ft.selectPath({
                            filter: "*.jpg",
                            success: function (ss) {
                                ft.writeBase64(ss.data, s.data);
                            },
                            fail: function (f) {

                            }
                        });
                    },
                    fail: function (f) {

                    }
                })
            },
            sxt_click: function (e) {
                ft.shootCamera({
                    success: function (s) {
                        ft.selectPath({
                            filter: "*.jpg",
                            success: function (ss) {
                                ft.writeBase64(ss.data, s.data);
                            },
                            fail: function (f) {

                            }
                        });
                    },
                    fail: function (f) {

                    }
                })
            },
            card_re: function (e) {
                idCard();
            },
            card_ok: function (e) {
                ft.selectPath({
                    filter: "*.bmp",
                    success: function (ss) {
                        ft.writeBase64(ss.data, data.photo.replace("data:image/png;base64,", ""));
                    },
                    fail: function (f) {
                        showToast("提醒", "保存失败！", "确定", function () {

                        });
                    }
                });
            },
            sign_ok: function (e) {
                ft.saveSign({
                    success: function (e) {
                        saveSign(e);
                    },
                    fail: function (e) {
                        showToast("提醒", e.message, "确定", function () {

                        });
                    }
                })
            },
            pf_re: function (e) {
                data.fingerPrint = [];
            },
            savePf: function (e) {
                ft.selectPath({
                    filter: "*.jpg",
                    success: function (ss) {
                        ft.writeBase64(ss.data, e.replace("data:image/png;base64,", ""));
                    },
                    fail: function (f) {
                        showToast("提醒", "保存失败！", "确定", function () {

                        });
                    }
                });
            },
            tuichudl(){	
				var jsondata = JSON.stringify({
					devId:devId,
					workerId:this.sldlgonghao
				})				
				var ds = {
					status:0,
					data:jsondata,
				}
				ajaxziji(ftbaseUrl + "employee_face/face/operation",ds,function(es){
					console.log(es)
					data.sldlgonghao = "";
					data.sldlname = "";
					data.rlsbimg = "img/opencamera.gif"
					data.sldlhead = "";
				},function(es){
					console.log(es)
				})
            },
            comebacke(){
            	this.aslieveorback = 1;
            	var jsondata = JSON.stringify({
					devId:devId,
					workerId:data.sldlgonghao
				})				
				var ds = {
					status:1,
					data:jsondata,
					type:1,
				}
				ajaxziji(ftbaseUrl + "employee_face/face/operation",ds,function(es){
					console.log(es)
				},function(es){
					console.log(es)
				})
            },
            znashilikai(){
            	this.aslieveorback = 2;
            	var jsondata = JSON.stringify({
					devId:devId,
					workerId:data.sldlgonghao,				
				})				
				var ds = {
					status:1,
					data:jsondata,
					type:0,
				}
				ajaxziji(ftbaseUrl + "employee_face/face/operation",ds,function(es){
					console.log(es)
				},function(es){
					console.log(es)
				})
            },
        },
        watch: {
            index: function (n, o) {
            	console.log(o)
                if (o == 1) {
                    // 关闭摄像头
                    data.is_gpy = false;
                    ft.closeCamera({});
                } else if (o == 2) {
                    data.is_sxt = false;
                    ft.closeCamera({});
                } else if (o == 3) {
                    data.name = null;
                    data.sex = null;
                    data.birthday = null;
                    data.address = null;
                    data.number = null;
                    data.people = null;
                    data.signOffice = null;
                    data.effectivedate = null;
                    data.photo = null;
                    ft.closeCard({});
                } else if (o == 4) {
                    data.sign = false;
                    ft.closeSign({});
                } else if (o == 5) {
                    data.fingerPrint = [];
                    ft.closeFingerPrint({});
                } else if (o == 6) {
                    data.is_hzsldl = false;
                    ft.closeCamera({});
                }else if(o == 7){
                	data.rz_card = "";
                    data.rz_face = "";
                    data.card_tip = "采集身份证相片";
                    data.face_tip = "采集现场相片";
                    data.rc_idCard = {};
                    ft.closeCamera({})
                    ft.closeCard({});
                }


                if (time) {
                    clearTimeout(time);
                }

                time = setTimeout(() => {
                    if (n == 1) {
                        GPY();
                    } else if (n == 2) {
                        SXT();
                    } else if (n == 3) {
                        idCard();
                    } else if (n == 4) {
                        sign();
                    } else if (n == 5) {
                        fingerPrint();
                    } else if (n == 6) {
                    	if(data.sldlname == ""){
                    		fc85bcm()
                    	}            
                    }
                }, 2000);
            }
        },
        created: function () {

        }
    });
	
	
	getDevInfo()
    ft.showBorder(false);
    ft.setSize(950, 650);
    ft.setLocation((window.screen.availWidth - 950) / 2, (window.screen.availHeight - 650) / 2)
    setTimeout(function(){
    	sadsd()
    },2000)  
}

window.onbeforeunload = function (event) {
    ft.closeCamera({});
    ft.closeSign({});
    ft.closeCard({});
    ft.closeFingerPrint({});
};

function GPY() {
    ft.openCamera({
        x: 256,
        y: 133,
        width: 600,
        height: 450,
        name: setting.gpy,
//      name: "1",
        isCheckFace: 0,
        cameraParam: {
            x: 150,
            y: 260,
            w: 1571,
            h: 1103,
            width: 2048,
            height: 1536,
            brightness: 0,
            contrast: 30,
            hue: -17,
            saturation: 0,
            sharpness: 108,
            gamma: 200,
            whitebalance: 5020,
        },
        onFace: function (e) {
            data.is_gpy = true;
        },
        success: function (s) {

        },
        fail: function (f) {
            showToast("提醒", "打开高拍仪失败！", "确定", function () {

            });
        }
    });
}

function SXT() {
    ft.openCamera({
        x: 255,
        y: 132,
        width: 600,
        height: 450,
        name: setting.qzsxt,
        isCheckFace: 0,
        success: function (s) {

        },
        onFace: function (e) {
            data.is_sxt = true;
        },
        fail: function (f) {
            showToast("提醒", "打开摄像头失败！", "确定", function () {

            });
        }
    });
}

function fc85bcm(){
	var faceArray = [];
	ft.openCamera({
        x: 255,
        y: 132,
        width: 600,
        height: 450,
        name:setting.hzsxt,
        isCheckFace:true,
        success: function (s) {

        },
        onFace: function (e) {
            data.is_hzsldl = true;
            console.log(e)         
            if (e.data.faceCount != 1) {

            } else {
            	if (faceArray.length == 3) {
            		ft.closeCamera({
		                success: function (e) {
		                	console.log(e)
		                }
		            });   	
            	}
            	ft.shootCamera({
				    success: function (e) {
				        console.log(e.data);
				        faceArray.push(e.data);
		                if (faceArray.length == 3) {						                    
                            // 拿到视频帧图片
                            data.rlsbimg = "data:image/png;base64," + e.data;
                            var dt = new Date();
                            ft.closeCamera({
				                success: function () {
									$.post({
								        url: ftbaseUrl + 'employee_face/face/findWorkerUser',
								        type: "POST",
								        data: {
								        	'image':e.data,
								        	devId:devId
								        },
								        timeout: 10000,
								        success: function (e) {
								        	var mm = new Date().getTime() - dt.getTime();
								        	setTimeout(function () {
			                                    console.log(e)
//			                                    console.log(e.obj.data.workerId)
			                                    if(e.ok == true){
			                                    	ajaxPj({
														Service: "QueueCity.GetUserInfo",
														token: "",
														EmpNo: e.obj.data.workerId
													}, function(e) {
														console.log(e)
														if(e){
															var success = e;
															var bmid = e.DeptID;
															ajaxPj({
																Service:"QueueCity.GetWindowList",
															}, function(e) {
																console.log(e)
																if(e){
																	var arr = e.Windows;
																	for(var i = 0;i<arr.length;i++){
																		if(bmid == arr[i].DeptID){

                                                                            console.log(e)
                                                                            data.sldlgonghao = success.EmpNo;
                                                                            data.sldlname = success.EmpName;
//																				data.sldlhead = "data:image/png;base64," + success.Image;
                                                                            if(success.Image){
                                                                                data.sldlhead = "data:image/png;base64," + success.Image;
                                                                            }else{
                                                                                $.post(ftbaseUrl + "employee_face/face/findByWorkerId",{"workerId":success.EmpNo},function(e){
                                                                                    console.log(e)
                                                                                    if(e.ok == true){
                                                                                        if(e.obj.faceUrl){
                                                                                            data.sldlhead = "data:image/png;base64," + e.obj.faceUrl;
                                                                                        }else{
                                                                                            data.sldlhead = "";
                                                                                        }
                                                                                    }else{
                                                                                        data.sldlhead = "";
                                                                                    }
                                                                                })
                                                                            }
                                                                            return;

																		}
																	}
                                                                    showToast("提示", "该工号跟所在业务窗口不匹配", "确定", function () {
                                                                        data.rlsbimg = "img/opencamera.gif";
                                                                        fc85bcm()
                                                                        hideToast();
                                                                    });
                                                                    return;
																}
															})
														}																					
													}, function(e) {
														showToast("提示", "未知错误，该员工不是政务工作人员", "确定", function () {
																data.rlsbimg = "img/opencamera.gif";
				                                    			fc85bcm()
														       hideToast();
														});
													}, function(e) {
														console.log(e)
													})   
			                                    }else{
			                                    	showToast(titleText = "信息", e.msg, buttonText = "确定", function(){
		                                    			data.rlsbimg = "img/opencamera.gif";
		                                    			fc85bcm()
		                                    		})
//			                                    	if(e.msg == "人脸模糊"){
//			                                    		showToast(titleText = "信息", e.msg, buttonText = "确定", function(){
//			                                    			data.rlsbimg = "img/opencamera.gif";
//			                                    			fc85bcm()
//			                                    		})			                                    		
//			                                    	}else if(e.msg == "未找到匹配人脸"){
//			                                    		showToast(titleText = "信息", "在该设备窗口为匹配对应的工作人员", buttonText = "确定",function(){
//			                                    			data.rlsbimg = "img/opencamera.gif";
//			                                    			fc85bcm()
//			                                    		})
//			                                    	}else{
//			                                    		showToast(titleText = "信息", "人脸模糊", buttonText = "确定", function(){
//			                                    			data.rlsbimg = "img/opencamera.gif";
//			                                    			fc85bcm()
//			                                    		})
//			                                    	}
			                                    }
//					                            return
//			                                    if(e.ok == true){
//			                                    	if(e.msg == "成功"){	
//			                                    		console.log(getTimenow())	
//			                                    		var data = {
//			                                    			userNumber:e.obj.idNumber,
//			                                    		}		                                    		
//			                                    		$.post('http://103.3.152.111:84/lc_login/loginByPhotoId',data,function(data){
//			                                    			console.log(data);	
//			                                    			if(data.code == 200){
//			                                    				localStorage.userinfo = JSON.stringify(data.data);
//				                                    			window.history.go(-1);
//			                                    			}else{
//			                                    				that.loginkind = 1;
//				                                    			errsoletishi(data.msg);
//			                                    			}
//			                                    		})				                                   			                                    	
//				                                    }else if(e.msg == "人脸模糊"){
////								                                    	window.location.reload();
//				                                    	errsoletishi(e.msg);
//				                                    	that.renlianshibie();
//														that.bola = 0;
//														that.itmessss()
//				                                    }else if(e.msg == "没有找到用户"){
//				                                    	that.loginkind = 1;
//				                                    	errsoletishi("暂没有检测你当前的上传的脸部照片，请转到账号密码登录");						                                 	
//				                                    }else{
////								                                    	window.location.reload();
//				                                    	errsoletishi(e.msg);
//				                                    	that.renlianshibie();
//														that.bola = 0;
//														that.itmessss()
//				                                    }
//			                                    }else{
//			                                    	errsoletishi(e.msg);	
//			                                    	that.renlianshibie();
//													that.bola = 0;
//													that.itmessss()
//			                                    }
			                                }, mm);									        	
								        }				                       
		                            });	
                           		}
				            }); 
		               }
				    },
				    fail: function (e) {
				        console.log(e);
				    }
				});				                
            }
        },
        fail: function (f) {
            showToast("提醒", "打开摄像头失败！", "确定", function () {

            });
        }
    }) 
}

function idCard() {
    data.name = null;
    data.sex = null;
    data.birthday = null;
    data.address = null;
    data.number = null;
    data.people = null;
    data.signOffice = null;
    data.effectivedate = null;
    data.photo = null;

    ft.initCard({
        onCard: function (e) {
            if (e.data) {

                data.name = e.data.name;
                data.sex = e.data.sex;
                data.birthday = e.data.birthday;
                data.address = e.data.address;
                data.number = e.data.number;
                data.people = e.data.people;
                data.signOffice = e.data.signOffice;
                data.effectivedate = e.data.validtermOfStart + " - " + e.data.validtermOfEnd;
                data.photo = "data:image/png;base64," + e.data.photo;

                ft.closeCard({});
            }
        },
        success: function (e) {
        },
        fail: function (e) {
            showToast("提醒", "身份证初始化失败", "确定", function () {

            });
        }
    });
}

function sign() {
    ft.initSign({
        x: 318,
        y: 195,
        width: 480,
        height: 300,
        success: function (e) {
            data.sign = true;
        },
        save: function (e) {
            saveSign(e);
        },
        fail: function (e) {
            showToast("提醒", e.message, "确定", function () {

            });
        }
    });
}

function saveSign(e) {
    ft.selectPath({
        filter: "*.png",
        success: function (ss) {
            ft.writeBase64(ss.data, e.data);
        },
        fail: function (f) {
            showToast("提醒", "保存失败！", "确定", function () {

            });
        }
    });
}

function fingerPrint() {
    ft.openFingerPrint({
        onImage: function (e) {
            if (data.fingerPrint.length >= 3) return;

            data.fingerPrint.push({
                pfBase64: "data:image/png;base64," + e.data.pfBase64
            })
        },
        success: function (e) {
        },
        fail: function (e) {
            showToast("提醒", "指纹仪打开失败：" + e.message, "确定", function () {

            });
        }
    });
}

function showToast(titleText = "信息", messageText, buttonText = "确定", okFunc) {
    if ($(".toast").length == 0) {
        $("body").append('<div class="modelFream"></div><div class="toast"><div class="toastTitle">信息</div><div class="toastMessage">居中显示居中显示</div><div class="toastButton"><div class="button">确定</div></div></div>');

        if (titleText) {
            $(".toastTitle").text(titleText);
        }
        $(".toastMessage").text(messageText);

        if (buttonText) {
            $(".toastButton div").text(buttonText);
        }

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

function getDevInfo() {
	ajax("/face/getDevInfo", {

	}, function(success) {
		console.log("获取到设备信息：" + JSON.stringify(success));

		setting = JSON.parse(success.setting);
		//console.log(setting)
		//socketConnection();
	}, function(fail) {
		console.log("获取设备信息失败" + JSON.stringify(fail));
	}, function(error) {
		console.log("获取设备信息网络中断");
	})
}

function sadsd(){
	$.post({
        url: ftbaseUrl + 'employee_face/face/login',
        type: "POST",
        data: {
        	devId:devId
        },
        timeout: 10000,
        success: function (eqq) {
        	console.log(eqq)
        	if(eqq.ok){
        		ajaxPj({
					Service:"QueueCity.GetUserInfo",
					EmpNo:eqq.obj.data.workerId,
				}, function(e){
					console.log(e)
					data.sldlgonghao = e.EmpNo;
					data.sldlname = e.EmpName;
					data.sldlhead = "data:image/png;base64," + e.Image;
					if(e.Image){
						data.sldlhead = "data:image/png;base64," + e.Image;
					}else{
						$.post(ftbaseUrl + "employee_face/face/findByWorkerId",{"workerId":e.EmpNo},function(e){
							console.log(e)
							if(e.ok == true){
								if(e.obj.faceUrl){
									data.sldlhead = "data:image/png;base64," + e.obj.faceUrl;
								}else{
									data.sldlhead = "";
								}																
							}else{
								data.sldlhead = "";
							}
						})
					}
					if(eqq.obj.type == 1){
						data.aslieveorback = 1;
					}else{
						data.aslieveorback = 2;
					}				
				}, function(e){
					console.log(e)
				}, function(e){
					console.log(e)
				})
        	}        	
        },
    })    
}
