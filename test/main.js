require.config({
　　　　paths: {
　　　　　　"jquery": "jquery.min",
　　　　　　"math": "main-1",
　　　　　　
　　　　}
　　});


require(['math'], function (math){
　　　　alert(math.add(1,1));
　　});

