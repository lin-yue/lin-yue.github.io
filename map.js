/******************************************************************************************************************************
map.js 地图类

用于管理游戏的地图，处理地图中初始化，重置，设置细胞状态，获取周围8个细胞中活细胞的个数等操作

外部接口：

Map.prototype.initialize, Map.prototype.reset, Map.prototype.getCellStatus, Map.prototype.setCellStatus, Map.prototype.getLiveNeighborCount,
Map.prototype.copyMap

******************************************************************************************************************************/

var CELL_LIVE = 1
var CELL_DEAD = 0

var MAP_MAXLINES = 1000
var MAP_LEASTLINES = 20
var MAP_MAXROWS = 1000
var MAP_LEASTROWS = 20

function Map() {    //采用动态原型的方法定义map类

  //定义map类的数据

  this.lines = 0;    //地图行数
  this.rows = 0;    //地图列数
  this.cells = null;    //地图中的细胞数组（二维）
  this.isInitialized = false;    //用于判断是否被初始化（全部置为dead）
  this.isRandomlized = false;    //用于判断是否状态被随机重置

  if (typeof Map._initialized == "undefined") { 

    //定义map类的函数

    //定义map类的接口

 /******************************************************************************************************
    
    Map.prototype.initialize

    函数功能：用于初始化地图和地图中各细胞的状态

    输入：行数lines,列数rows

    输出：无


 ******************************************************************************************************/

    Map.prototype.initialize = function(lines, rows){

      if(QUITEFLAG === true){
      	return;
      }


      if(DEBUGFLAG === true){
      	if(!JudgePositiveInteger(lines)){
      		QUITEFLAG = true;
      		console.log("the lines in Map.prototype.initialize isn't a positive integer");
      	}
      	if(lines < MAP_LEASTLINES || lines > MAP_MAXLINES){
      		QUITEFLAG = true;
      		console.log("the lines in Map.prototype.initialize is too big or too small");
      	}
      	if(!JudgePositiveInteger(rows)){
      		QUITEFLAG = true;
      		console.log("the rows in Map.prototype.initialize isn't a positive integer");
      	}
      	if(rows < MAP_LEASTROWS || rows > MAP_MAXROWS){
      		QUITEFLAG = true;
      		console.log("the rows in Map.prototype.initialize is too big or too small");
      	}
      	if(QUITEFLAG === true){
      		return;
      	}
      }


      this.lines = lines;
      this.rows = rows;
      this.cells = new Array();
      for(var i = 0; i < lines; i++){
      	this.cells[i] = new Array()
      	for(var k = 0; k < rows; k++){
  		      this.cells[i][k] = CELL_DEAD;
  	    }
      }
      this.isInitialized = true;

    };

 /******************************************************************************************************
    
    Map.prototype.reset

    函数功能：用于重新设置地图的函数，列数和地图中各细胞的状态（设为dead)

    输入：行数lines,列数rows

    输出：无


 ******************************************************************************************************/

    Map.prototype.reset = function(lines, rows){

      if(QUITEFLAG === true){     	
      	return;
      }


      if(DEBUGFLAG === true){
      	if(!JudgePositiveInteger(lines)){
      		QUITEFLAG = true;
      		console.log("the lines in Map.prototype.reset isn't a positive integer");
      	}
      	if(lines < MAP_LEASTLINES || lines > MAP_MAXLINES){
      		QUITEFLAG = true;
      		console.log("the lines in Map.prototype.reset is too big or too small");
      	}
      	if(!JudgePositiveInteger(rows)){
      		QUITEFLAG = true;
      		console.log("the rows in Map.prototype.reset isn't a positive integer");
      	}
      	if(rows < MAP_LEASTROWS || rows > MAP_MAXROWS){
      		QUITEFLAG = true;
      		console.log("the rows in Map.prototype.reset is too big or too small");
      	}
      	if(this.cells === null){
      		QUITEFLAG = true;
      		console.log("the cells in Map.prototype.reset is not initialized");
      	}
      	if(QUITEFLAG === true){
      		return;
      	}
      }

      this.lines = lines;
      this.rows = rows;
      this.cells = new Array();
      for(var i = 0; i < lines; i++){
      	this.cells[i] = new Array()
      	for(var k = 0; k < rows; k++){
  		this.cells[i][k] = CELL_DEAD;
  	    }
      }
      this.isRandomlized = false;
    }

 /******************************************************************************************************
    
    Map.prototype.getCellStatus

    函数功能：用于获取地图中某个细胞的状态

    输入：待获取细胞的行数line,待获取细胞的列数row(行数，列数为现实中的行数和列数，不需要减1)

    输出：细胞的状态（CELL_DEAD or CELL_LIVE)


 ******************************************************************************************************/
    Map.prototype.getCellStatus = function(line, row){

      if(QUITEFLAG === true){     	
      	return;
      }


      if(DEBUGFLAG === true){
      	if(this.cells === null){
      		QUITEFLAG = true;
      		console.log("the cells in Map.prototype.getCellStatus is not initialized");
      	}
      	if(QUITEFLAG === true){
      		return;
      	}
      }

      return this.cells[line - 1][row - 1];

       
    }

 /******************************************************************************************************
    
    Map.prototype.setCellStatus

    函数功能：用于设置地图中某个细胞的状态

    输入：待获取细胞的行数line,待获取细胞的列数row(行数，列数为现实中的行数和列数，不需要减1)，细胞的状态（CELL_LIVE和CELL_DEAD）

    输出：无


 ******************************************************************************************************/

    Map.prototype.setCellStatus = function(line, row, status){

      if(QUITEFLAG === true){     	
      	return;
      }


      if(DEBUGFLAG === true){
      	if(this.cells === null){
      		QUITEFLAG = true;
      		console.log("the cells in Map.prototype.setCellStatus is not initialized");
      	}
      	if(QUITEFLAG === true){
      		return;
      	}
      }

      this.cells[line - 1][row - 1] = status;

    }

 /******************************************************************************************************
    
    Map.prototype.getLiveNeighborCount

    函数功能：用于获取地图中行号为line，列号为row（真实）的细胞的邻近9个细胞（网状结构，如左上角细胞左上为最右下细
    胞，右下角细胞右下为最左上细胞中存活的细胞的个数

    输入：待获取细胞的行数line,待获取细胞的列数row(真实)

    输出：存活的细胞的个数


 ******************************************************************************************************/

    Map.prototype.getLiveNeighborCount = function(line, row){

      if(QUITEFLAG === true){     	
      	return;
      }


      if(DEBUGFLAG === true){
      	if(this.cells === null){
      		QUITEFLAG = true;
      		console.log("the cells in Map.prototype.getLiveNeighborCount is not initialized");
      	}
      	if(QUITEFLAG === true){
      		return;
      	}
      }

      var count = 0; //计算活细胞个数

      //line - 1, row - 1为内存中的行列号，  % (this.lines - 1)，% (this.rows - 1)用于计算网格状地图一个细胞周围细胞，line - 1 - 1, line -1 +　1等代表该细胞左侧，右侧细胞
      
      count = this.cells[(line - 1 - 1 + this.lines) % this.lines][(row - 1 - 1 + this.rows) % this.rows] + this.cells[(line - 1 - 1 + this.lines) % this.lines][(row - 1) % this.rows] + this.cells[(line - 1 - 1 + this.lines) % this.lines][(row - 1 + 1) % this.rows];    //该细胞左侧三个细胞的状态
      count += this.cells[(line - 1 + 1) % this.lines][(row - 1 - 1 + this.rows) % this.rows] + this.cells[(line - 1 + 1) % this.lines][(row - 1) % this.rows] + this.cells[(line - 1 + 1) % this.lines][(row - 1 + 1) % this.rows];    //该细胞右侧三个细胞的状态
      count += this.cells[(line - 1) % this.lines][(row - 1 - 1 + this.rows) % this.rows];    //该细胞正上方一个细胞的状态
      count += this.cells[(line - 1) % this.lines][(row - 1 + 1) % this.rows];    //该细胞正下方一个细胞的状态
      return count;
       


    }

 /******************************************************************************************************
    
    Map.prototype.copyMap

    函数功能：用于从MapTempt(暂存地图）拷贝游戏的地图

    输入：暂存的地图

    输出：细胞的状态（CELL_DEAD or CELL_LIVE)


 ******************************************************************************************************/
   Map.prototype.copyMap = function(mapTempt){

     if(QUITEFLAG === true){     	
      	return;
     }


     if(DEBUGFLAG === true){
      	if(typeof mapTempt !== "object" || mapTempt === undefined){
      		QUITEFLAG = true;
      		console.log("the mapTempt in copyMap is not an object in Map.prototype.copyMap");
      	}
      	else if(this.cells === null || this.cells === undefined)
      	{
      		QUITEFLAG = true;
      		console.log("the map is undefined or not initialized before copy in Map.prototype.copyMap");
      	}

      	else if(mapTempt.lines !== this.lines || mapTempt.rows !== this.rows){
      		QUITEFLAG = true;
      		console.log("the mapTempt is not a tempt map of the realMap in Map.prototype.copyMap");
      	}      
      	if(QUITEFLAG === true){
      		return;
      	}
     }

   	for(var i = 0; i < mapTempt.lines; i ++){
   		for(var j = 0; j < mapTempt.rows; j++){
   			this.cells[i][j] = mapTempt.cells[i][j];
   		}
   	}
   }

    Map._initialized = true;
  }
}