/******************************************************************************************************************************
gameController.js 游戏控制类

用于处理生命游戏中的逻辑部分，和全局游戏的调用接口

外部接口：

全局游戏调用：

GameController.prototype.initialize, GameController.prototype.start, GameController.prototype.pause, GameController.prototype.reset,
GameController.prototype.setDebugFlag

游戏逻辑内部接口：

GameController.prototype.updateAllCellsState, GameController.prototype.createRandomInitialCells

******************************************************************************************************************************/



function GameController(){

	//定义GameController类的数据

	this.gameMap = null;    //游戏地图
	this.gameTimer = null;    //游戏时钟
	this.gameMapTempt = null; //游戏下一时刻地图
	this.gameUI = null;    //游戏UI的js代码
	this.isInitialized = false;    //游戏是否被初始化


	if (typeof GameController._initialized == "undefined") {

		//定义GameController类的函数

		//定义GameController类的游戏调用接口

 /******************************************************************************************************
    
    GameController.prototype.initialize

    函数功能：对整个游戏全局进行初始化
    输入：生命游戏地图的行数lines,列数rows和游戏每次迭代的时间间隔timeInterval
          lines应大于等于MAP_LEASTLINES，小于等于 MAP_MAXLINES
          rows应大于等于MAP_LEASTROWS，小于等于 MAP_MAXROWS
          timeInterval应大于等于IMEINTERVAL_LEAST
    输出：无


 ******************************************************************************************************/

		GameController.prototype.initialize = function(lines,rows,timeInterval){

			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}

			this.gameMap = new Map();
			this.gameMapTempt = new Map();
			this.gameTimer = new Timer();
			this.gameUI = new UI();
			this.gameMap.initialize(lines, rows);
			this.createRandomInitialCells();
			this.gameMapTempt.initialize(lines, rows);
			this.gameTimer.initialize(timeInterval);
			this.gameUI.showInitialGame(this.gameMap,this);
			this.isInitialized = true;  

			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}


		}

 /******************************************************************************************************
    
   GameController.prototype.reset

    函数功能：对整个游戏全局进行重新设置
    输入：重新设置的生命游戏地图的行数lines,列数rows和游戏每次迭代的时间间隔timeInterval
          lines应大于等于MAP_LEASTLINES，小于等于 MAP_MAXLINES
          rows应大于等于MAP_LEASTROWS，小于等于 MAP_MAXROWS
          timeInterval应大于等于IMEINTERVAL_LEAST
    输出：无


 ******************************************************************************************************/

		GameController.prototype.reset = function(lines,rows,timeInterval){

			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}
			if(DEBUGFLAG){
				if(!this.isInitialized){
					console.log("it is not initialized in GameController.prototype.reset")
					QUITEFLAG = true;
				}
				if(QUITEFLAG){
					if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
					}
					return;
				}
			}
			this.gameTimer.reset(timeInterval);
			this.gameMap.reset(lines, rows);
			this.createRandomInitialCells();
			this.gameMapTempt.reset(lines, rows);
			this.gameUI.reset(this.gameMap);
			this.gameUI.showStart(); 

			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}



		}

 /******************************************************************************************************
    
   GameController.prototype.start

    函数功能：开始游戏或继续游戏，进行游戏循环
    输入：无（内部循环运行GameController.prototype.gameCycle函数
    输出：无


 ******************************************************************************************************/

		GameController.prototype.start = function(){

			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}

			if(DEBUGFLAG){
				if(!this.isInitialized){
					console.log("it is not initialized in GameController.prototype.start")
					QUITEFLAG = true;
				}
				if(QUITEFLAG){
					if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
					}
					return;
				}
			}

			this.gameUI.showContinue();

			var theController = this;    //设置theController变量避免timer调用时this指针的问题
			this.gameTimer.start(function(){    //开始循环
				theController.gameCycle();
			})

			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}
		}


 /******************************************************************************************************
    
   GameController.prototype.Pause

    函数功能：游戏暂停
    输入：无
    输出：无（暂停游戏）


 ******************************************************************************************************/

		GameController.prototype.pause = function(){
			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}

			if(DEBUGFLAG){
				if(!this.isInitialized){
					console.log("it is not initialized in GameController.prototype.pause")
					QUITEFLAG = true;
				}
				if(QUITEFLAG){
					if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
					}
					return;
				}
			}

			this.gameTimer.pause();
			this.gameUI.showPause();
			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}
		}


 /******************************************************************************************************
    
    GameController.prototype.setDebugFlag

    函数功能：用于设置程序是否进行调试
    输入：布尔变量，true or false
    输出：无


 ******************************************************************************************************/

		GameController.prototype.setDebugFlag = function(flag){

			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}			
			if(typeof flag !== "boolean"){
				QUITEFLAG = true;
      			console.log("the debugFlat should be boolean in GameController.prototype.setDebugFlag");
			}
			if(QUITEFLAG){
				if(this.gameUI !== null && this.gameUI !== undefined){
					this.gameUI.showQuitToClient();
				}
				return;
			}
			DEBUGFLAG = flag;


		}

		//定义GameController类的内部调用接口


 /******************************************************************************************************
    
    GameController.prototype.updateAllCellsState

    函数功能：用于更新整个地图中所有的细胞
    输入：无（内部地图变量提供）
    输出：无（变更内部所有细胞的生存状态）


 ******************************************************************************************************/

		GameController.prototype.updateAllCellsState = function(){

			var newCellState;
			if(QUITEFLAG){
				return;
			}
			if(DEBUGFLAG){
				if(typeof this.gameMapTempt !== "object"){
      				QUITEFLAG = true;
      				console.log("the gameMapTempt is not initialized in GameController.prototype.updateAllCellsState");
      			}
      			else if(typeof this.gameMap !== "object"){
      				QUITEFLAG = true;
      				console.log("the gameMap is not initialized in GameController.prototype.updateAllCellsState");
      			}
      			else if(!this.isInitialized){
      				QUITEFLAG = true;
      				console.log("the gameController is not initialized in GameController.prototype.updateAllCellsState");
      			}
      			if(QUITEFLAG === true){
      				return;
      			}
			}

			for(var i = 0; i < this.gameMap.lines; i++){
				for(var j = 0; j < this.gameMap.rows; j++){
					newCellState = this.returnCellNewStateLogic(i + 1, j + 1);
					this.gameMapTempt.setCellStatus(i + 1, j + 1, newCellState)
				}
			}

			this.gameMap.copyMap(this.gameMapTempt);
		}


/******************************************************************************************************
    
    GameController.prototype.createRandomInitialCells

    函数功能：用于创建开始时每个细胞的随机初始状态（dead or live)

    输入：地图的行数和列数

    输出：无


 ******************************************************************************************************/

		GameController.prototype.createRandomInitialCells = function(){

			if(QUITEFLAG === true){
      			return;
      		}
      		if(DEBUGFLAG === true){
      			if(this.gameMap === null || (typeof this.gameMap !== "object")){
      				QUITEFLAG = true;
      				console.log("the gameMap is not initialized in GameController.prototype.createRandomInitialCells");
      			}
      			else if(this.gameMap.isInitialized === false){
      				QUITEFLAG = true;
      				console.log("the gameMap is not initialized in GameController.prototype.createRandomInitialCells");
      			}
      			if(QUITEFLAG === true){
      				return;
      			}
      		}


			for(var i = 0; i < this.gameMap.lines; i++){
				for(var j = 0; j < this.gameMap.rows; j++){

					if(Math.random() <= 0.5){
						this.gameMap.setCellStatus(i + 1, j + 1, CELL_DEAD);
					}
					else{
						this.gameMap.setCellStatus(i + 1, j + 1, CELL_LIVE);
					}

				}
			}
			this.gameMap.isRandomlized = true;


		}


		//定义GameController类的内部函数


 /******************************************************************************************************
    
    GameController.prototype.returnCellNewStateLogic

    函数功能：用于返回根据游戏逻辑得到的某个细胞下一时刻的生存的函数逻辑

    输入：该细胞在地图中的行数和列数(真实)

    输出：该细胞下一时刻的额生存状态


 ******************************************************************************************************/


		GameController.prototype.returnCellNewStateLogic = function(line, row){

			if(QUITEFLAG === true){
      			return;
      		}
      		if(DEBUGFLAG === true){
      			if(this.gameMap === null){
      				QUITEFLAG = true;
      				console.log("gameMap in GameController.prototype.returnCellNewStateLogic is null before update");
      			}
      			else if(this.gameMap.isInitialized === false || this.gameMap.isRandomlized === false){
      				QUITEFLAG = true;
      				console.log("gameMap in GameController.prototype.returnCellNewStateLogic is not initialized or randomlized before update");
      			}
      			if(QUITEFLAG === true){
      				return;
      			}
      		}

      		var cellState = this.gameMap.getCellStatus(line, row);
      		var liveNeighbourCount = this.gameMap.getLiveNeighborCount(line, row);
      		if(liveNeighbourCount === 3){
      			return CELL_LIVE;
      		}
      		else if(liveNeighbourCount === 2){
      			return cellState;
      		}
      		else{
      			return CELL_DEAD;
      		}

		}

/******************************************************************************************************
    
   GameController.prototype.gameCycle

    函数功能：进行游戏循环，每次更新地图中所有细胞的状态
    输入：无
    输出：无


 ******************************************************************************************************/

		GameController.prototype.gameCycle = function(){
			if(QUITEFLAG){
				return;
			}
			if(DEBUGFLAG){
				if(!this.isInitialized){
					console.log("it is not initialized in GameController.prototype.gameCycle")
					QUITEFLAG = true;
				}
				if(QUITEFLAG){
					return;
				}
			}
			this.updateAllCellsState();
			this.gameUI.showCellsStatus(this.gameMap);
		}




		 GameController._initialized = true;
	}
}


