
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) //绘制圆角矩形
{
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.closePath();
    return this;
}

function clear()  //清除画板
{ 
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawBackground() //绘制背景
{
    var bgImg = new Image();
	switch(stages)
	{
		case 1:
              bgImg.src = "../images/haiyang.jpg";
			  break;
	    case 2:
		      bgImg.src = "images/senlin.jpg";
			  break;
	    case 3:
		     bgImg.src = "images/xingkong.jpg";
			  break;
	}
    ctx.drawImage(bgImg, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawBricks()//绘制砖块
{
	for (i=0; i < oBricks.r; i++)
	{
		 for (j=0; j < oBricks.c; j++)
		 {
			 oBricks.objs[i][j].draw();
		 }
	}
}

function drawPadd()//绘制挡板
{
	oPadd.draw();
}

function drawBalls()//绘制小球
{
	for(var i =0; i < oBalls.objs.length; i++)
	{
		oBalls.objs[i].draw();
	}
}

function drawTools()//绘制道具
{
	for(var i =0; i < oTools.objs.length; i++)
	{
		oTools.objs[i].draw();
	}
}

function drawPlayState()//绘制游戏信息
{
	ctx.font = '16px Verdana';
    ctx.fillStyle = '#fff';
    iMin = Math.floor(iElapsed / 60);
    iSec = iElapsed % 60;
    if (iMin < 10) iMin = "0" + iMin;
    if (iSec < 10) iSec = "0" + iSec;
    ctx.fillText('Time: ' + iMin + ':' + iSec, 600, 520);
    ctx.fillText('Points: ' + iPoints, 600, 550);

    if (sLastTime != null && sLastPoints != null) 
	{
        ctx.fillText('Last Time: ' + sLastTime, 600, 460);
        ctx.fillText('Last Points: ' + sLastPoints, 600, 490);
    }
}


function drawScene()//总的绘制过程
{
	clear(); 
    drawBackground();
    console.log(oBalls.objs[0].x);
    console.log(oBalls.objs[0].y);
	drawBricks();
	drawBalls();
    drawPadd();
    drawTools();
    drawPlayState();
}