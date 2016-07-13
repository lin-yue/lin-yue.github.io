
//球对象
function Ball(x, y, dx, dy, r) 
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
	this.onPadd = false;
}

function Balls()           //球数组
{
	this.objs = null;
}

Balls.prototype.init = function() //数组初始化
{
	this.objs = new Array();
}

Ball.prototype.draw = function() //小球绘制
{
	ctx.beginPath();
    var grd = ctx.createRadialGradient(this.x,this.y,this.r/6, this.x,this.y,this.r);  //定义放射状渐变对象
    grd.addColorStop(0,"yellow");   
    grd.addColorStop(0.5,"blue");   
    grd.addColorStop(1,"rgba(255,0,0,0)");  
    ctx.fillStyle = grd;  
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}


//挡板对象
function Padd(x, w, h, img)
{
    this.x = x;
    this.w = w;
    this.h = h;
    this.img = img;
	this.toolList = null;
	this.keepingFlag = 0;
	this.breakThrough = 0;
    this.splitBall = 0;
}

Padd.prototype.removeSplit = function()  //当进行一次分裂后取消分裂状态
{
	var max = -1;
	var maxTime = -1;
	for(var i =0; i < this.toolList.length; i++)
	{
		if(this.toolList[i].type == SPLIT && this.toolList[i].lastTime > maxTime)
		{
			maxTime = this.toolList[i].lastTime;
			max = i;
		}
	}
	this.toolList.splice(max,1);
}

Padd.prototype.init = function()//挡板初始化
{
	this.toolList = new Array();
}

Padd.prototype.draw = function()//挡板绘制
{
	ctx.drawImage(this.img, this.x, ctx.canvas.height - this.h,this.w,this.h);
}

