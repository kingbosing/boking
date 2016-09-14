/**
 * Created by Administrator on 2016/9/13 0013.
 */
(function () {
    var canvas=document.getElementById('canvas');
    var king=canvas.getContext('2d');

    king.beginPath();
    king.fillStyle="#FF0000";
    king.arc(200,200,200,0,Math.PI*2,true);
    king.fill();
    king.closePath();

    king.beginPath();
    king.fillStyle="#fff";
    king.arc(200,200,160,0,Math.PI*2,true);
    king.fill();
    king.closePath();

    king.beginPath();
    king.fillStyle="#f00";
    king.arc(200,200,120,0,Math.PI*2,true);
    king.fill();
    king.closePath();

    king.beginPath();
    king.fillStyle="#00f";
    king.arc(200,200,80,0,Math.PI*2,true);
    king.fill();
    king.closePath();

    king.beginPath();
    for(var i=0;i<6;i++){
        var ox=80*Math.cos(i*72*2*Math.PI/180-Math.PI/2)+200;
        var oy=80*Math.sin(i*72*2*Math.PI/180-Math.PI/2)+200;
         king.lineTo(ox,oy);
    }
    king.stroke();
    king.fillStyle='#fff';
    king.fill();
    king.closePath();

    /*
    *
    *
    *
    *
    * */
    king.beginPath();
    king.translate(800,200);
    king.moveTo(0,0);
    king.arc(0,0,100,0,Math.PI*9/6,true);
    king.fill();
    king.closePath();

    king.beginPath();
    king.moveTo(0,0);
    king.fillStyle="#00f";
    king.arc(0,0,100,Math.PI*9/6,Math.PI*5/6,true);
    king.fill();
    king.closePath();

    king.beginPath();
    king.moveTo(0,0);
    king.fillStyle="#FF0000";
    king.arc(0,0,100,Math.PI*5/6,Math.PI*1/2,true);
    king.fill();
    king.closePath();

    king.beginPath();
    king.moveTo(0,0);
    king.fillStyle="#FF0";
    king.arc(0,0,100,Math.PI*1/2,0,true);
    king.fill();
    king.closePath();





})();