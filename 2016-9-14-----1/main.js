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
        // king.clearRect(x, y-10,30, 20);
        king.fillStyle='green';
        king.font='15px 宋体';
        king.closePath();
        king.fillText(20*i,60,455-40*i);
        king.restore();
    }


    
    function setNet() {
        i=0;
        king.beginPath();
        king.moveTo(100,450);
        var id=setInterval(function () {

            console.log(i);
            king.lineTo(60*i+140,450-set[i]*2);
            i++;
            king.strokeStyle='green';
            king.stroke();
            king.restore();

            if(i>=12){
                clearInterval(id);
                setRing()
            }
        },500);
        king.closePath();


    }

    var set=[60,90,150,130,170,190,125,175,155,165,155,145];

    setNet();
    
    function setRing() {
        for(var j=0;j<set.length;j++) {
            king.beginPath();
            king.strokeStyle = "#FF0000";
            king.arc(60 * j + 140, 450 - set[j] * 2, 10, 0, Math.PI * 2, true);
            king.stroke();
            king.closePath();
        }
    }

    
    for(var j=0;j<set.length;j++){

        king.save();
        king.beginPath();
        king.fillStyle='green';
        king.font='15px 宋体';
        king.closePath();
        king.fillText((j+1)+'月',60*j+120,480);
        king.restore();
    }

    
})();