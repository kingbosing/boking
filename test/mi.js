

/*
 *   让内容定按时间  一步一步出现 
 * 		id:内容的ID
 * 		time:间隔时间
 */
function typewriter(id,time){
	
  var ele = document.getElementById(id);
  var str = ele.innerHTML, progress = 0;
  ele.innerHTML = '';
  var timer = setInterval(function() {
    var current = str.substr(progress, 1);
    if (current == '<') {
      progress = str.indexOf('>', progress) + 1;
    } else {
      progress++;
    }
    ele.innerHTML =str.substring(0, progress) + (progress & 1 ? '_' : '');
    if (progress >= str.length) {
      clearInterval(timer);
    }
  }, time);
}

 		/*
    *   文件大小转换
    * 	
    * 
    */
    function returnFileSize(size) {
        var Fsize;
        var sizeNum = size / 1024;
        if (sizeNum == 0) {
            Fsize = "-";
        } else if (sizeNum > 0 && sizeNum < 999.9) {
            Fsize = (sizeNum).toFixed(1) + "KB";
        } else if (sizeNum > 999.999 && sizeNum < 1048576) {
            Fsize = ((sizeNum) / 1024).toFixed(1) + "MB";
        } else {
            Fsize = ((sizeNum) / 1048576).toFixed(1) + "GB";
        }
        return Fsize;
    }
    
 		/*
    *  数字小数点保留
    *  fomatFloat(原数字,保留小数点位数)
     */
    function fomatFloat(src,pos){
        return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
    }
    
 		/*
     *  时间转换3（分钟-）
     *  输入（time）：183分-->输出：**分钟or**小时 or **天 。。。。
     */
    function getTime(time) {
        time=time.split('分')[0];
        var Time='';
        if(time<60){
            Time=time+'分钟'
        }else if(time<1440){

            Time=fomatFloat( (time/60), 1) +'小时';

        }else if(time<525600){
            Time=fomatFloat( (time/(60*24)), 1) +'天';
        }else{
            Time=fomatFloat(time/(60*24*365), 1) +'年';
        }
        return Time
    }
    
 /*
     * 时间转换2
     * "/Date(1492572246000)/"-->2017-04-19 11:24:06
     */
    function TimeTransform(inTime) {
        var Time=parseInt(inTime.split('(')[1].split(')')[0]);
        if((new Date(Time)).getHours()<10){
            var hours='0'+(new Date(Time)).getHours();
        }else{
            hours=(new Date(Time)).getHours();
        }
        if((new Date(Time)).getMinutes()<10){
            var minutes='0'+(new Date(Time)).getMinutes();
        } else{
            minutes=(new Date(Time)).getMinutes();
        }
        if((new Date(Time)).getSeconds()<10){
            var seconds='0'+(new Date(Time)).getSeconds();
        } else{
            seconds=(new Date(Time)).getSeconds();
        }
        var theMonth=parseInt((new Date(Time)).getMonth())+1;
        var theDate=(new Date(Time)).getDate();
        if(theMonth<10){
            theMonth='0'+theMonth
        }
        if(theDate<10){
            theDate='0'+theDate;
        }
        var FTime=(new Date(Time)).getFullYear()+'-'+theMonth+'-'+theDate+' '+
            hours+':'+minutes+':'+seconds;

        return FTime;
    }


 		/*
     *  获取url传的值
     */
    function GetRequest() {

        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        applyRequestId=theRequest.id;

    }
