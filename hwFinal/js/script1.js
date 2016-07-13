

function playLoop() //游戏每个时钟事件的循环
{
	drawScene();
	moveEvents();
}

function removeObjects()  //进入下一关时删除之前的对象
{
	if(oBalls)
	{
	for(var i =0; i < oBalls.objs.length; i++)
	{
		delete oBalls.objs[i];
	}
	delete oBalls;
	}
	if(oPadd)
	{
	for(var i =0; i < oPadd.toolList.length; i++)
	{
		delete oPadd.toolList[i];
	}
	delete oPadd;
	}
	if(oBricks)
	{
	for(var i = 0; i < oBricks.r; i++)
	{
		for(var j = 0; j <　oBricks.c; j++)
		{
			delete oBricks.objs[i][j];
		}
		delete oBricks.objs[i];
	}
	delete oBricks;
	}
	if(oTools)
	{
	for(var i = 0; i < oTools.objs.length;i++)
	{
		delete oTools.objs[i];
	}
	delete oTools;
	}
}

function countTimer()  //玩家游戏时间计时
{
    iElapsed++;
}

function initialization(stage)  //进行游戏各项内容初始化
{
	removeObjects();
	stages = stage;
	breakFlag = false;
	clearFlag = false;
	totalBricks = 0;
	canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var padImg = new Image();  //加载挡板
    padImg.src = 'images/padd.png';
    padImg.onload = function() {};
    oBalls = new Balls();     //加载小球
	oBalls.init();
    var oBall = new Ball(width / 2- 7.5, 565, 0, 0, 15); 
	oBall.onPadd = true;
	oBalls.objs[0] = oBall;
    oPadd = new Padd(width / 2-60, 120, 20, padImg); 
	oPadd.init();
    oBricks = new Bricks((width / 16) - 1, 20, 20, 16, 2); //加载砖块
    oTools = new Tools();    //加载道具
	oTools.init();
    oBricks.objs = new Array(oBricks.r); //选择不同游戏关卡的砖块和道具设置
	switch(stages)
	{
		case 1:	
		
	    for (i=0; i < oBricks.r; i++) 
		{
           oBricks.objs[i] = new Array(oBricks.c);
           for (j=0; j < oBricks.c; j++) 
		   {
        	   oBricks.objs[i][j] = new Brick();
               if(i===6||i===7)
			   {
            	   oBricks.objs[i][j].state = NONE;
               }
               else if(i>=8 && i<=13)
			   {
            	switch(i)
            	{
            		case i:
            		if((j>=0&&j<=2) ||(j>=13&&j<=15))
					{
                        oBricks.objs[i][j].state = NONE;
            		}
            		else
					{
            			if(i == 13 && j % 2 == 0)
            			{
            				oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], KEEP, BRICKNORMAL);
            			}
						else
						{
            			    oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            			}
            		}
            		break;

            	}
               }
               else if(i>=16 && i<=17)
			   {
            	switch(i)
				{
            		case i:
            		if(j%2==1)
					{
                        oBricks.objs[i][j].state = NONE;
            		}
            		else
					{
            			oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            		}
            		break;
            	}
            }
            else if((i>13 && i<16) || (i>17&&i<19) || i>19)
			{
            	oBricks.objs[i][j].state = NONE;
            }
            else if(i === 19)
			{
            	switch(i)
				{
            		case i:
            		if(j%4==1)
					{
            			oBricks.objs[i][j].init(i, j, "#FFFFFF", NONE, BRICKFOREVER);
            		}
            		else
					{
            			oBricks.objs[i][j].state = NONE;
            		}
            		break;
            	}
            }
            else
			{ 
			    if(i == 2 && j % 4 == 3)
				{
                    oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], KEEP, BRICKNORMAL);
				}
				else if(i == 5 && j %4 == 1)
				{
				    oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], LONGER, BRICKNORMAL);
				}
				else
				{
					oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
				}
            }
            }
        }
	break;
	
	case 2:
		
	for (i=0; i < oBricks.r; i++) 
	{
        oBricks.objs[i] = new Array(oBricks.c);
        for (j=0; j < oBricks.c; j++) 
		{
        	oBricks.objs[i][j] = new Brick();
        	if(i>=0 && i<=5)
			{
        		if(j%2==1)
				{
        			if((i===5 && j === 1)||(i===5 && j===13))
					{
        				oBricks.objs[i][j].init(i, j, "#000000", BREAKTHROUGH, BRICKNORMAL);
        			}
					else
					{
                        oBricks.objs[i][j].state = NONE;
        			}
        		}
        		else
				{
                    oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
        		}
        	}
            else if(i===6||i===7)
			{
            	if(j%2==0)
				{
                    oBricks.objs[i][j].state = NONE;
        		}
        		else
				{
        			oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
        		}
            }
            else if(i>=8 && i<=13)
			{
            	switch(i)
            	{
            		case i:                   
            	    if((j>=0&&j<=2) ||(j>=13&&j<=15))
					{
            	    	if(i >= 10 && i<= 13)
						{
            	    		if(j ===1 || j === 14)
							{
                                oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], KEEP, BRICKNORMAL);
                    	    }  
            	    	}
						else
						{
                            oBricks.objs[i][j].state = NONE;
                        }
            		}
            		else
					{
            			if(i == 13 && j % 2 == 0)
            			{
            				oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], SPLIT, BRICKNORMAL);
            			}
            			else if(i===8)
						{
            				oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], LONGER, BRICKNORMAL);
            			}
            			else
						{
            			    oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            			}
            		}
            		break;
            	}
            }
            else if(i>=16 && i<=18)
			{
            	switch(i)
				{
            		case i:
            		if(j%2==1)
					{
                        oBricks.objs[i][j].state = NONE;
            		}
            		else
					{
            			oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            		}
            		break;
            	}
            }
            else if((i>13 && i<16))
			{
            	switch(i)
				{
            		case i:
            		if(j%2==1)
					{
                        oBricks.objs[i][j].state = NONE;
            		}
            		else
					{
            			if(i===14)
						{
            				if(j>1&&j<14)
							{
            					oBricks.objs[i][j].init(i, j, "#ffffff", SPLIT, BRICKFOREVER);
            				}
            				else
							{
                                oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], SPLIT, BRICKNORMAL);
            				}
            			}
						else
						{
                             oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            			}
            		}
            		break;
            	}
            }
            else if((i>18&&i<19) || i>19)
			{
                oBricks.objs[i][j].state = NONE;
            }
            else if(i === 19)
			{
            	switch(i)
				{
            		case i:
            		if(j%4==1){
            			oBricks.objs[i][j].init(i, j, "#FFFFFF", NONE, BRICKFOREVER);
            		}
            		else{
            			oBricks.objs[i][j].state = NONE;
            		}
            		break;
            	}
            }
            else
			{ 
                oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            }
        }
    }
	break;
		
		case 3:		
    for (i=0; i < oBricks.r; i++) 
	{
        oBricks.objs[i] = new Array(oBricks.c);
        for (j=0; j < oBricks.c; j++) 
		{
        	oBricks.objs[i][j] = new Brick();
        	if(i>=1 && i<=2)
			{
        		if(j%2==1)
				{
                    oBricks.objs[i][j].state = NONE;
        		}
        		else
				{
        			oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
        		}
        	}
            else if(i===6||i===7)
			{
            	if(j%2==0)
				{
                    oBricks.objs[i][j].state = NONE;
        		}
        		else
				{
        			oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
        		}
            }
            else if(i>=8 && i<=13)
			{
            	switch(i)
            	{
            		case i:        
            	    if((j>=0&&j<=2) ||(j>=13&&j<=15))
					{
            	    	if(i >= 10 && i<= 13)
						{
            	    		if(j ===1 || j === 14)
							{
                                oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
                    	    }
            	    	}
            	    	else
						{
                            oBricks.objs[i][j].state = NONE;
                        }
            		}
            		else
					{
            			if(i == 13 && j % 2 == 0)
            			{
            				oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], SPLIT, BRICKNORMAL);
            			}
            			else if(i===8){
                            oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], LONGER, BRICKNORMAL);
                        }
                        else if(i===10){
                        	oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], KEEP, BRICKNORMAL);
                        }
            			else{
            			    oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            			}
            		}
            		break;
            	}
            }
            else if(i>=16 && i<=18)
			{
            	switch(i)
				{
            		case i:
            		if(j%2==1)
					{
                        oBricks.objs[i][j].state = NONE;
            		}
            		else
					{
            			oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            		}
            		break;
            	}
            }
            else if((i>13 && i<16))
			{
            	switch(i)
				{
            		case i:
            		if(j%2==1)
					{
                        oBricks.objs[i][j].state = NONE;
            		}
            		else
					{
            			if(i===14)
						{
            				if(j===12 || j===2)//14行12列和2列为铜墙铁壁
							{
            					oBricks.objs[i][j].init(i, j, "#ffffff", SPLIT, BRICKFOREVER);
            				}
            				else
							{
                                oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], SPLIT, BRICKNORMAL);
            				}
            			}
						else if(i===15)
						{
            				oBricks.objs[i][j].init(i, j, "#000000", BREAKTHROUGH, BRICKNORMAL);
            			}
            			else
						{
                             oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            			}
            		}
            		break;
            	}
            }
            else if(i === 19)
			{
            	switch(i)
				{
            		case i:
            		if(j%4==1){
            			oBricks.objs[i][j].init(i, j, "#FFFFFF", NONE, BRICKFOREVER);
            		}
            		else{
            			oBricks.objs[i][j].state = NONE;
            		}
            		break;
            	}
            }

            else
			{ 
                oBricks.objs[i][j].init(i, j, oBricks.colors[i%6], NONE, BRICKNORMAL);
            }           
        }
    }
	break;
	break;
	}

	setTimeout(function()
	{
		playLoop();
		iStart++;
		if(!breakFlag && !clearFlag)
		{
		setTimeout(arguments.callee,5);
		}
		else if(breakFlag)
		{
			initialization(stages);
		}
		else if(clearFlag)
		{
			document.getElementById("insideDetail").style.display = "none";
	        document.getElementById('img-container1').style.display = "block";
		}
	},5);
	iGameTimer = setInterval(countTimer, 1000); 

    sLastTime = localStorage.getItem('last-time');
    sLastPoints = localStorage.getItem('last-points');
	
    aSounds[0] = new Audio('media/snd1.wav');//初始化音乐
    aSounds[0].volume = 0.9;
    aSounds[1] = new Audio('media/snd2.wav');
    aSounds[1].volume = 0.9;
    aSounds[2] = new Audio('media/snd3.wav');
    aSounds[2].volume = 0.9;
	
    $(window).keydown(function(event)//键盘事件
	{ 
        switch (event.keyCode)
		{
            case 37: 
                bLeftBut = true;
				oPadd.x -= 5;
				var oBall;
				for(var i = 0; i < oBalls.objs.length; i++)
				{
					oBall = oBalls.objs[i];
	            if(oBall.onPadd == true)
	            {
		             oBall.x -= 5;
	            }
				}
				leftButCommit = true;
                break;
            case 39: 
                bRightBut = true;
				oPadd.x += 5;
				var oBall;
				for(var i = 0; i < oBalls.objs.length; i++)
				{
					oBall = oBalls.objs[i];
	            if(oBall.onPadd == true)
	            {
		             oBall.x += 5;
	            }
				}
				rightButCommit = true;
                break;
        }
    });
	
	
    $(window).keyup(function(event)
	{ 
	   var hasBall = false;
	   var firstBall = -1;
        switch (event.keyCode) 
		{
            case 37: 
                bLeftBut = false;
                break;
            case 39: 
                bRightBut = false;
                break;
			case 32:
			var oBall;
			for(var i = 0; i < oBalls.objs.length; i++)
			{
			   oBall = oBalls.objs[i];
			   if(oBall.onPadd == true)
	           {
		          oBall.onPadd = false;
		          oBall.dx = 0.5;
		          oBall.dy = -5;
				  hasBall = true;
				  if(oPadd.splitBall != 0)
				  {
					var oBall1 = new Ball(oBalls.objs[i].x, oBalls.objs[i].y, -10, -5, 15); 
				    oBalls.objs[oBalls.objs.length] = oBall1;
				    var oBall1 = new Ball(oBalls.objs[i].x, oBalls.objs[i].y,10, -5, 15); 
				    oBalls.objs[oBalls.objs.length] = oBall1;
				    oPadd.splitBall--;
				    oPadd.removeSplit();
				  }
	           }		
			}
		   break;
        }
    });

    //鼠标跟随事件
    var iCanvX1 = $(canvas).offset().left;
    var iCanvX2 = iCanvX1 + width;
    $('#scene').mousemove(function(e) 
	{ 
	 var xBefore = oPadd.x;
        if (e.pageX > iCanvX1 && e.pageX < iCanvX2) 
		{
            oPadd.x = Math.max(e.pageX - iCanvX1 - (oPadd.w/2), 0);
            oPadd.x = Math.min(ctx.canvas.width - oPadd.w, oPadd.x);
			var oBall;
			for(var i = 0; i < oBalls.objs.length; i++)
			{
				oBall = oBalls.objs[i];
	            if(oBall.onPadd == true)
	            {
		             oBall.x += oPadd.x - xBefore;
	            }
			}
        }
    });

    var iCanvX1 = $(canvas).offset().left;
    var iCanvX2 = iCanvX1 + width;
}


$(function(){
    document.getElementById("text1").onclick = function() //关卡1切换点击事件
	{
		document.getElementById("img-container1").style.display = "none";
		document.getElementById("insideDetail").style.display = "block";
		document.getElementsByClassName("img2")[0].src = "images/yi.jpg";
	    document.getElementsByClassName("img4")[0].src = "images/hai.jpg";
	    document.getElementsByClassName("img5")[0].src = "images/di1.jpg";
	    document.getElementsByClassName("img6")[0].src = "images/qi.jpg";
	    document.getElementsByClassName("img7")[0].src = "images/yu.jpg";
		initialization(1);
	}
	document.getElementById("text2").onclick = function() //关卡2切换点击事件
	{
		document.getElementById("img-container1").style.display = "none";
		document.getElementById("insideDetail").style.display = "block";
		document.getElementsByClassName("img2")[0].src = "images/er.jpg";
	    document.getElementsByClassName("img4")[0].src = "images/sen.jpg";
	    document.getElementsByClassName("img5")[0].src = "images/lin.jpg";
	    document.getElementsByClassName("img6")[0].src = "images/tan.jpg";
	    document.getElementsByClassName("img7")[0].src = "images/xian.jpg";
		initialization(2);
	}
	document.getElementById("text3").onclick = function() //关卡3切换点击事件
	{
		document.getElementById("img-container1").style.display = "none";
		document.getElementById("insideDetail").style.display = "block";
		document.getElementsByClassName("img2")[0].src = "images/san.jpg";
	    document.getElementsByClassName("img4")[0].src = "images/tian.jpg";
	    document.getElementsByClassName("img5")[0].src = "images/kong.jpg";
	    document.getElementsByClassName("img6")[0].src = "images/zhi.jpg";
	    document.getElementsByClassName("img7")[0].src = "images/cheng.jpg";
		initialization(3);
	}

});

    




