var game={
	data:null,
	RN:4,
	CN:4,
	state:0,
	RUNNING:0,
	GAMEOVER:0,
	score:0,
	
	start:function(){
		this.data=[];
		this.start=this.RUNNING;
		for(var row=0;row<this.RN;row++){
			this.data[row]=[];
			for(var col=0;col<this.CN;col++){
				this.data[row][col]=0;
			}
		}
		this.score=0;
		this.randomNum();
		this.randomNum();
		this.updataView();
//		console.log(this.data);
	},
	
	randomNum:function(){
		if(!this.isFull()){
			while(true){
				var r=parseInt(Math.random()*(this.RN));
				var c=parseInt(Math.random()*(this.CN));
				if(this.data[r][c]==0){
					this.data[r][c]=Math.random()<0.6?2:4;
					break;
				}
			}
		}
	},
	
	isFull:function(){
		for(var row=0;row<this.RN;row++){
			for(var col=0;col<this.CN;col++){
				if(this.data[row][col]==0){
					return false;
				}
			}
		}
	return true;	
	},
	updataView:function(){
		for(var row=0;row<this.RN;row++){
			for(var col=0;col<this.CN;col++){
				var num=document.getElementById("c"+row+col);
				if(this.data[row][col]!=0){
					num.innerHTML=this.data[row][col];
					num.className="cell n"+this.data[row][col];
				}else{
					num.innerHTML='';
					num.className="cell";
				}
			}
		}
		document.getElementById("score").innerHTML=this.score;
		
	},
	
	moveLeftInrow:function(row){
		for(var col=0;col<this.data.length-1;col++){
			var next=getRightNext(row,col);
			if(next==-1){
				break ;
			}else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[row][next];
					this.data[row][next]=0;
					col--;
				}else if(this.data[row][col]==this.data[row][next]){
					this.data[row][col]*=2;
					this.data[row][next]=0;
					this.score+=this.data[row][col];
					
				}
			}
			
		}
		this.updataView();
		
	},
	
	getRightNext:function(row,col){
		for(var next=col+1;next<this.data[row].length;next++){
			if(this.data[row][next]!=0){
				return next;
			}
		}
		return -1;
	}
	
}

  window.onload=function(){
  	game.start();
  	document.onkeydown=function(){
  		if(game.state==game.RUNNING){
  			var e=window.event||arguments[0];
  			if(e.keyCode==37){
  				game.moveLeftInrow(1);
  			}
  		}
  	}
  }




























