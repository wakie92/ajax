
//Ajax 통신과 관련된 함수집합
var httpRequest = null;

//1.객체생성
function getXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	return null;
}

function sendProcess(method, url, params, callback){
	httpRequest = getXMLHttpRequest();
	httpRequest.onreadystatechange = callback;
	/*--------------------------method-----------------------------------*/
	var httpMethod = method ? method.toUpperCase() : method;
	
	if(httpMethod != 'GET' && httpMethod !='POST'){
		httpMethod = 'GET';
	}
	/*----------------------------params---------------------------------*/
	httpParams = '';
	if(params != null && params != '')
	{
		if(typeof params =='string'){
			httpParams = params;			
		}else {
			for(var key in params){//알고리즘 확인하기! 
				if(httpParams !='')
					httpParams += '&';
				httpParams += key + '=' + params[key];
				
				/*
				 * params[key] : '가나' ==> %AA%BB%CC%DD%FF
				 * encodeURIComponent('가나')
				 * */
			}
		}
	}
	
	/*------------------------url-------------------------------------*/
	httpUrl = url;
	if(httpMethod =='GET' && httpParams != ''){
		httpUrl = url + "?" + httpParams;
	}
	/*--------------------------callback-----------------------------------*/
	httpRequest.open(httpMethod, httpUrl, true);
	if(httpMethod =='POST'){
		httpRequest.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
	}
	httpRequest.send(httpMethod == 'POST' ?  httpParams : null);
}



