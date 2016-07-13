function judgeBallAndBricks()  //判断砖块和小球的碰撞，并处理与之相关的道具掉落和砖块破碎
{
	var oBall;   
	for(var i = 0; i < oBalls.objs.length; i++)
	{
        oBall = oBalls.objs[i];
        iRowH = oBricks.h + oBricks.p;
        iRow = Math.floor(oBall.y / iRowH);               //获取小球所在的砖块位置
        iCol = Math.floor(oBall.x / (oBricks.w + oBricks.p));       
        if (oBall.y < oBricks.r * iRowH && iRow >= 0 && iCol >= 0 && oBricks.objs[iRow][iCol].state == NORMAL)  //判断砖块是否与小球碰撞
		{
        	if(oBricks.objs[iRow][iCol].brickType == BRICKNORMAL)
        	{
                oBricks.objs[iRow][iCol].state = SMASHING;
		        if(oBricks.objs[iRow][iCol].toolType != NONE)
		        {
		    	    var toolTempt = new Tool();
		            toolTempt.loadTool(oBricks.objs[iRow][iCol].toolType,iRow,iCol);
		            oTools.objs.push(toolTempt);
		        }
		        if(!oPadd.breakThrough){
                    oBall.dy = -oBall.dy;
		        }
                iPoints++;
           }  
           else if(oBricks.objs[iRow][iCol].brickType == BRICKFOREVER)
           {
           	    oBall.dy = -oBall.dy;
           }
           aSounds[0].play(); 
        }
	}
}

function judgeBallAndBorders() //判断小球和边界和挡板的碰撞和与之相关的分裂和粘球效果
{
	var oBall;
	for(var i = 0; i < oBalls.objs.length; i++) //与左右边界碰撞
	{
		oBall = oBalls.objs[i];
	    if (oBall.x + oBall.dx + oBall.r > ctx.canvas.width || oBall.x + oBall.dx - oBall.r < 0) {
        oBall.dx = -oBall.dx;
    }
    if (oBall.y + oBall.dy - oBall.r < 0) //与上边界碰撞
	{
        oBall.dy = -oBall.dy;
    } 
	else if (oBall.y + oBall.dy + oBall.r > ctx.canvas.height - oPadd.h) //与挡板或下边界碰撞
	{
        if (oBall.x + oBall.r> oPadd.x && oBall.x - oBall.r < oPadd.x + oPadd.w) //与挡板碰撞
		{
			if(!oBall.onPadd)
			{
				aSounds[2].play();
			}
			if(oPadd.keepingFlag == 0)
			{
               oBall.dx = 10 * ((oBall.x-(oPadd.x+oPadd.w/2))/oPadd.w);
               oBall.dy = -oBall.dy;
			 if(oPadd.splitBall != 0)
			 {
				var oBall1 = new Ball(oBall.x, oBall.y, 0.5, -5, 15); 
				oBalls.objs[oBalls.objs.length] = oBall1;
				var oBall1 = new Ball(oBall.x, oBall.y, -oBall.dx, -5, 15); 
				oBalls.objs[oBalls.objs.length] = oBall1;
				oPadd.splitBall--;
				oPadd.removeSplit();
			 }
			}
             else
			 {
				oBall.dx = 0;
				oBall.dy = 0;
				oBall.onPadd = true;
			 }
        }
        else if (oBall.y + oBall.dy + oBall.r > ctx.canvas.height) //超出下边界
		{
			oBalls.objs.splice(i,1);
			if(oBalls.objs.length == 0) //没有球，游戏结束
			{
            clearInterval(iGameTimer);
			breakFlag = true;
			}
            localStorage.setItem('last-time', iMin + ':' + iSec);
            localStorage.setItem('last-points', iPoints);
            aSounds[1].play(); 
        }
    }
}
}

function judgeToolsAndBorders()//判断道具是否与挡板碰撞（被得到）
{
	for(var i =0; i < oTools.objs.length; i++) 
	{
		if(oTools.objs[i].starty + oTools.objs[i].height == ctx.canvas.height - oPadd.h || Math.abs(oTools.objs[i].starty + oTools.objs[i].height - (ctx.canvas.height - oPadd.h))<= 0.1)
		{
			 if (oTools.objs[i].startx + oTools.objs[i].width  > oPadd.x && oTools.objs[i].startx - oTools.objs[i].width < oPadd.x + oPadd.w) {
             oPadd.toolList[oPadd.toolList.length] = oTools.objs[i];
			 oTools.objs[i].apply(); 
			 oTools.objs.splice(i,1);
            }
		}
		else if(oTools.objs[i].starty + oTools.objs[i].height + 5> ctx.canvas.height - oPadd.h) //制造道具停留在挡板上的效果
		{
			if (oTools.objs[i].startx + oTools.objs[i].width > oPadd.x && oTools.objs[i].startx - oTools.objs[i].width < oPadd.x + oPadd.w)
			{
              oTools.objs[i].starty  = ctx.canvas.height - oPadd.h - oTools.objs[i].height - 5;
			}
			else if(oTools.objs[i].starty + oTools.objs[i].height > ctx.canvas.height)
			{
				oTools.objs.splice(i,1);	
			}
		}
	}
}

function updateToolState() //更新道具的计时状态，判断是否移除道具的效果
{
	for(var i =0; i < oPadd.toolList.length; i++)  
	{
		if(oPadd.toolList[i].lastTime > MAXLASTTIME)
		{
			oPadd.toolList[i].remove();
			oPadd.toolList.splice(i, 1);
		}
		else{
			oPadd.toolList[i].updateLastTime();
		}
	}
}


function MoveOnKey(direction) //挡板移动
{
	if (direction == 1)
	{
        oPadd.x += 5;
		var oBall;
		for(var i =0; i < oBalls.objs.length; i++)
		{
		   oBall = oBalls.objs[i];
	       if(oBall.onPadd == true)
	       {
		     oBall.x += 5;
	       }
		}
	}
    else if (direction == 0)
	{
        oPadd.x -= 5;
		var oBall;
		for(var i =0; i < oBalls.objs.length; i++)
		{
		   oBall = oBalls.objs[i];
		   if(oBall.onPadd == true)
	       {
		      oBall.x -= 5;
	       }
		}
	}
}

function BallsMove()//小球移动
{
	for(var i =0; i < oBalls.objs.length; i++)
	{
		oBalls.objs[i].x += oBalls.objs[i].dx;
		oBalls.objs[i].y += oBalls.objs[i].dy;
	}
}

function toolsMove() //道具移动
{
	for(var i =0; i < oTools.objs.length; i++)
	{
		oTools.objs[i].updatePos();
	}
}

function moveEvents() //总的每帧时的事件
{
	judgeBallAndBricks();
	judgeBallAndBorders();
    judgeToolsAndBorders();
	updateToolState();
	BallsMove();
	toolsMove();
    if (bRightBut && !rightButCommit) //监听持续按下的上键或下键
	{
       MoveOnKey(1);
	}
	else if(rightButCommit) 
	{
		rightButCommit = false;
	}
    if (bLeftBut && !leftButCommit)
	{
        MoveOnKey(0);
	}
	else if(leftButCommit)
	{
		leftButCommit = false;
	}
}