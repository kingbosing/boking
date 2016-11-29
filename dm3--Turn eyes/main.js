/**
 * Created by Administrator on 2016/8/9 0009.
 */
(function () {
    var b1=document.getElementById('b1');
    var c1=document.getElementById('c1');

        document.onmousemove=function (event) {
            function eye(x0,y0,to) {
                var x1=event.clientX;
                var y1=event.clientY;
                var x=Math.abs(x1-x0);
                var y=Math.abs(y1-y0);
                var z=Math.sqrt(x*x+y*y);
                var cos = x / z;
                // 弧度
                var n= Math.acos(cos);
                // 角度
                var angle =Math.floor(180 / (Math.PI /n));
                if(x1>x0&&y1<=y0){angle=-angle;}
                if(x1<x0&&y1<=y0){angle=-(180-angle);}
                if(x1<x0&&y1>=y0){angle=(-angle+180);}
                if(x1>x0&&y1>y0){angle=(angle);}
                to.style.transform="rotate("+angle+"deg)";
            };
            eye(100,150,b1);
            eye(470,150,c1);
         };
   


})();