/**
	jquery ajax方法封装
	参数含义：caller 代表入参；trcode 代表接口名；callback 代表回调函数
*/

var istank = false,
	ajaxcall = new Array();
function ajax(caller,trcode,callback,ajaxcallac){
	typeOf(caller) == "object" ? JSON.stringify(caller) : caller
	var url = "http://221.12.41.21:8085";
	if(!ajaxcallac){
		ajaxcallac=trcode
	}
	if(ajaxcall[ajaxcallac]){
		ajaxcall[ajaxcallac].abort();
	}
	var tempajax = $.ajax({
		type: "POST",
		url: url+"/nb_opm/interf/frontEnd/"+trcode,
		data: caller,
		dataType: "json",
		contentType:'text/plain',
		success: function(data){
			if(data.result === "999996" && istank == false){
				console.log("账号在另外一台设备登录")
			}else if(data.result === "100000"){
				console.log("跳转到登录页");
			}else{
				eval('callback(data)');
			}
		}
	});
	ajaxcall[ajaxcallac]=tempajax;
}



/**
	页面参数获取:
	strName参数为？之后的参数名,
	例如：/index.html?i=1234&b=adadadsa 如果要取i的值：GetArgsFromHref("i"),要取b的值：GetArgsFromHref("b")
*/

function GetArgsFromHref(strName){   
    var strHref = window.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos+1);
    var arrTmp = strRight.split("&");
    for(var i = 0; i < arrTmp.length; i++){
    	var arrTemp = arrTmp[i].split("=");
    	if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}
