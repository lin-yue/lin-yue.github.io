/******************************************************************************************************************************
timer.js 地图类

用于展示生命游戏，更新游戏状态，处理游戏中的开始，重置，继续等指令

外部接口：

UI.prototype.showInitialGame, UI.prototype.reset, UI.prototype.showQuitToClient, UI.prototype.showPause, UI.prototype.showContinue,
UI.prototype.showStart, UI.prototype.showCellsStatus

******************************************************************************************************************************/

//以下变量实际在showLiveGame.css中定义
var GAMEWIGETWIDTH = 0.6;    //游戏窗口的可用宽度0.6的屏幕宽度
var GAMEWIGETHEIGHT = 0.70;    //游戏窗口的可用高度0.7的屏幕高度
var TITLEPLACE = 0.15;    //标题高度0.15的屏幕高度
var BORDER = 0.02;       //标题和游戏视窗的最小上下边界
var TOTALABOVEGAME = TITLEPLACE +  BORDER;    //游戏视窗相对屏幕最上方0.17屏幕高度
var TOTALLEFTGAME = 0.2;    //游戏视窗相对屏幕最左侧0.2屏幕宽度

function UI(){

	//定义UI类的数据

    this.clientWidth = window.innerWidth||document.documentElement.clientWidth;    //浏览器宽度
    this.clientHeight = window.innerHeight||document.documentElement.clientHight;    //浏览器高度
    this.cell_length;    //细胞宽度
    this.cell_height;    //细胞高度
    this.theGameController;   //用于存放UI所属的gameController的实例的引用（由于在initialize中需要传递gameController的函数）
    this.isInitialized = false;    //用于判断是否已经初始化



	if (typeof UI._initialized == "undefined") {

		//定义UI类的函数

		//定义UI类的接口

/******************************************************************************************************
    
   UI.prototype.showInitialGame

    函数功能：展示最初的游戏状态，设置消息响应函数
    输入：map.js中定义的Map类对象,gameController.js中定义的GameController对象（在游戏中为UI对象的父对象）
    输出：无（在游戏界面呈现游戏初始状态，并设置消息响应函数）


 ******************************************************************************************************/

        UI.prototype.showInitialGame = function(map,gameController){

            if(QUITEFLAG === true){
                return;
            }

            if(DEBUGFLAG === true){
                if(map === undefined)
                {
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.showInitialGame is not defined");
                }
                else if(gameController === undefined)
                {
                    QUITEFLAG = true;
                    console.log("the gameController in UI.prototype.showInitialGame is not defined");
                }
                else if(!(typeof map === "object") || map.cells === undefined){
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.showInitialGame is not a Map object");
                }
                else if(map.isInitialized === false){
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.showInitialGame is not initialized");
                }
                else if(!(typeof gameController === "object") || gameController.gameMap === undefined){
                    QUITEFLAG = true;
                    console.log("the gameController in UI.prototype.showInitialGame is not a gameController object");
                }
                if(QUITEFLAG === true){
                    return;
                }
            }

            gameWidget = document.getElementById("gameWidget");    //获取html中的游戏窗口
            var temptFragment = document.createDocumentFragment();    //一次在html中添加多个细胞
            var cellTempt = null;
            this.calcLayout(map.lines, map.rows);    //计算设定的行数和列数的细胞在屏幕中的布局
            for(var i = 0; i < map.lines; i ++) 
            {
                for(var j =0; j < map.rows; j++) 
                {
                    cellTempt = document.createElement("div");
                    cellTempt.id = "cell_" + "line" + String(i + 1) + "row" + String(j + 1);    //为每个细胞设置唯一的id号
                    cellTempt.style.width =String(this.cell_width) +"px";
                    cellTempt.style.height = String(this.cell_height) + "px";
                    cellTempt.style.top = String(i * this.cell_height) + "px";
                    cellTempt.style.left = String(j * this.cell_width) + "px";
                    cellTempt.style.borderRadius = String(this.cell_width / 2) + "px";
                    if(map.getCellStatus(i + 1, j + 1) === CELL_DEAD)    //为每个细胞根据状态设置css类别
                    {
                        cellTempt.className = "cell_dead";
                    }
                    else
                    {
                        cellTempt.className = "cell_live";
                    }
                    temptFragment.appendChild(cellTempt);
                }
            }
            gameWidget.appendChild(temptFragment);

            var theObject = this;    //设置消息响应函数
            this.theGameController = gameController;

            document.getElementById("pauseGame").onclick = function(){
                theObject.theGameController.pause();
            }
            document.getElementById("resetGame").onclick = function(){
                theObject.theGameController.reset(DEFAULT_LINES, DEFAULT_ROWS, DEFAULT_INTERVAL);
            }
            document.getElementById("continueGame").onclick = function(){
                theObject.theGameController.start();
            }
            document.getElementById("startGame").onclick = function(){
                theObject.theGameController.start();
            }

            this.showStart();    //使按钮的显示为开始状态

            this.isInitialized = true;
        }

/******************************************************************************************************
    
   UI.prototype.reset

    函数功能：重置屏幕上显示的细胞地图
    输入：map.js中定义的Map类对象
    输出：无（在游戏界面呈现新设定的细胞地图的状态）


 ******************************************************************************************************/

        UI.prototype.reset = function(map){

            if(QUITEFLAG === true){
                return;
            }

            if(DEBUGFLAG === true){
                if(map === undefined)
                {
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.reset is not defined");
                }
                else if(!(typeof map === "object") || map.cells === undefined){
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.reset is not a Map object");
                }
                else if(map.isInitialized === false){
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.reset is not initialized");
                }
                else if(this.isInitialized === false){
                    QUITEFLAG = true;
                    console.log("the ui in UI.prototype.reset han't been initialized before reset");
                }
                if(QUITEFLAG === true){
                    return;
                }
            }

            gameWidget = document.getElementById("gameWidget");    //获取html中的游戏窗口
            gameWidget.innerHTML = "";    //清空游戏视窗中的cells地图
            var temptFragment = document.createDocumentFragment();    //一次在html中添加多个细胞
            var cellTempt = null;
            this.calcLayout(map.lines, map.rows);    //重新计算这些细胞在游戏界面中的位置

            for(var i = 0; i < map.lines; i ++) 
            {
                for(var j =0; j < map.rows; j++) 
                {
                    cellTempt = document.createElement("div");
                    cellTempt.id = "cell_" + "line" + String(i + 1) + "row" + String(j + 1);    //为每个细胞设置唯一的id号
                    cellTempt.style.width =String(this.cell_width) +"px";
                    cellTempt.style.height = String(this.cell_height) + "px";
                    cellTempt.style.top = String(i * this.cell_height) + "px";
                    cellTempt.style.left = String(j * this.cell_width) + "px";
                    cellTempt.style.borderRadius = String(this.cell_width / 2) + "px";
                    if(map.getCellStatus(i + 1, j + 1) === CELL_DEAD)    //为每个细胞根据状态设置css类别
                    {
                        cellTempt.className = "cell_dead";
                    }
                    else
                    {
                        cellTempt.className = "cell_live";
                    }
                    temptFragment.appendChild(cellTempt);
                }
            }
            gameWidget.appendChild(temptFragment);
            
        }

/******************************************************************************************************
    
   UI.prototype.showQuitToClient

    函数功能：将程序的异常状态显示在网页上
    输入：无
    输出：无


 ******************************************************************************************************/

		UI.prototype.showQuitToClient = function(){

            if(QUITEFLAG === true){
                return;
            }

            var gameWidget = document.getElementById("gameWidget");
            gameWidget.innerHTML = "";
            errorMessage = document.createElement("div");
            errorMessage.id = "errorMessage";
            var errorMessageText = document.createElement("p");
            errorMessageText.id = "errorMessageText";
            errorMessageText.innerHTML = "这个程序出了点问题，开发人员正在努力调试";
            errorMessage.appendChild(errorMessageText);
            gameWidget.appendChild(errorMessage);
		}

/******************************************************************************************************
    
   UI.prototype.showPause

    函数功能：在屏幕上显示继续按钮和重置按钮，隐藏其他按钮
    输入：无
    输出：无


 ******************************************************************************************************/

        UI.prototype.showPause = function(){

            if(QUITEFLAG === true){
                return;
            }

            document.getElementById("pauseGame").style.display = "none";
            document.getElementById("resetGame").style.display = "inline-block";
            document.getElementById("continueGame").style.display = "inline-block";
            document.getElementById("startGame").style.display = "none";  

        }

/******************************************************************************************************
    
   UI.prototype.showContinue

    函数功能：在屏幕上显示继续暂停和重置按钮，隐藏其他按钮
    输入：无
    输出：无


 ******************************************************************************************************/

        UI.prototype.showContinue = function(){

            if(QUITEFLAG === true){
                return;
            }

            document.getElementById("pauseGame").style.display = "inline-block";
            document.getElementById("resetGame").style.display = "inline-block";
            document.getElementById("continueGame").style.display = "none";
            document.getElementById("startGame").style.display = "none";  
            
        }

/******************************************************************************************************
    
   UI.prototype.showStart

    函数功能：在屏幕上显示开始按钮，隐藏其他按钮
    输入：无
    输出：无


 ******************************************************************************************************/

        UI.prototype.showStart = function(){

            if(QUITEFLAG === true){
                return;
            }

            document.getElementById("pauseGame").style.display = "none";
            document.getElementById("resetGame").style.display = "none";
            document.getElementById("continueGame").style.display = "none";
            document.getElementById("startGame").style.display = "inline-block";       
        }

/******************************************************************************************************
    
   UI.prototype.showCellsStatus

    函数功能：在屏幕上显示（更新）地图桑所有细胞的状态
    输入：游戏的细胞地图map
    输出：无


 ******************************************************************************************************/

        UI.prototype.showCellsStatus = function(map){

            if(QUITEFLAG === true){
                return;
            }
            if(DEBUGFLAG === true){
                if(map === undefined)
                {
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.showCellsStatus is not defined");
                }
                else if(!(typeof map === "object") || map.cells === undefined){
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.showCellsStatus is not a Map object");
                }
                else if(map.isInitialized === false){
                    QUITEFLAG = true;
                    console.log("the map in UI.prototype.showCellsStatus is not initialized");
                }
                if(QUITEFLAG === true){
                    return;
                }
            }

            var cellId;
            var cellStatus;
            var cellTempt;
            console.log(map);
            for(var i = 0; i < map.lines; i ++) 
            {
                for(var j =0; j < map.rows; j++)
                {
                    cellId = "cell_" + "line" + String(i + 1) + "row" + String(j + 1);
                    cellTempt = document.getElementById(cellId);
                    cellStatus = map.getCellStatus(i + 1, j + 1);
                    if(cellStatus === CELL_DEAD){
                        cellTempt.className = "cell_dead";
                    }
                    else{
                        cellTempt.className = "cell_live";
                    }
                }
            }

        }


		//定义UI类的内部函数

/******************************************************************************************************
    
   UI.prototype.calcLayout

    函数功能：根据输入的细胞的行数和列数的大小，计算细胞地图在网页中的长宽和显示位置，使细胞地图的显示可以垂直居中
    输入：无
    输出：无


 ******************************************************************************************************/

        UI.prototype.calcLayout = function(lines, rows){

            if(QUITEFLAG === true){
                return;
            }

            if(DEBUGFLAG === true){
                if(lines === undefined || rows === undefined){
                    QUITEFLAG = true;
                    console.log("the lines or rows in UI.prototype.calcLayout isn't set");
                }
                else if(!JudgePositiveInteger(lines)){
                    QUITEFLAG = true;
                    console.log("the lines in UI.prototype.calcLayout isn't a positive integer");
                }
                else if(!JudgePositiveInteger(rows)){
                    QUITEFLAG = true;
                    console.log("the rows in UI.prototype.calcLayout isn't a positive integer");
                }
                if(QUITEFLAG === true){
                    return;
                }
            }

            if((this.clientWidth * GAMEWIGETWIDTH / rows) > (this.clientHeight * GAMEWIGETHEIGHT / lines)) {    //如果按照计算细胞列宽比行高高，则以行高为实际
                this.cell_width = this.clientHeight * GAMEWIGETHEIGHT / lines;
                this.cell_height = this.clientHeight * GAMEWIGETHEIGHT / lines;
                document.getElementById("gameWidget").style.left = String(TOTALLEFTGAME * this.clientWidth + (this.clientWidth * GAMEWIGETWIDTH - this.cell_height * rows) / 2) + "px";   //改变游戏视窗的左边距和宽度，使这时视窗仍垂直居中
                document.getElementById("gameWidget").style.width= String(this.cell_height * rows) + "px";
            }
            else{    //如果按照计算细胞行高比列宽高，则以列宽为实际
                this.cell_width = this.clientWidth * GAMEWIGETWIDTH / rows;
                this.cell_height = this.clientWidth * GAMEWIGETWIDTH / rows;
                document.getElementById("gameWidget").style.top = String((this.clientHeight * GAMEWIGETHEIGHT - this.cell_width * lines) / 2) + "px";   //改变游戏视窗的上边距和高度，使这时视窗仍垂直居中
                document.getElementById("gameWidget").style.height = String(this.cell_width * lines) + "px";
            }
        }

		 UI._initialized = true;
	}
}