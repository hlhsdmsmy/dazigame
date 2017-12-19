/*
* @Author: 刘伟杰
* @Date:   2017-12-18 17:33:03
* @Last Modified by:   刘伟杰
* @Last Modified time: 2017-12-19 21:02:57
*/
/*属性
	字母表、几个字符、生命、关卡、速度
	方法
	开始、产生、下落、消失、进入下一关、重新开始
	*/
class Code{
	constructor(){
		this.char = [['A','img/A.png'],['B','img/B.png'],['C','img/C.png'],['D','img/D.png'],['E','img/E.png'],['F','img/F.png'],['G','img/G.png'],['H','img/H.png'],['I','img/I.png'],['J','img/J.png'],['K','img/K.png'],['L','img/L.png'],['M','img/M.png'],['N','img/N.png'],['O','img/O.png'],['P','img/P.png'],['Q','img/Q.png'],['R','img/R.png'],['S','img/S.png'],['T','img/T.png'],['U','img/U.png'],['V','img/V.png'],['W','img/W.png'],['X','img/X.png'],['Y','img/Y.png'],['Z','img/Z.png']];
		this.length = 5;
		this.current = [];
		this.position = [];
		this.speed = 10;
		this.scoreObj = document.querySelector('.box>div:first-child>span');
		this.score = 0;
		this.gq = 5; 
		this.life = 10;
		this.lifeObj = document.querySelector('.box>div:last-child>span');
	}
	start(){
		this.getChars(this.length);
		this.drop();
		this.keys();
	}
	getChars(length){
		for(let i=0; i<length; i++){
			this.getChar();
		}
	}	
	checkExist(char){
		return this.current.some(element => element.innerText == char);
	}
	checkPosition(POS){
		return this.position.some(element => Math.abs(element - pos) <= 50);
	}
	getChar(){
		let num = Math.floor(Math.random()*this.char.length);
		do{
			num = Math.floor(Math.random()*this.char.length);
		}while(this.checkExist(this.char[num][0]))
		let divs = document.createElement('div');
		let tops = Math.floor(Math.random()*100);
		let r = Math.floor(Math.random()*255);
		let g = Math.floor(Math.random()*255);
		let b = Math.floor(Math.random()*255);
		let lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		do{
			lefts = Math.floor((window.innerWidth - 400)*Math.random() + 200);
		}while(this.checkPosition(lefts));
		divs.style.cssText=`
		width:50px;height:100px;background:rgb(${r},${g},${b});border-radius:50%;
		text-align:center;line-height:50px;font-size:0;
		position:absolute;top:${tops}px;left:${lefts}px;
		background:url(${this.char[num][1]}) center/cover;
		`;
		divs.innerText = this.char[num][0];
		document.body.appendChild(divs);
		this.current.push(divs);
		this.position.push();
	}
	drop(){
		let that = this;
		that.t = setInterval(function(){
			for(let i =0; i < that.current.length; i++){
				let tops = that.current[i].offsetTop + that.speed;
				that.current[i].style.top = tops + 'px';
				if(tops >= 500){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getChar();
					that.life--;
					that.lifeObj.innerText = that.life;
					if(that.life <= 0){
                        let flag = confirm('是否重新开始');
                        if(flag){
                            that.restart();
                        }else{
                           close();
                        }
                    }

					}
				}
		},500)
	}
	keys(){
		/*this.current[i].innerText*/
		let that = this;
		document.onkeydown = function(e){
			/*e.key  e.keyCode*/
			let code = String.fromCharCode(e.keyCode);
			// let key = e.key.toUpperCase();
			// that.current.forEach((element,index) =>{
			// 	if(element.innerText == key){
			// 		document.body.removeChild(element);
			// 	}
			// })
			for(let i=0; i < that.current.length;i++){
				if(code == that.current[i].innerText){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getChar();
					that.scoreObj.innerText = ++that.score;
					if(that.score >= that.gq){
						that.next();
					}
				}
			}
		}
	}
	next(){
		clearInterval(this.t);
		this.current.forEach(element =>{
			document.body.removeChild(element);
		})
		this.current = [];
		this.position = [];
		/*产生一组*/
		this.length++;
		this.gq += 10;
		this.getChars(this.length);
		this.drop();
	}
	restart(){
		clearInterval(this.t);
		this.current.forEach(element =>{
			document.body.removeChild(element);
		})
		this.current = [];
		this.position = [];
		this.score = 0;
		this.scoreObj.innerText = this.score;
		this.life = 10;
		this.lifeObj.innerText = this.life;
		this.gq =5;
		this.length = 5;
		this.getChars(this.length);
		this.drop();
	}
}