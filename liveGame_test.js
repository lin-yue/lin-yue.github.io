describe('liveGame',function(){
	describe('debug',function(){
		describe("JudgePositiveInteger", function(){
			it('should be a function',function()
			{
				assert.isFunction(JudgePositiveInteger);
			});
			it('should return true when it is a positive integer',function()
			{
				assert.isTrue(JudgePositiveInteger(5));
			});
			it('should return false when it is negative or zero integer',function()
			{
				assert.isFalse(JudgePositiveInteger(0));
			});
			it('should return false when it is a float',function()
			{
				assert.isFalse(JudgePositiveInteger(5.1));
			});
			it('should return false when it is a string or others',function()
			{
				assert.isFalse(JudgePositiveInteger("nihao"));
			});

		})
	});

	describe('timer',function()
	{
		var timerForTest;
    	beforeEach(function(){
    		timerForTest = [];
			timerForTest = new Timer();
			DEBUGFLAG = true;
			QUITEFLAG = false;
		}); 
		it('should be an Object',function()
		{
			assert.isObject(timerForTest);
		});
		describe("timer.initial", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(timerForTest.initialize);
			});
			context('when input is correct', function(){
				beforeEach(function(){
					timerForTest.initialize(TIMEINTERVAL_LEAST);
				});
				it('should set correct timeInterval',function()
				{
					assert.strictEqual(TIMEINTERVAL_LEAST, timerForTest.timeInterval);
				});
				it('should initialize the jsTimer',function()
				{
					assert.isDefined(timerForTest.jsTimer);
				});
			})
			context('when debug is set and input is not correct, should set QUITEFLAG to true',function(){
				it('should set quiteflag true and leave jsTimer undefined',function()
				{
					timerForTest.initialize(TIMEINTERVAL_LEAST - 1);
					assert.isUndefined(timerForTest.jsTimer);
					assert.isTrue(QUITEFLAG)
				});
				it('should set quiteflag true and leave jsTimer undefined',function()
				{

					timerForTest.initialize();
					assert.isUndefined(timerForTest.jsTimer);
					assert.isTrue(QUITEFLAG)
				});

			})


		})
		describe("timer.start", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(timerForTest.start);
			});
			context('when it is called after initialized', function(){
				it('should loop infinitely',function(done){
					var loopCount = 0;
					var tocycleTest = function(){
						loopCount ++;
						console.log(loopCount);
						if(loopCount === 8)
						{
							done();
							clearTimeout(timerForTest.jsTimer);
						}
					}
				    timerForTest.initialize(60);
					timerForTest.start(tocycleTest);
				});;
				afterEach(function(){
					clearTimeout(timerForTest.jsTimer);
				});
			})
			context('when it is called before initialized',function(){
				it('should set quiteflag true',function()
				{
					var tocycleTest = function(){
					}
					timerForTest.start(tocycleTest);
					assert.isTrue(QUITEFLAG)
				});
				afterEach(function(){
					clearTimeout(timerForTest.jsTimer);
				});

			})

		})
		describe("timer.pause", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(timerForTest.pause);
			});
			context('when it is called after initialized and it is not paused', function(){
				it('should pause',function(done){
					var loopCount = 0;
					var num1 = 0;
					var num2 = 0;
					var tocycleTest = function(){
						loopCount ++;
					}
				    timerForTest.initialize(100);
					timerForTest.start(tocycleTest);
					setTimeout(function(){
						timerForTest.pause();
						num1 = loopCount;
					},1000)
					setTimeout(function(){
						num2 = loopCount;
						assert.isTrue(timerForTest.isPaused);
						if(num1 === num2 && num1 > 0)
						{
							done();
						}
					},1500)
				});;
				afterEach(function(){
					clearTimeout(timerForTest.jsTimer);
				});
			})
			context('when it is called before initialized or it is paused',function(){
				it('should set quiteflag true if before initialized',function()
				{
					var tocycleTest = function(){
					}
					timerForTest.start(tocycleTest);
					timerForTest.pause();
					assert.isTrue(QUITEFLAG)
				});
				it('should set quiteflag true if is paused',function()
				{
					var tocycleTest = function(){
					}
					timerForTest.start(tocycleTest);
					timerForTest.pause();
					timerForTest.pause();
					assert.isTrue(QUITEFLAG)
				});
				afterEach(function(){
					clearTimeout(timerForTest.jsTimer);
				});

			})

		})
		describe("timer.reset", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(timerForTest.reset);
			});
			context('when input is correct and timer is initialized', function(){
				it('should reset time',function(){
				    timerForTest.initialize(100);
				    timerForTest.jsTimer = undefined;
					timerForTest.reset(80);
					assert.isDefined(timerForTest.jsTimer);
				});;
				afterEach(function(){
					clearTimeout(timerForTest.jsTimer);
				});
			})
			context('when input is not correct or timer is not initialized',function(){
				it('should set quiteflag true when input is not correct',function()
				{
					timerForTest.initialize(80);
					timerForTest.jsTimer = undefined;
					timerForTest.reset(TIMEINTERVAL_LEAST - 1);
					assert.isUndefined(timerForTest.jsTimer);
					assert.isTrue(QUITEFLAG)
				});
				it('should set quiteflag true when input is not correct',function()
				{

					timerForTest.initialize(80);
					timerForTest.jsTimer = undefined;
					timerForTest.reset();
					assert.isUndefined(timerForTest.jsTimer);
					assert.isTrue(QUITEFLAG)
				});
				it('should set quiteflag true when timer is not initialized',function()
				{

					timerForTest.reset(80);
					assert.isUndefined(timerForTest.jsTimer);
					assert.isTrue(QUITEFLAG)
				});

			});
		});
	});

	describe('map',function(){
		var mapForTest;
    	beforeEach(function(){
    		mapForTest = [];
			mapForTest = new Map();
			DEBUGFLAG = true;
			QUITEFLAG = false;
		}); 
		it('should be an Object',function()
		{
			assert.isObject(mapForTest);
		});
		describe("map.initialize", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(mapForTest.initialize);
			});
			context('when input is correct', function(){
				it('should create map with the lines and rows',function()
				{
					mapForTest.initialize(40,50);
					assert.strictEqual(mapForTest.lines, 40);
					assert.strictEqual(mapForTest.rows, 50);
					assert.strictEqual(typeof mapForTest.cells, "object");
					assert.strictEqual(mapForTest.cells.length, 40);
					for(var i = 0; i < mapForTest.cells.length; i++){
						assert.strictEqual(mapForTest.cells[i].length, 50);
					}
				});				
			})
			context('when debug is set and input is not correct',function(){
				it('should set quiteflag true when input lines or rows is not interger',function()
				{
					mapForTest.initialize(40,"");
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					mapForTest.initialize(37.2,50);
					assert.isTrue(QUITEFLAG);
				});
				it('should set quiteflag true when input lines or rows is out of range',function()
				{

					mapForTest.initialize(2,60);
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					mapForTest.initialize(10000,10000000);
					assert.isTrue(QUITEFLAG);
				});

			})


		})
		describe("map.reset", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(mapForTest.reset);
			});
			context('when it is called after initialized and input is correct', function(){
				it('should reset the map',function(){
					mapForTest.initialize(70,80);
					mapForTest.reset(40,50);
					assert.strictEqual(mapForTest.lines, 40);
					assert.strictEqual(mapForTest.rows, 50);
					assert.strictEqual(typeof mapForTest.cells, "object");
					assert.strictEqual(mapForTest.cells.length, 40);
					for(var i = 0; i < mapForTest.cells.length; i++){
						assert.strictEqual(mapForTest.cells[i].length, 50);
					}					
				});;
			})
			context('when it is called before initialized or input is not correct',function(){
				it('should set quiteflag true when it is called before initialized',function()
				{				
					mapForTest.reset(40,50);
					assert.isTrue(QUITEFLAG)
				});
				it('should set quiteflag true when input lines or rows is not interger',function()
				{

					mapForTest.initialize(40,50);
					mapForTest.reset(40,"");
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					mapForTest.reset(37.2,50);
					assert.isTrue(QUITEFLAG);
				});
				it('should set quiteflag true when input lines or rows is out of range',function()
				{
					mapForTest.initialize(40,50);
					mapForTest.reset(2,60);
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					mapForTest.reset(37.2,50);
					assert.isTrue(QUITEFLAG);
				})

			})

		})
		describe("map.getCellStatus", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(mapForTest.getCellStatus);
			});
			context('when it is called after initialized', function(){
				it('should get correct status',function(){
					mapForTest.initialize(40,60);
					mapForTest.cells[29][30] = CELL_LIVE;
					assert.strictEqual(mapForTest.getCellStatus(30,31),CELL_LIVE);
					assert.strictEqual(mapForTest.getCellStatus(28,31),CELL_DEAD);
				});;
			})
			context('when it is called before initialized',function(){
				it('should set quiteflag true',function()
				{
					mapForTest.getCellStatus(30,31);
					assert.isTrue(QUITEFLAG)
				});

			})

		})
		describe("map.setCellStatus", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(mapForTest.setCellStatus);
			});
			context('when map is initialized', function(){
				it('should set correct cell status',function(){
				    mapForTest.initialize(40,60);
					mapForTest.setCellStatus(30,31,CELL_LIVE);
					mapForTest.setCellStatus(3,3,CELL_LIVE);
					assert.strictEqual(mapForTest.getCellStatus(30,31),CELL_LIVE);
					assert.strictEqual(mapForTest.getCellStatus(3,3),CELL_LIVE);
				});;
			})
			context('when map is not initialized',function(){
				it('should set quiteflag true ',function()
				{
					mapForTest.setCellStatus(30,31,CELL_LIVE);
					assert.isTrue(QUITEFLAG)
				});

			});

		});
		describe("map.getLiveNeighborCount", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(mapForTest.getLiveNeighborCount);
			});
			context('when map is initialized', function(){
				it('should get correct live NeighborCount',function(){
				    mapForTest.initialize(40,40);
					mapForTest.setCellStatus(31,31,CELL_LIVE);    //31,31周围共5个活细胞
					mapForTest.setCellStatus(30,30,CELL_LIVE);
					mapForTest.setCellStatus(31,32,CELL_LIVE);
					mapForTest.setCellStatus(31,30,CELL_LIVE);
					mapForTest.setCellStatus(32,30,CELL_LIVE);
					mapForTest.setCellStatus(32,32,CELL_LIVE);
					mapForTest.setCellStatus(40,40,CELL_LIVE);    //右下周围共5个活细胞
					mapForTest.setCellStatus(40,39,CELL_LIVE);
					mapForTest.setCellStatus(1,39,CELL_LIVE);
					mapForTest.setCellStatus(1,1,CELL_LIVE);      //左上周围共4个活细胞
					mapForTest.setCellStatus(39,1,CELL_LIVE);
					mapForTest.setCellStatus(40,1,CELL_LIVE);     //左下周围共4个活细胞, 右上周围共6个活细胞
					mapForTest.setCellStatus(1,2,CELL_LIVE);
					mapForTest.setCellStatus(2,1,CELL_LIVE);
					mapForTest.setCellStatus(1,22,CELL_LIVE);     //上侧非角处共3个活细胞
					mapForTest.setCellStatus(40,22,CELL_LIVE);
					mapForTest.setCellStatus(40,21,CELL_LIVE);
					mapForTest.setCellStatus(1,21,CELL_LIVE);
					mapForTest.setCellStatus(25,1,CELL_LIVE);    //左侧非角处共3个活细胞
					mapForTest.setCellStatus(24,40,CELL_LIVE);
					mapForTest.setCellStatus(26,40,CELL_LIVE);
					mapForTest.setCellStatus(26,2,CELL_LIVE);
					assert.strictEqual(mapForTest.getLiveNeighborCount(31,31),5);
					assert.strictEqual(mapForTest.getLiveNeighborCount(40,40),5);
					assert.strictEqual(mapForTest.getLiveNeighborCount(1,1),4);
					assert.strictEqual(mapForTest.getLiveNeighborCount(40,1),4);
					assert.strictEqual(mapForTest.getLiveNeighborCount(1,40),6);
					assert.strictEqual(mapForTest.getLiveNeighborCount(1,22),3);
					assert.strictEqual(mapForTest.getLiveNeighborCount(25,1),3);
				});;
			})
			context('when map is not initialized',function(){
				it('should set quiteflag true ',function()
				{
					mapForTest.getLiveNeighborCount(40,40);
					assert.isTrue(QUITEFLAG)
				});

			});

		});
		describe("map.copyMap", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(mapForTest.copyMap);
			});
			context('when map is initialized and mapTempt is correct', function(){
				it('should copy mapTempt correctly',function(){
				    mapForTest.initialize(40,40);
				    var mapTempt = new Map();
				    mapTempt.initialize(40,40);
					mapTempt.setCellStatus(30,31,CELL_LIVE);
					mapTempt.setCellStatus(3,3,CELL_LIVE);
					mapForTest.copyMap(mapTempt);
					assert.strictEqual(mapForTest.getCellStatus(30,31),CELL_LIVE);
					assert.strictEqual(mapForTest.getCellStatus(3,3),CELL_LIVE);
				});;
			})
			context('when map is not initialized or mapTempt is not correct',function(){
				it('should set quiteflag true when mapTempt is not correct',function()
				{
					mapForTest.initialize(40,40);
					mapForTest.copyMap();
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					var mapTempt = new Map();
					mapTempt.initialize(50,40);
					mapForTest.copyMap(mapTempt);
					assert.isTrue(QUITEFLAG);

				});
				it('should set quiteflag true when map is not initialized',function()
				{
					var mapTempt = new Map();
					mapTempt.initialize(50,40);
					mapForTest.copyMap(mapTempt);
					assert.isTrue(QUITEFLAG);
				})

			});

		});
	});

	describe('ui',function()
	{
		var gameControllerForTest;
		var uiForTest;
    	beforeEach(function(){
    		QUITEFLAG = false;
    		DEBUGFLAG = true;
    		gameControllerForTest = [];
    		gameControllerForTest = new GameController();
    		uiForTest = [];
    		uiForTest = new UI();
		}); 
		it('should be an Object',function()
		{
			assert.isObject(uiForTest);
		});
		describe("UI.calcLayout", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(uiForTest.calcLayout);
			});
			context('when input lines and rows is correct', function(){
				it('should give correct layout when row length is small',function(){
					uiForTest.calcLayout(40,500);
					assert.isAbove(uiForTest.clientHeight * GAMEWIGETHEIGHT / 40, uiForTest.clientWidth * GAMEWIGETWIDTH / 500);
					assert.strictEqual(uiForTest.clientWidth * GAMEWIGETWIDTH / 500, uiForTest.cell_width);
					assert.approximately(parseInt(document.getElementById("gameWidget").style.height), uiForTest.cell_width * 40, 4);
					assert.approximately(parseInt(document.getElementById("gameWidget").style.top), uiForTest.clientHeight * GAMEWIGETHEIGHT - parseInt(document.getElementById("gameWidget").style.top) - parseInt(document.getElementById("gameWidget").style.height), 4);
				});
				it('should give correct layout when line height is small',function(){
					uiForTest.calcLayout(500,40);
					assert.isAbove(uiForTest.clientWidth * GAMEWIGETWIDTH / 40, uiForTest.clientHeight * GAMEWIGETHEIGHT / 500);
					assert.strictEqual(uiForTest.clientHeight * GAMEWIGETHEIGHT / 500, uiForTest.cell_width);
					assert.approximately(parseInt(document.getElementById("gameWidget").style.width), uiForTest.cell_width * 40, 4);
					assert.approximately(parseInt(document.getElementById("gameWidget").style.left), uiForTest.clientWidth - parseInt(document.getElementById("gameWidget").style.left) - parseInt(document.getElementById("gameWidget").style.width), 4);
				});
			})
			context('when input lines and rows is not correct',function(){
				it('should set quiteflag true',function()
				{
					uiForTest.calcLayout();
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					uiForTest.calcLayout(40.7,200);
					assert.isTrue(QUITEFLAG);
				});
			})

		})
		describe("UI.showInitialGame", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(uiForTest.showInitialGame);
			});
			context('when input map and gameController is correct and initialized', function(){
				it('should show all the cells on the webpage and set proper function to four buttons',function()
				{
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.map = mapForTest;
					var countTempt = 0;
					gameControllerForTest.pause = function(){
						countTempt++;
					}
					uiForTest.showInitialGame(mapForTest,gameControllerForTest);
					assert.strictEqual(document.getElementById("gameWidget").children.length, 1600);
					assert.strictEqual(typeof document.getElementById("cell_line20row20"), "object");
					assert.isAbove(parseInt(document.getElementById("cell_line20row20").style.width), 0);
					assert.strictEqual(document.getElementById("cell_line20row20").className, "cell_dead");
					assert.isFunction(document.getElementById("pauseGame").onclick);
					document.getElementById("pauseGame").onclick();
					assert.strictEqual(countTempt, 1);
				});
			})
			context('when debug is set and input is not correct',function(){
				it('should set quiteflag true when is not initialized',function()
				{
					var mapForTest = new Map();
					gameControllerForTest.map = mapForTest;
					uiForTest.showInitialGame(mapForTest,gameControllerForTest);
					assert.isTrue(QUITEFLAG)
				});
				it('should set quiteflag true when input is not correct',function()
				{
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.map = mapForTest;
					uiForTest.showInitialGame(mapForTest,mapForTest);
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					uiForTest.showInitialGame();
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					uiForTest.showInitialGame(mapForTest);
					assert.isTrue(QUITEFLAG)
				});

			})


		})
		describe("UI.reset", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(uiForTest.reset);
			});
			context('when input map is correct and initialized', function(){
				it('should show reset all the cells on the webpage',function()
				{
					var mapForTest = new Map();
					mapForTest.initialize(200,200);
					gameControllerForTest.map = mapForTest;
					uiForTest.showInitialGame(mapForTest,gameControllerForTest);
					var anotherMap = new Map();
					anotherMap.initialize(40,40);
					uiForTest.reset(anotherMap);
					assert.strictEqual(document.getElementById("gameWidget").children.length, 1600);
					assert.strictEqual(typeof document.getElementById("cell_line20row20"), "object");
					assert.isAbove(parseInt(document.getElementById("cell_line20row20").style.width), 0);
					assert.strictEqual(document.getElementById("cell_line20row20").className, "cell_dead");
				});
			})
			context('when debug is set and input is not correct',function(){
				it('should set quiteflag true when is not initialized',function()
				{
					var mapForTest = new Map();
					uiForTest.reset(mapForTest);
					assert.isTrue(QUITEFLAG)
				});
				it('should set quiteflag true when input map is not correct',function()
				{
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.map = mapForTest;
					uiForTest.showInitialGame(mapForTest,gameControllerForTest);
					uiForTest.reset();
					assert.isTrue(QUITEFLAG);
					QUITEFLAG = false;
					uiForTest.showInitialGame(gameControllerForTest);
					assert.isTrue(QUITEFLAG)
				});

			})
		});	
		describe("UI.showQuitToClient", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(uiForTest.showQuitToClient);
			});
			context('when it is called', function(){
				it('should clear all the things in gameWidget and show error message',function(){
					uiForTest.showQuitToClient();
					assert.strictEqual(document.getElementById("gameWidget").children.length, 1);
					assert.strictEqual(typeof document.getElementById("errorMessageText"), "object");
					assert.isString(document.getElementById("errorMessageText").innerHTML);
					assert.isAbove(document.getElementById("errorMessageText").innerHTML.length, 0);
				});
			})
		})
		describe("UI.showCellsStatus", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(uiForTest.showCellsStatus);
			});
			context('when input map is correct', function(){
				it('should update the cell (class of div on webpage) status as the map',function(){
				    var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.map = mapForTest;
					uiForTest.showInitialGame(mapForTest,gameControllerForTest);
					mapForTest.setCellStatus(5,10,CELL_LIVE);
					mapForTest.setCellStatus(39,40,CELL_LIVE);
					uiForTest.showCellsStatus(mapForTest);
					assert.strictEqual(document.getElementById("cell_line5row10").className, "cell_live");
					assert.strictEqual(document.getElementById("cell_line39row40").className, "cell_live");
					assert.strictEqual(document.getElementById("cell_line38row40").className, "cell_dead");
				});
			})
			context('when input map is not correct or not initialized',function(){
				it('should set quiteflag true when input map is not correct',function()
				{
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.map = mapForTest;
					uiForTest.showInitialGame(mapForTest,gameControllerForTest);
					uiForTest.showCellsStatus();
					assert.isTrue(QUITEFLAG)
					QUITEFLAG = false;
					uiForTest.showCellsStatus(gameControllerForTest);
					assert.isTrue(QUITEFLAG)
				});
				it('should set quiteflag true when input map is not initialized',function()
				{
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.map = mapForTest;
					uiForTest.showInitialGame(mapForTest,gameControllerForTest);
					var mapTempt = new Map();
					uiForTest.showCellsStatus(mapTempt);
					assert.isTrue(QUITEFLAG)
				})
			});
		});
		describe("UI.showStart", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(uiForTest.showStart);
			});
		});
		describe("UI.showPause", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(uiForTest.showStart);
			});
		})
		describe("UI.showContinue", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(uiForTest.showStart);
			});
		})
		afterEach(function(){
    		document.getElementById("gameWidget").innerHTML = "";
		});
	});
	
	describe('gameController',function()
	{
		var gameControllerForTest;
    	beforeEach(function(){
    		QUITEFLAG = false;
    		DEBUGFLAG = true;
    		gameControllerForTest = [];
    		gameControllerForTest = new GameController();
		}); 
		it('should be an Object',function()
		{
			assert.isObject(gameControllerForTest);
		});
		describe("gameController.createRandomInitialCells", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.createRandomInitialCells);
			});
			context('when the map in gameControllerForTest is initialized', function(){
				it('should randomlize the cells status',function(){
					var cellTemptStatus;
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.gameMap = mapForTest;
					cellTemptStatus = gameControllerForTest.gameMap.cells[14][12];
					while(true){
						gameControllerForTest.createRandomInitialCells();
						if(cellTemptStatus !== gameControllerForTest.gameMap.cells[14][12]){
							break;
						}
						else{
							cellTemptStatus = gameControllerForTest.gameMap.cells[14][12];
						}
					}
					cellTemptStatus = mapForTest.cells[39][39];
					while(true){
						gameControllerForTest.createRandomInitialCells();
						if(cellTemptStatus !== gameControllerForTest.gameMap.cells[39][39]){
							break;
						}
						else{
							cellTemptStatus = gameControllerForTest.gameMap.cells[39][39];
						}
					}
				});
			})
			context('when the map in gameControllerForTest is not initialized',function(){
				it('should set quiteflag true',function()
				{
					gameControllerForTest.createRandomInitialCells();
					assert.isTrue(QUITEFLAG);
				});
			})

		})
		describe("gameController.returnCellNewStateLogic", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.returnCellNewStateLogic);
			});
			context('when gameController.gameMap is initialized and randomlized(by createRandomInitialCells)', function(){
				it('should return the new cell status of certain line and row',function()
				{
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.gameMap = mapForTest;
					gameControllerForTest.gameMap.isRandomlized = true;
					gameControllerForTest.gameMap.setCellStatus(31,31,CELL_LIVE);    //31,31周围共5个活细胞，自身为活, 31,29周围共3个活细胞(自身为死)
					gameControllerForTest.gameMap.setCellStatus(30,30,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(31,32,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(31,30,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(32,30,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(32,32,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(40,40,CELL_LIVE);    
					gameControllerForTest.gameMap.setCellStatus(40,39,CELL_LIVE);    //40,39周围有2个活细胞，自身为活， 39,2周围有2个活细胞，自身为死
					gameControllerForTest.gameMap.setCellStatus(1,39,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(1,1,CELL_LIVE);      //左上周围共4个活细胞，自身为活
					gameControllerForTest.gameMap.setCellStatus(39,1,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(40,1,CELL_LIVE);     //右上周围共6个活细胞（自身为死）
					gameControllerForTest.gameMap.setCellStatus(1,2,CELL_LIVE);      //39,40周围共4个活细胞，自身为死
					gameControllerForTest.gameMap.setCellStatus(2,1,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(1,22,CELL_LIVE);     //上侧非角处共3个活细胞，自身为活
					gameControllerForTest.gameMap.setCellStatus(40,22,CELL_LIVE);    //2，39周围有1个活细胞，自身为死
					gameControllerForTest.gameMap.setCellStatus(40,21,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(1,21,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(25,1,CELL_LIVE);    
					gameControllerForTest.gameMap.setCellStatus(24,40,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(26,40,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(26,2,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(17,18,CELL_LIVE);    //17,18周围有0个活细胞，自身为活，17,16周围有0个活细胞，自身为死


					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(31,31),5);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(31,29),3);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(40,39),2);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(39,2),2);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(1,1),4);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(1,40),6);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(39,40),4);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(1,22),3);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(2,39),1);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(17,18),0);
					assert.strictEqual(gameControllerForTest.gameMap.getLiveNeighborCount(17,16),0);

					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(31,31),CELL_DEAD);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(31,29),CELL_LIVE);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(40,39),CELL_LIVE);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(39,2),CELL_DEAD);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(1,1),CELL_DEAD);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(1,40),CELL_DEAD);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(39,40),CELL_DEAD);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(1,22),CELL_LIVE);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(2,39),CELL_DEAD);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(17,18),CELL_DEAD);
					assert.strictEqual(gameControllerForTest.returnCellNewStateLogic(17,16),CELL_DEAD);					
				});
			})
			context('when gameController.gameMap is not initialized or not randomlized',function(){
				it('should set quiteflag true when is not initialized',function()
				{
					gameControllerForTest.returnCellNewStateLogic(2,3);
					assert.isTrue(QUITEFLAG);
				});
				it('should set quiteflag true when is not randomlized',function()
				{
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.gameMap = mapForTest;
					gameControllerForTest.returnCellNewStateLogic(2,3);
					assert.isTrue(QUITEFLAG)
				});

			})


		})
		describe("gameController.initialize", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.initialize);
			});
			context('when input lines, rows and timeInterval is correct', function(){
				it('should set gameMap, gameTimer and gameUI correctly',function()
				{
					gameControllerForTest.initialize(40,40,100);
					assert.strictEqual(gameControllerForTest.gameMap.cells.length, 40);
					assert.strictEqual(gameControllerForTest.gameTimer.timeInterval, 100);
					assert.isDefined(gameControllerForTest.gameTimer.jsTimer);
					assert.isTrue(gameControllerForTest.gameMap.isRandomlized);
					assert.strictEqual(document.getElementById("gameWidget").children.length, 1600);
				});
			})
			context('when some input is not correct',function(){
				it('should set quiteflag true',function()
				{
					gameControllerForTest.initialize(10,40,100);
					assert.isTrue(QUITEFLAG);
				});
				it('should set quiteflag true',function()
				{
					gameControllerForTest.initialize(40,1000000,100);
					assert.isTrue(QUITEFLAG);
				});
				it('should set quiteflag true',function()
				{
					gameControllerForTest.initialize(40,40,3);
					assert.isTrue(QUITEFLAG);
				});
			})
		});
		describe("gameController.reset", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.reset);
			});
			context('when input lines, rows and timeInterval is correct and it is initialized', function(){
				it('should reset gameMap, gameTimer and gameUI correctly',function()
				{
					gameControllerForTest.initialize(40,40,100);
					gameControllerForTest.reset(30,30,80);
					assert.strictEqual(gameControllerForTest.gameMap.cells.length, 30);
					assert.strictEqual(gameControllerForTest.gameTimer.timeInterval, 80);
					assert.isDefined(gameControllerForTest.gameTimer.jsTimer);
					assert.isTrue(gameControllerForTest.gameMap.isRandomlized);
					assert.strictEqual(document.getElementById("gameWidget").children.length, 900);
				});
			})
			context('when some input is not correct or it is not initialized',function(){
				it('should set quiteflag true',function()
				{
					gameControllerForTest.initialize(40,40,100);
					gameControllerForTest.reset(10,40,100);
					assert.isTrue(QUITEFLAG);
				});
				it('should set quiteflag true',function()
				{
					gameControllerForTest.initialize(40,40,100);
					gameControllerForTest.reset(40,1000000,100);
					assert.isTrue(QUITEFLAG);
				});
				it('should set quiteflag true',function()
				{
					gameControllerForTest.initialize(40,40,100);
					gameControllerForTest.reset(40,40,3);
					assert.isTrue(QUITEFLAG);
				});
				it('should set quiteflag true',function()
				{
					gameControllerForTest.reset(40,40,3);
					assert.isTrue(QUITEFLAG);
				});
			})
		})
		describe("gameController.updateAllCellsState", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.updateAllCellsState);
			});
			context('when the map is initialized', function(){
				it('should update the cells status',function(){
				    gameControllerForTest.initialize(40,40,100);
					var mapForTest = new Map();
					mapForTest.initialize(40,40);
					gameControllerForTest.gameMap = mapForTest;
					gameControllerForTest.gameMap.isRandomlized = true;
					gameControllerForTest.gameMap.setCellStatus(31,31,CELL_LIVE);    //31,31周围共5个活细胞，自身为活, 31,29周围共3个活细胞(自身为死)
					gameControllerForTest.gameMap.setCellStatus(30,30,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(31,32,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(31,30,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(32,30,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(32,32,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(40,40,CELL_LIVE);    
					gameControllerForTest.gameMap.setCellStatus(40,39,CELL_LIVE);    //40,39周围有2个活细胞，自身为活， 39,2周围有2个活细胞，自身为死
					gameControllerForTest.gameMap.setCellStatus(1,39,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(1,1,CELL_LIVE);      //左上周围共4个活细胞，自身为活
					gameControllerForTest.gameMap.setCellStatus(39,1,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(40,1,CELL_LIVE);     //右上周围共6个活细胞（自身为死）
					gameControllerForTest.gameMap.setCellStatus(1,2,CELL_LIVE);      //39,40周围共4个活细胞，自身为死
					gameControllerForTest.gameMap.setCellStatus(2,1,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(1,22,CELL_LIVE);     //上侧非角处共3个活细胞，自身为活
					gameControllerForTest.gameMap.setCellStatus(40,22,CELL_LIVE);    //2，39周围有1个活细胞，自身为死
					gameControllerForTest.gameMap.setCellStatus(40,21,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(1,21,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(25,1,CELL_LIVE);    
					gameControllerForTest.gameMap.setCellStatus(24,40,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(26,40,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(26,2,CELL_LIVE);
					gameControllerForTest.gameMap.setCellStatus(17,18,CELL_LIVE);    //17,18周围有0个活细胞，自身为活，17,16周围有0个活细胞，自身为死

					gameControllerForTest.updateAllCellsState();

					assert.strictEqual(gameControllerForTest.gameMap.cells[30][30],CELL_DEAD);
					assert.strictEqual(gameControllerForTest.gameMap.cells[30][28],CELL_LIVE);
					assert.strictEqual(gameControllerForTest.gameMap.cells[39][38],CELL_LIVE);
					assert.strictEqual(gameControllerForTest.gameMap.cells[38][1],CELL_DEAD);
					assert.strictEqual(gameControllerForTest.gameMap.cells[0][0],CELL_DEAD);
				});
			})
			context('when the map is not initialized',function(){
				it('should set quiteflag true',function()
				{
					gameControllerForTest.updateAllCellsState();
					assert.isTrue(QUITEFLAG)
				});

			});
		});
		describe("gameController.gameCycle", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.gameCycle);
			});
			context('when it is not initialized',function(){
				it('should set quiteflag true',function()
				{
					gameControllerForTest.gameCycle();
					assert.isTrue(QUITEFLAG);
				});
			})
		});
		describe("gameController.start", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.start);
			});
			context('when it is initialized',function(){
				it('should start loop and execute gameCycle',function(done)
				{
					gameControllerForTest.initialize(40,40,80);
					gameControllerForTest.loopCount = 0;
					gameControllerForTest.gameCycle= function(){
						this.loopCount ++;
						console.log(this.loopCount)
						if(this.loopCount === 8)
						{
							done();
							clearTimeout(this.gameTimer.jsTimer);
						}
					}
					gameControllerForTest.start();
				});
				it("shouldn't start execute gameCycle twice first",function(done)
				{
					gameControllerForTest.initialize(40,40,600);
					gameControllerForTest.loopCount = 0;
					gameControllerForTest.gameCycle= function(){
						this.loopCount ++;
					}
					gameControllerForTest.start();
					setTimeout(function(){
						clearTimeout(gameControllerForTest.gameTimer.jsTimer);
						assert.strictEqual(gameControllerForTest.loopCount, 1);
						done();
					},200);
				});
				afterEach(function(){
    				clearTimeout(gameControllerForTest.gameTimer.jsTimer);
				})
			})
			context('when it is not initialized',function(){
				it('should set quiteflag true',function()
				{
					gameControllerForTest.start();
					assert.isTrue(QUITEFLAG);
				});
			})
		})
		describe("gameController.pause", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.pause);
			});
			context('when it is initialized',function(){
				it('should pause the game',function(done){
					gameControllerForTest.initialize(40,40,80);
					var num1 = 0;
					var num2 = 0;
					gameControllerForTest.loopCount = 0;
					gameControllerForTest.gameCycle= function(){
						this.loopCount ++;
					}
					gameControllerForTest.start();
					setTimeout(function(){
						gameControllerForTest.pause();
						num1 = gameControllerForTest.loopCount;
					},1000)
					setTimeout(function(){
						num2 = gameControllerForTest.loopCount;
						assert.isTrue(gameControllerForTest.gameTimer.isPaused);
						if(num1 === num2 && num1 > 0)
						{
							done();
						}
					},1500)
				});;
			})
			context('when it is not initialized',function(){
				it('should set quiteflag true',function()
				{
					gameControllerForTest.pause();
					assert.isTrue(QUITEFLAG);
				});
			})

		})
		describe("gameController.setDebugFlag", function()
		{
			it('should be a function',function()
			{
				assert.isFunction(gameControllerForTest.setDebugFlag);
			});
			context('when the flag input is boolean',function(){
				it('should set debugFlag the right flag',function()
				{
					DEBUGFLAG = false;
					gameControllerForTest.setDebugFlag(true);
					assert.isTrue(DEBUGFLAG);
					gameControllerForTest.setDebugFlag(false);
					assert.isFalse(DEBUGFLAG);
				});
			})
			context('when the flag input is not boolean',function(){
				it('should set quiteflag true',function()
				{
					gameControllerForTest.setDebugFlag(1);
					assert.isTrue(QUITEFLAG);
				});
			})
		});
		afterEach(function(){
    		document.getElementById("gameWidget").innerHTML = "";
		});
	});

});


	