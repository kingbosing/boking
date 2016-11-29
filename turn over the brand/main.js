
/**
 * Created by Administrator on 2016/8/17 0017.
 */
(function () {

        function createCard(left,top,a,b) {
            var card=document.createElement('div');
            var card1=document.createElement('div');
            var card2=document.createElement('div');
            var playing=true;

            document.body.appendChild(card);
             card.appendChild(card1);
            card.appendChild(card2);
            card.style.height='200px';
             card.style.width='200px';
            card.style.position='absolute';
            card.style.left=left+'px';
            card.style.top=top+'px';

            card1.style.background='green';
            card1.style.display='block';
            card1.style.height='100%';
            card1.style.width='100%';
            card1.style.margin='0 auto';

            card2.style.display='none';
            card2.style.height='100%';
            card2.style.width='100%';
            card2.style.margin='0 auto';





            // card2.style.background='blue';


            var x=a+'px';var y=b+'px';
            card2.style.background='url(ph.jpg)no-repeat';
            card2.style.backgroundPosition=x+" "+y;





            card1.onclick=function () {
                cardxy(card1,card2);
            };
            card2.onclick=function () {
                cardxy(card2,card1);
            };

            function cardxy(cardx,cardy) {
                var i = 0;
                if (playing) {
                    playing=false;
                    var id = setInterval(function () {
                        i++;
                        var n = 100 - 10 * i;
                        cardx.style.width = n + '%';
                        if (i >= 10) {
                            // clearInterval(id);


                            cardx.style.display = 'none';

                            // var id1= setInterval(function () {
                            //      i++;
                            cardy.style.display = 'block';
                            var n = 10 * i - 100;
                            cardy.style.width = n + '%';
                            if (i >= 20) {
                                clearInterval(id);
                                i = 0;
                                playing=true;
                            }
                            // },50)
                        }
                    }, 50)
                }
                ;
            }
        }
        function init() {
        for(var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                createCard(210*i,210*j,-200*i,-200*j);
                }
            }
        }
    init();



})();