
//程序运行的入口

window.onload = function(){

	gameControllerForLiveGame = new GameController();
	gameControllerForLiveGame.initialize(DEFAULT_LINES, DEFAULT_ROWS, DEFAULT_INTERVAL);
	gameControllerForLiveGame.start();

}
