/**
 * Created by Administrator on 2016/9/14 0014.
 */
(function () {
    var canvas=document.getElementById('canvas');
    var king=canvas.getContext('2d');
    
    
    king.beginPath();
    king.moveTo(100,50);
    king.lineTo(100,450);
    king.strokeStyle='ren';
    king.stroke();

    king.moveTo(800,50);
    king.lineTo(800,450);
    king.strokeStyle='ren';
    king.stroke();
    king.closePath();


    for(var i=0;i<=10;i++){
        king.beginPath();
        king.moveTo(100,450-40*i);
        king.lineTo(800,450-40*i);
        king.strokeStyle='ren';
        king.stroke();

        king.save();
        king.beginPath();
        king.fillStyle='green';
        king.font='15px 宋体';
        king.closePath();
        king.fillText(20*i,60,455-40*i);
        king.restore();
    }

    function setTime(j) {
        king.lineWidth='40';
        king.save();
        king.beginPath();

        var speed=0;
        var id=setInterval(function () {
            speed+=5;
            king.save();
            king.moveTo(60*j+120,450);
            king.lineTo(60*j+120,450-speed*2);
            if(speed>=set[j]){
                clearInterval(id);
                setNumber(j);
            }
            king.closePath();
            king.strokeStyle='red';
            king.stroke();
            king.restore();

        },100);

    }



    var set=[60,90,150,130,170,190,125,175,155,165,155,145];

  
    for(var j=0;j<set.length;j++){
        setTime(j);
        
        king.save();
        king.beginPath();
        king.fillStyle='green';
        king.font='15px 宋体';
        king.closePath();
        king.fillText((j+1)+'月',60*j+120,480);
        king.restore();
    }

    function setNumber(j) {
            king.save();
            king.beginPath();
            king.fillStyle = 'green';
            king.font = '15px 宋体';
            king.closePath();
            king.fillText(set[j], 60 * j + 120, 445 - set[j] * 2);
            king.restore();
    }
    
    
    
    
})();