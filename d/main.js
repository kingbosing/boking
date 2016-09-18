
/**
 * Created by Administrator on 2016/8/22 0022.
 */
(function () {
    var aDiv=document.querySelector('.a');
    var bDiv=document.querySelector('.b');
    
    function createMenu(x,y) {
        var menu=document.createElement('div');
        menu.className='menu';
       x.appendChild(menu);

        var menu_ul=document.createElement('ul');
        menu.appendChild(menu_ul);
        menu_ul.style.listStyle='none';
        var menu_li=document.createElement('li');
        menu_ul.appendChild(menu_li);
        var a=document.createElement('a');
        menu_li.appendChild(a);
        a.innerHTML=y;
        menu.style.display = "none";

    x.addEventListener('contextmenu',function (event) {
        event.preventDefault();
        menu.style.display = "block";
        var ox=event.pageX;
        var oy=event.pageY;
        console.log(ox,oy);

        menu.style.left = ox + "px";
        menu.style.top = oy + "px";
        

    });

        document.addEventListener('click',function () {
            menu.style.display = "none";

        });




    }



    createMenu(aDiv,'打开');
    createMenu(bDiv,'open');



})();