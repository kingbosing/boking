/**
 * Created by Administrator on 2016/9/13 0013.
 */
(function () {
    var canvas=document.getElementById('canvas');
    var button=document.getElementById('button');
    var button1=document.getElementById('button1');

    var king=canvas.getContext('2d');


    king.beginPath();
    
    canvas.addEventListener('mousedown',function (e) {
        var x1=e.pageX;
        var y1=e.pageY;
        king.beginPath();
        king.moveTo(x1,y1);

        canvas.onmousemove=function (e) {
            var x=e.pageX;
            var y=e.pageY;
            king.lineTo(x,y);
            king.strokeStyle='green';
            king.stroke();
        };
        king.closePath();
    });

    canvas.addEventListener('mouseup',function () {
        canvas.onmousemove=' ';
    });

    var storage=localStorage;
    
   button.addEventListener('click',function () {
       var imgStorage = canvas.toDataURL();
       storage.setItem("data",imgStorage);
   });

    button1.addEventListener('click',function () {
        storage.setItem("data",'');
        king.clearRect(0,0,800,500);
    });


    window.onload=function () {
        var img = new Image();
        img.src = storage.getItem("data");
        img.onload=function () {
            king.drawImage(img, 0, 0);
        }
    }
   









    

})();