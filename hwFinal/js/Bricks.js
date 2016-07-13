
//砖块对象
function Bricks(w, h, r, c, p) {
    this.w = w;
    this.h = h;
    this.r = r; // 行数
    this.c = c; // 列数
    this.p = p; // padding
    this.objs;
    this.colors = ['#9d9d9d', '#f80207', '#feff01', '#0072ff', '#fc01fc', '#03fe03']; 	
}

//小砖块块，用于砖块破裂
function Tile(){
	this.originX = 0;
	this.originY = 0;
	this.currentX = 0;
	this.currentY = 0;
	this.force = 0;
	this.z = 0;
	this.moveX= 0;
	this.moveY= 0;
}

function Brick(){   //构造函数
	this.state = NONE;
	this.tiles = null;
	this.color =  0;
	this.startx = 0;
	this.starty = 0;
	this.smashTimeCount = 0;
	this.toolType = 0;
	this.brickType = 0;
}

Brick.prototype.init=function(i,j,color,tool,type)//初始化砖块
{
	this.state = NORMAL;
	this.color = color;
	this.startx = j * (oBricks.w + oBricks.p) + oBricks.p;
	this.starty = i * (oBricks.h + oBricks.p) + oBricks.p;
	this.toolType = tool;
	this.brickType = type;
	if(type == BRICKNORMAL)
	{
	totalBricks++;
	}
}

Brick.prototype.createTiles = function(startx,xwidth, starty, yheight) //产生用于破碎的块
{
   this.tiles = new Array();
	var y=0;
	while(y < yheight)
	{
		var x=0;
		while(x <xwidth)
		{
			var tile = new Tile();
			tile.originX = 1+startx+x;
			tile.originY = 1+starty+y;
			tile.currentX = tile.originX;
			tile.currentY = tile.originY;
			this.tiles.push(tile);
			x+=2;
		}
		y+=2;
	}
}
Brick.prototype.smash = function(x, y){      //设定粉碎参数
	for(var i=0; i<this.tiles.length; i++)
	{

		var tile = this.tiles[i];
		
		var xdiff = tile.currentX-x;
		var ydiff = tile.currentY-y;
		var dist = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
		
		var force = Math.random();

			tile.force = force;
			var radians = Math.atan2(ydiff, xdiff);
			tile.moveX =  4 * xdiff / 40;
			tile.moveY =  4 * ydiff / 20;

	}
}
Brick.prototype.smashInit = function()   //对粉碎的过程初始化
{ 
	this.createTiles(this.startx,oBricks.w,this.starty,oBricks.h);
    this.smash(this.startx + oBricks.w / 2,this.starty + oBricks.h / 2);
    this.smashTimeCount = 0;
}

Brick.prototype.smashing = function(startx,xwidth, starty, yheight) //粉碎过程中不断调用
{

	ctx.clearRect(startx, starty, xwidth, yheight);	
	for(var i=0; i<this.tiles.length; i++)
	{
	    var tile = this.tiles[i];
		if(tile.force > 0.001)
		{
			tile.currentX += tile.moveX;
			tile.currentY += tile.moveY;
			tile.moveX *=  tile.force;
			tile.moveY *=  tile.force;
            tile.force *= 0.999;
			if(tile.currentX <= startx || tile.currentX >= startx + xwidth)
			{
				tile.force = 0;
			}
			else if(tile.currentY <= starty || tile.currentY >= starty + yheight)
			{
				tile.force = 0;
			}
		}
		else
		{
			tile.force = 0;
		}
		 ctx.fillStyle = this.color;
        ctx.fillRect(tile.currentX - 1, tile.currentY - 1, 2, 2);
	}
		this.smashTimeCount++;
}

Brick.prototype.smashEnd = function() //粉碎结束
{ 
	for(var i =0; i<this.tiles.length; i++)
	{
		delete this.tiles[i];
	}
	delete this.tiles;
    this.state = NONE;
	this.tiles = null;
	this.smashTimeCount = 0;	
}


Brick.prototype.draw = function()
{
	    ctx.shadowColor = this.color; 
        ctx.shadowOffsetX = 1.5;   
        ctx.shadowOffsetY = 1.5;   
        ctx.shadowBlur = 1;   
        ctx.fillStyle = oBricks.objs[i][j].color;
        if (this.state == NORMAL) 
		{
           ctx.beginPath();
           ctx.roundRect((j * (oBricks.w + oBricks.p)) + oBricks.p, (i * (oBricks.h + oBricks.p)) + oBricks.p, oBricks.w, oBricks.h, 7); //绘制圆角矩形
           ctx.closePath();
           ctx.fill();
        }
			
	    else if(this.state==SMASHING)
		{
		   if(this.smashTimeCount == 0)
		   {
			   this.smashInit();
		   }
		   if(this.smashTimeCount <= 10)
		   {
			  this.smashing(oBricks.objs[i][j].startx - oBricks.p,oBricks.w + 2 * oBricks.p ,oBricks.objs[i][j].starty - oBricks.p, oBricks.h + 2 * oBricks.p) ;
			  if(oBricks.objs[i][j].smashTimeCount == 8)
			  {
				 totalBricks--;   //表示砖块消失
				 if(totalBricks == 0)
				 {
					clearFlag = true;
				 }
			  }
			}
			else
			{
				oBricks.objs[i][j].smashEnd();
			}
        }
}
