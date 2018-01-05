$(function(){
	//获取控件对象
    function getUnionControl() {
        return document.getElementById('UnionControl');
    }

    //判断控件是否安装
    checkInstall();
    function checkInstall() {
        var version;
        try {
            version = document.getElementById('UnionControl').UnionGetVersion();
        } catch (e) {

        }
        if (typeof(version) !== "undefined") {//已安装
            $("#pass").removeAttr("disabled");
            $(".install-control").hide();
        } else {//未安装
            $(".install-control").show();
            $("#pass").attr("disabled","disabled");
        }
    }


	$("#btn").on("click",function(){
		var keymy = '123456';  //密钥
		var username = $("#user").val(),  //获取用户名
			password = $("#pass").val(),  //获取密码
			pass = getUnionControl().UnionRSAEnvelope(password, keymy, ''),//针对密码控件加密
			/**
				数字签名：
				var content = sign内容为入参的value值连起来后面在加上密钥
				对content字符串数据进行MD5加密然后取32位大写值,再对以上32位MD5的大写值做SHA1加密，最后将40位SHA1大写值作为sign
			*/
			sign = hex_sha1(md5(""+username+password+keymy+"").substr(0,32).toUpperCase()).substr(0,40).toUpperCase();  
		var userN = DES3.encrypt(keymy,username);  //3des加密
		console.log(username+password+keymy);
		console.log(password)
		var caller = new Object();
		caller.sign = sign;
		caller.key = "user,pass"; //key，公共参数
		caller.user = userN;
		caller.pass = pass;

		ajax(caller,'N002',function(data){
			console.log(data);
			/*最终调用N002接口的处理步骤*/


			/**
				假如此时登录成功了，获取了sessionid。
				保存方式有三种：
				一、保存到cookie当中，cookie 浏览器可以禁掉的。代码示例：
				存储设置：c_name（名称）value（值）expiredays（过期天数）
				function setCookie(c_name,value,expiredays){
					var exdate=new Date()
					exdate.setDate(exdate.getDate()+expiredays)
					document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
				}
				获取cookie值：name(名称)
				function getCookie(name){
					var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
					if(arr=document.cookie.match(reg))
						return unescape(arr[2]);
					else
					return null;
				}
				删除cookie: name(名称)
				function delCookie(name){
				    var exp = new Date();
				    exp.setTime(exp.getTime() - 1);
				    var cval=getCookie(name);
				    if(cval!=null)
				        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
				}
				清除cookie: name(名称)
				function clearCookie(name) {  
				    setCookie(name, "", -1);  
				} 
								
				二、保存到localStorage当中，特点是不销毁，一直在，适用于移动端好点，pc端看用户如果勾选了记住密码可以采用这个
				存储：localStorage.setItem("key", "value");
				获取：localStorage.getItem("key");
				删除：localStorage.removeItem("key");
				清除：localStorage.clear();
				三、保存到sessionStorage当中，特点是快销毁，每次关闭浏览器就清除了。
				存储：sessionStorage.setItem("key", "value");
				获取：sessionStorage.getItem("key");
				删除：sessionStorage.removeItem("key");
				清除：sessionStorage.clear();
			*/

		});
	});





});

