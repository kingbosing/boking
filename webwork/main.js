/**
 * Created by Administrator on 2016/10/12 0012.
 */
(function () {
    var button0=document.getElementById('button0');

    button0.onclick=function () {
        var worker=new Worker('work.js');
        
        worker.postMessage('start')
    }



})();