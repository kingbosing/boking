/**
 * Created by Administrator on 2016/9/19 0019.
 */
(function () {
    var canvas=document.getElementById('canvas');
    var king=canvas.getContext('2d');

    var j1x=0,j1y=0,j1h=0,j1w=60;
    var j2x=0,j2y=0,j2h=0,j2w=60;
    var j3x=0,j3y=0,j3h=0,j3w=60;

    /*棍子长，x，y*/
    var bar_long=0, bar_x=60, bar_y=330;
    /*小方块 x，y*/
    var play_x=40,play_y=330,score=0;

    /*键盘按下事件*/
    window.addEventListener('keydown',dokeydown,true);
    /*键盘松开*/
    window.addEventListener('keyup',dokeyup,true);
    start();
    function start() {
        // king.clearRect();
        king.fillStyle='#abcdef';
        king.fillRect(0,0,300,500);
        /*第一块跳块*/
        king.fillStyle='#000';
        king.fillRect(j1x,350,j1w,150);
        /*第二块跳块*/
        j2x=Math.floor(Math.random()*150+20)+j1x+j1w;
        j2w=Math.floor(Math.random()*50+20);
        king.fillStyle='#000';
        king.fillRect(j2x,350,j2w,150);
        /*第三块跳块*/
        j3x=Math.floor(Math.random()*150+20)+j2x+j2w;
        j3w=Math.floor(Math.random()*50+20);
        king.fillRect(j3x,350,j3w,150);

        /*小红动块*/
        king.fillStyle='red';
        king.fillRect(play_x,play_y,20,20);
        getScore();
    }

    function dokeydown(e) {
        var keycod=e.keyCode||e.which;
            if(keycod===32){
                king.strokeStyle='#9933cc';
                king.lineWidth=3;
                king.lineTo(bar_x,bar_y);
                king.moveTo(play_x+20,play_y+20);
                bar_y=bar_y-5;
                bar_long=350-bar_y;
                king.stroke();
            }

        else if(keycod===13){
            start();
        }
    }
    function dokeyup(e) {
        var keycod=e.keyCode||e.which;
        if(keycod===32){

            bar_y=350;
            king.beginPath();
            // king.fillStyle='black';
            king.strokeStyle='black';
            king.lineWidth=4;
            king.moveTo(play_x+20,play_y+20);
            king.lineTo(play_x+20+bar_long,bar_y);
            king.stroke();

            // king.save();
            king.beginPath();
            king.strokeStyle='#abcdef';
            // king.fillStyle='#abcdef';
            king.lineWidth=4;
            // king.rotate(90);
            king.moveTo(play_x+20,play_y+20);
            king.lineTo(play_x+20,350-bar_long);


            king.stroke();
            king.closePath();
            // king.restore();

            movePlay()
        }
    }

    function movePlay() {
        king.beginPath();
        king.strokeStyle='#abcdef';
        king.fillStyle='#abcdef';
        king.fillRect(play_x,play_y,20,20);
        king.stroke();

        king.beginPath();
        king.strokeStyle='red';
        king.fillStyle='red';
        play_x=play_x+5;
        king.fillRect(play_x ,play_y,20,20);
        king.stroke();

        if(play_x<=bar_long+j1w-20){
            setTimeout(movePlay,100);
        }else{
            if(j1w+bar_long<(j2x+j2w)&&j1w+bar_long>j2x){
                king.beginPath();
                king.strokeStyle='#abcdef';
                king.fillStyle='#abcdef';
                king.fillRect(play_x,play_y,20,20);
                king.stroke();

                king.beginPath();
                king.strokeStyle='red';
                king.fillStyle='red';
                play_x=j2x+j2w-20;
                king.fillRect(play_x ,play_y,20,20);
                king.stroke();
                score++;
                moveall()
            }else{
                setTimeout(game0ver,200);
                function game0ver() {
                    window.removeEventListener('keyup',dokeyup,true);
                    window.removeEventListener('keydown',dokeydown,true);
                    // dokeyup()=null;
                    king.fillStyle='rgba(100,100,100,0.4)';
                    king.fillRect(0,0,300,500);
                    king.fillStyle='#333';
                    king.font='20px 宋体';
                    king.fillText('最终得分'+ score,110,70);
                    king.fillText('GAME OVER',110,150);
                    king.fillText('F5重新开始',110,180);
                }
            }

        }
    }

    function moveall() {
        king.fillStyle='#abcdef';
        king.fillRect(0,0,300,500);
        king.fillStyle='#000';
        j1x--;
        j2x--;
        j3x--;
        play_x--;
        king.fillRect(j1x,350,j1w,150);
        king.fillRect(j2x,350,j2w,150);
        king.fillRect(j3x,350,j3w,150);

        king.fillStyle='red';
        king.fillRect(play_x,play_y,20,20);
        getScore();
        if(j2x!=0){
            setTimeout(moveall,3)
        }else{
            change()
        }
    }

    /*替换*/
    function change() {
        j1x=j2x;
        j1w=j2w;
        j2x=j3x;
        j2w=j3w;
        j3x=Math.floor(Math.random()*150+20)+j2x+j2w;
        j3w=Math.floor(Math.random()*50+20);
        bar_x=j1w;
    }

    /*分数*/
    function getScore() {
        king.fillStyle='#fff';
        king.font='40px 宋体';
        king.fillText('分数：'+score,80,50)
    }

})();