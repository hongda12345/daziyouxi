/*
* @Author: 宏达
* @Date:   2017-09-28 15:12:52
* @Last Modified by:   宏达
* @Last Modified time: 2017-10-04 22:15:15
*/
function Game(){
	this.charArr=[
    ['A','img/A.png'],
    ['B','img/B.png'],
    ['C','img/C.png'],
    ['D','img/D.png'],
    ['E','img/E.png'],
    ['F','img/F.png'],
    ['G','img/G.png'],
    ['H','img/H.png'],
    ['I','img/I.png'],
    ['J','img/J.png'],
    ['K','img/K.png'],
    ['L','img/L.png'],
    ['M','img/M.png'],
    ['N','img/N.png'],
    ['O','img/O.png'],
    ['P','img/P.png'],
    ['Q','img/Q.png'],
    ['R','img/R.png'],
    ['S','img/S.png'],
    ['T','img/T.png'],
    ['U','img/U.png'],
    ['V','img/V.png'],
    ['W','img/W.png'],
    ['X','img/X.png'],
    ['Y','img/Y.png'],
    ['Z','img/Z.png'] 
    ];
	this.current=[];
    this.position=[];
	this.number=5;
	this.speed=10;
	this.score=0;
	this.gk=10;
    this.life=10;
    this.floor=1;
}
Game.prototype={
	start:function(){
		this.getChars();
        this.drop();
	    this.key();
	},
	getChars:function(){
        for(let i=0;i<this.number;i++){
        	this.getChar();
        }
	},
	getChar:function(){
		let num=Math.floor(Math.random()*this.charArr.length);
		let divs=document.createElement('div');
        while(this.checkLetter(this.charArr[num][0])){
            num=Math.floor(Math.random()*this.charArr.length);
        }
        divs.innerText=this.charArr[num][0];
	    divs.classList.add('char');
	    let tops=Math.random()*100;
	    let lefts=(innerWidth-400)*Math.random()+200;
	    while(this.checkPosition(lefts)){
            lefts=(innerWidth-400)*Math.random()+200;
	    };
	    // this.position.push(lefts);
	    divs.style.cssText=`
            top:${tops}px;left:${lefts}px;
            background-image:url(${this.charArr[num][1]});
            background-position:center;
            background-size:cover;
	    `;
	    document.body.appendChild(divs);
	    this.current.push(divs);
        this.position.push(lefts);
	},
    checkLetter:function(char){
        return this.current.some(element=>{
            return element.innerText==char;
        })
    },
	checkPosition:function(lefts){
		let flag=this.position.some(function(value){
			return Math.abs(value-lefts)<60;
		})
		return flag;
	},
    drop:function(){
    	let that=this;
    	this.t=setInterval(function(){
            let score=document.querySelector('.score');
            let gk=document.querySelector('.gk');
            let life=document.querySelector('.life');
    		for(let i=0;i<that.current.length;i++){
    			let tops=that.current[i].offsetTop+that.speed;
    			that.current[i].style.top=`${tops}px`;
    			if(tops>=500){
                    that.life--;
                    life.innerText=that.life;
                    if(that.life<=0){
                        let flag=confirm('很遗憾，您输了！是否重新开始？');
                        if(flag){
                            that.restart();
                        }else{
                            close();
                        }
                    }
    				document.body.removeChild(that.current[i]);
    				that.current.splice(i,1);
    				that.position.splice(i,1);
    				that.getChar();
    			}
    		}
    	}, 300)
    },
    key:function(){
    	let that=this;
    	document.onkeydown=function(e){
            let score=document.querySelector('.score');
            let gk=document.querySelector('.gk');
            let life=document.querySelector('.life');
            console.log(score);
            for(let i=0;i<that.current.length;i++){
            	if(String.fromCharCode(e.keyCode)==that.current[i].innerText){
            		document.body.removeChild(that.current[i]);
    				that.current.splice(i,1);
    				that.position.splice(i,1);
    				that.getChar();
                    that.score+=2;
                    that.life=10;
                    score.innerText=that.score;
    				if(that.score==that.gk){
    					that.next();
    				}
            	}
            }
    	}
    },
    next:function(){
    	clearInterval(this.t);
    	for(let i=0;i<this.current.length;i++){
    		document.body.removeChild(this.current[i]);
    	}
    	this.current.length=0;
    	this.position.length=0;
        let score=document.querySelector('.score');
        let gk=document.querySelector('.gk');
        let life=document.querySelector('.life');
        let floor=document.querySelector('.floor');
    	this.number++;
    	this.gk+=10;
        this.floor++;
        score.innerText=this.score;
        life.innerText=this.life;
        floor.innerText=this.floor;
    	this.start();
    },
    restart:function(){
        clearInterval(this.t);
        for(let i=0;i<this.current.length;i++){
            document.body.removeChild(this.current[i]);
        }
        this.current.splice=0;
        this.position.splice=0;
        let score=document.querySelector('.score');
        let gk=document.querySelector('.gk');
        let life=document.querySelector('.life');
        let floor=document.querySelector('.floor');
        this.number=5;
        this.score=0;
        this.gk=10;
        this.life=10;
        this.speed=10;
        this.floor=1;
        score.innerText=this.score;
        life.innerText=this.life;
        floor.innerText=this.floor;
        this.start();
    }
}