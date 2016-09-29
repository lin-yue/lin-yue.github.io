/******************************************************************************************************************************
timer.js 地图类

用于处理游戏中时钟的开始，重置和暂停

外部接口：

Timer.prototype.initialize, Timer.prototype.reset, Timer.prototype.start, Timer.prototype.pause

******************************************************************************************************************************/
var TIMEINTERVAL_LEAST = 50;
function Timer(){


	//定义timer类的数据

	this.jsTimer;    //jssetTimeOut返回的值
	this.timeInterval;    //设定的时间间隔
	this.isPaused = false;    //判断时钟是否暂停
	this.temptFunction;    //用于存储循环执行的函数
	this.recycleFunction;    //用于封装循环执行的函数（函数 + setTimeOut)
	this.isInitialized = false;    //用于判断时钟是否被初始化

	if (typeof Timer._initialized == "undefined") {

		//定义timer类的函数

		//定义timer类的接口

 /******************************************************************************************************
    
    Timer.prototype.initialize

    函数功能：用于初始化游戏时钟

    输入：游戏时钟的时间间隔

    输出：无


 ******************************************************************************************************/

		Timer.prototype.initialize = function(timeInterval){


			if(QUITEFLAG === true){
      		return;
      		}

      		if(DEBUGFLAG === true){
      			if(!JudgePositiveInteger(timeInterval)){
      				QUITEFLAG = true;
      				console.log("the timeInterval in Timer.prototype.initialize isn't a positive integer");
      			}
      			else if(timeInterval < TIMEINTERVAL_LEAST){
      				QUITEFLAG = true;
      				console.log("the timeInterval in Timer.prototype.initialize is too small");
      			}
      			if(QUITEFLAG === true){
      			return;
      			}

      		}

			this.jsTimer = setTimeout("", 0);
			this.timeInterval = timeInterval;
			this.isPaused = false;
			this.isInitialized = true;

		}

 /******************************************************************************************************
    
    Timer.prototype.reset

    函数功能：用于重置游戏时钟

    输入：重新设定的游戏时钟的时间间隔

    输出：无（游戏时钟被清除并重新设定）


 ******************************************************************************************************/

		Timer.prototype.reset = function(timeInterval){

			if(QUITEFLAG === true){
      			return;
      		}

			if(DEBUGFLAG === true){
      			if(!JudgePositiveInteger(timeInterval)){
      				QUITEFLAG = true;
      				console.log("the timeInterval in Timer.prototype.rese isn't a positive integer");
      			}
      			else if(timeInterval < TIMEINTERVAL_LEAST){
      				QUITEFLAG = true;
      				console.log("the timeInterval in Timer.prototype.reset is too small");
      			}
      			else if(this.jsTimer === undefined && this.timeInterval === undefined){
      				QUITEFLAG = true;
      				console.log("the timer in Timer.prototype.reset isn't set");
      			}
      			if(QUITEFLAG === true){
      			return;
      			}

      		}
      		if(typeof this.jsTimer !== undefined){
      			clearTimeout(this.jsTimer);
      		}
			this.jsTimer = setTimeout("", 0);
			this.timeInterval = timeInterval;
			this.isPaused = false;

		}


 /******************************************************************************************************
    
    Timer.prototype.start

    函数功能：用于开始游戏时钟计时循环

    输入：用于循环执行的循环函数，循环函数无参数

    输出：无（无限循环执行函数）


 ******************************************************************************************************/

	    Timer.prototype.start = function(cycleFunction){                 

	    	if(QUITEFLAG === true){
      			return;
      		}

      		if(DEBUGFLAG === true){
      			if(this.jsTimer === undefined){
      				QUITEFLAG = true;
      				console.log("the timer in Timer.prototype.start isn't set");
      			}
      			if(QUITEFLAG === true){
      			return;
      			}

      		}
      		var theObject = this;


	    	cycleFunction();    //执行待循环的函数

	    	this.isPaused = false;

	    	this.temptFunction = cycleFunction;    //这部分的代码用于封装timer,使cycleFunction可以无限循环执行下去（写成这样是因为尝试的多种调用settimeout无限循环的方法均无效）
	    	this.recycleFunction = function(){
	    		this.temptFunction();
	    		var theObject = this;
	    		this.jsTimer = setTimeout(function(){theObject.recycleFunction();},theObject.timeInterval);
	    	}

			this.jsTimer = setTimeout(function(){theObject.recycleFunction();},theObject.timeInterval)    //开始循环

		}

 /******************************************************************************************************
    
    Timer.prototype.pause

    函数功能：用于暂停（清除时钟）

    输入：无

    输出：无（时钟被清除）


 ******************************************************************************************************/

		Timer.prototype.pause = function(){

			if(QUITEFLAG === true){
      			return;
      		}

      		if(DEBUGFLAG === true){

      			if(this.jsTimer === undefined){
      				QUITEFLAG = true;
      				console.log("the timer in Timer.prototype.pause isn't set in timer.prototype.pause");
      			}
      			else if(this.isPaused){
      				QUITEFLAG = true;
      				console.log("the timer pause after is paused in timer.prototype.pause");
      			}
      			if(QUITEFLAG === true){
      			return;
      			}
      		}

			clearTimeout(this.jsTimer);
			this.isPaused = true;

		}

		 Timer._initialized = true;
	}
}