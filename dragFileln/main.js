/**
 * Created by Administrator on 2016/10/12 0012.
 */
(function () {
    var target = document.querySelector('#target');
    var audio=document.querySelector('#audio');

    target.addEventListener('dragover', function (e) {
        e.preventDefault();
    });
    target.addEventListener('drop', function (e) {
        e.preventDefault();

        var files = e.dataTransfer.files;
        var reader;

        if (files && files.length) {
            var file = files[0];

            switch (file.type) {
                case 'text/plain':
                    reader = new FileReader();
                    reader.onload = function () {
                        target.innerHTML = reader.result;
                    };
                    reader.readAsText(file);
                    break;
                case 'image/jpg':
                    reader = new FileReader();
                    reader.onload = function () {
                        target.innerHTML = "<img src='" + reader.result + "'>";
                    };
                    reader.readAsDataURL(file);
                    break;
                case 'audio/mp3':
                    reader = new FileReader();
                    reader.onload = function () {
                        console.log(file);
                        var div=document.createElement('div');
                        div.innerHTML=file.name;
                        target.appendChild(div);
                        // div.style.background='green';
                        div.onclick=function () {
                            audio.src=reader.result;
                            this.style.background='red'
                        };

                    };
                    reader.readAsDataURL(file);
                    break;
                default:
                    console.log(file);
                    break;
            }
        }
    })


})()