
window.onload = function(){

	gameControllerForLiveGame = new GameController();
	gameControllerForLiveGame.initialize(DEFAULT_LINES, DEFAULT_ROWS, DEFAULT_INTERVAL);
	gameControllerForLiveGame.start();

}
