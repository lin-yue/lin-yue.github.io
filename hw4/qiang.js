
var removeFlag;
var hasAdmin = false;
var timer = null;
socket = io.connect('https://wall.cgcgbcbc.com/'); 
 
var handleText = function()   //使文本内容过长时滚动
{
	
	if(arguments[0].length > 40)
	{
		var tempt1 = "<span class='contentBlank'></span>";
		arguments[1].innerHTML = tempt1;
		arguments[1].innerHTML += arguments[0];
		arguments[1].innerHTML += tempt1;
		arguments[1].innerHTML += arguments[0];
		var temptArgument = arguments[1];
		setTimeout(function () {
		var clientWidth = window.innerWidth||document.documentElement.clientWidth;
		var content = temptArgument;
		var before = content.scrollLeft;
            content.scrollLeft += 1;
			if(before == content.scrollLeft)
			{
			content.scrollLeft = (content.scrollLeft + 0.72 * 0.94 *clientWidth)/2 - 0.72 * 0.94 * clientWidth;
			}			
            setTimeout(arguments.callee, 6);
        }, 6);	
	}
	else
	{
		arguments[1].innerHTML = arguments[0];
	}
}


window.onload=function()
{
	
	
	setTimeout(function () //让公告可以滚动
	{
		var clientWidth = window.innerWidth||document.documentElement.clientWidth;
		var topBar = document.getElementById("topBar");
		var before = topBar.scrollLeft;
            topBar.scrollLeft += 1;
			if(before == topBar.scrollLeft)
			{
			topBar.scrollLeft = (topBar.scrollLeft + clientWidth)/2 - clientWidth;
			}			
            setTimeout(arguments.callee, 6);
        }, 6);	
		
		
	var topBar = document.getElementById("topBar");                      //用js调整图像的大小使高度等于宽度和单行文本居中（设置line-height)
	var imgList = document.getElementsByClassName("img");
	var imgList1 = document.getElementsByClassName("imgInside");
	var nameList = document.getElementsByClassName("name");
	var contentList = document.getElementsByClassName("text");
	var clientWidth = window.innerWidth||document.documentElement.clientWidth;               
    var clientHight = window.innerHeight||document.documentElement.clientHight;
	var dialogs = document.getElementsByClassName('dialog');
	topBar.style.lineHeight = String(0.1 * clientHight)+"px";
	for(var i =0; i < imgList.length; i++)
	{
		imgList[i].style.height = String(0.1 * clientWidth)+"px";
		nameList[i].style.top = String((0.22 * clientHight - 0.1 * clientWidth) / 2 + 0.1 * clientWidth + 6)+"px";
		imgList[i].style.top = String((0.22 * clientHight - 0.1 * clientWidth) / 2)+"px";
		contentList[i].style.lineHeight = String(0.48*0.22*clientWidth)+"px";
	}
	dialogs[0].style.top="13%";
	dialogs[1].style.top="41%";
	dialogs[2].style.top="69%";
	
	
	$.get('https://wall.cgcgbcbc.com/api/messages?num=3', function(msg)  //加载历史信息
	      {
		      for(var i = 0; i < msg.length; i++)
			  {
				  nameList[i].innerHTML = msg[2 - i].nickname;
				  imgList1[i].setAttribute("src", msg[2 - i].headimgurl);
			      handleText(msg[2 - i].content,contentList[i]);
			  }
	      });
	

	
             socket.on('new message', function(msg) //处理新消息事件
             {
				 var dialogList = document.getElementsByClassName('dialog');  //更换内容
                     for(var j =0; j < 3; j++)
					 {
						
							if(dialogList[j].style.top == "13%")
							{
								var tempt1 = dialogList[j].getElementsByClassName('imgInside');
								tempt1[0].setAttribute("src", msg.headimgurl);
								var tempt2 = dialogList[j].getElementsByClassName('name');
								tempt2[0].innerHTML =  msg.nickname;
								var tempt3 = dialogList[j].getElementsByClassName('text');
								handleText(msg.content,tempt3[0]);
							}
					 }
				 
				 
				 
	             function endHandler1() {                            //设置动画结束的处理事件
					 if(!removeFlag)
					 {
					 var animator1 = document.getElementsByClassName('dialog');
                     for(var j =0; j < 3; j++)
					 {
						animator1[j].className = 'dialog';
					    animator1[j].removeEventListener('animationend', endHandler1);
						switch(animator1[j].style.top)
						{
							case "13%":
							animator1[j].style.top = "69%";
							break;
							case "41%":
							animator1[j].style.top = "13%";
							if(!hasAdmin)
							{
								animator1[j].style.visibility = "visible";
							}
							if(hasAdmin)
							{
								animator1[j].style.visibility = "hidden";
							}
							break;
							case "69%":
							animator1[j].style.top = "41%";
							break;						
						}
					 }
					 }
					 removeFlag = true;
				 }
				

				
			 removeFlag = false;
			 var animator = document.getElementsByClassName('dialog');  //设置动画效果
			 for(var i =0; i < 3; i++)
			 {
			 switch(animator[i].style.top)
			 {
				 case "13%":
				 animator[i].className='dialog animate1';
                animator[i].addEventListener('animationend', endHandler1);
				 animator[i].style.visibility = "visible";

				break;
				case "41%":

				animator[i].className='dialog animate2';
                animator[i].addEventListener('animationend', endHandler1);

				if(hasAdmin)
				{
					animator[i].style.visibility = "hidden";
				}

				break;
				case "69%":
				animator[i].className='dialog animate3';
                animator[i].addEventListener('animationend', endHandler1);

				break;
			 }
			 }
			 
             });
			 
			 
			 
			 socket.on('admin', function(msg)       //处理管理员消息事件
			 {
				 clearInterval(timer);
				 hasAdmin = true;
				 var admin1 = document.getElementById('admin1');         //更换内容
				 var tempt2 = admin1.getElementsByClassName('name');
				 tempt2[0].innerHTML =  msg.nickname;
				 var tempt3 = admin1.getElementsByClassName('text');
				 handleText(msg.content,tempt3[0]);
				 
				 
				 function endHandler2() {                               //设置动画结束的处理事件

					 var animator1 = document.getElementById('admin1');

					 animator1.className = 'adminDialog';
					 animator1.removeEventListener('animationend', endHandler2);
					 animator1.style.left = "0%";
	
					 }
					 
			     var animator = document.getElementsByClassName('dialog');
			     for(var i =0; i < 3; i++)
			     {
			       if(animator[i].style.top == "13%")
			       {
				     animator[i].style.visibility = "hidden";
			       }
			     }
	
			     admin1.className='adminDialog animate4';           //设置动画
                 admin1.addEventListener('animationend', endHandler2);
			
			
			     var leave = function()            //设置离开的动画
			     {
				   clearInterval(timer);
				   var admin2 = document.getElementById('admin1');
				   function endHandler3() {                          //设置动画结束的处理事件      
					 var animator1 = document.getElementById('admin1');
					 animator1.className = 'adminDialog';
					 animator1.removeEventListener('animationend', endHandler3);
					 animator1.style.left = "100%";	
					 var animator = document.getElementsByClassName('dialog');
					 for(var i =0; i < 3; i++)
			         {
			            if(animator[i].style.top == "13%")
			            {
				           animator[i].style.visibility = "visible";
			            }
			         }
				     hasAdmin = false;
					 }
			       admin1.className='adminDialog animate5';
                   admin1.addEventListener('animationend', endHandler3);
			     }	
				 
				 timer = setInterval(leave,10000);  //设定离开时间
			 });
}


