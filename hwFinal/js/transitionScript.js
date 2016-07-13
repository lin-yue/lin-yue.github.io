function transition(stage)
{
	switch(stage)
	{
		case 2:
	document.getElementById("insideDetail").style.display = "none";
	document.getElementById('img-container1').style.display = "block";
    document.getElementById("text1").style.color = "grey";
	 document.getElementById("text1").style.cursor= "text";
	document.getElementById("text1").onclick = null;
	document.getElementById("text2").style.color="black";
	document.getElementById("text2").onmouseover = function()
	{
		document.getElementById("text2").style.color = "rgb(44,156,192)";
		document.getElementById("text2").style.cursor = "pointer";
	}
	document.getElementById("text2").onmouseout = function()
	{
		document.getElementById("text2").style.color = "black";
		document.getElementById("text2").style.cursor = "text";		
	}
	document.getElementById("text2").onclick = function()
	{
		document.getElementById("img-container1").style.display = "none";
		document.getElementById("insideDetail").style.display = "block";
		initialization(stage);
	};
	document.getElementsByClassName("img2")[0].src = "images/er.jpg";
	document.getElementsByClassName("img4")[0].src = "images/sen.jpg";
	document.getElementsByClassName("img5")[0].src = "images/lin.jpg";
	document.getElementsByClassName("img6")[0].src = "images/tan.jpg";
	document.getElementsByClassName("img7")[0].src = "images/xian.jpg";
	break;
	  case 3:
	document.getElementById("insideDetail").style.display = "none";
    document.getElementById("text2").onmouseover = null;
	document.getElementById("text2").onmouseout = null;
	document.getElementById('img-container1').style.display = "block";
    document.getElementById("text2").style.color = "grey";
	 document.getElementById("text2").style.cursor= "text";
	document.getElementById("text2").onclick = null;
	document.getElementById("text3").style.color="black";
	document.getElementById("text3").onmouseover = function()
	{
		document.getElementById("text3").style.color = "rgb(44,156,192)";
		document.getElementById("text3").style.cursor = "pointer";
	}
	document.getElementById("text3").onmouseout = function()
	{
		document.getElementById("text3").style.color = "black";
		document.getElementById("text3").style.cursor = "text";		
	}
	document.getElementById("text3").onclick = function()
	{
		document.getElementById("img-container1").style.display = "none";
		document.getElementById("insideDetail").style.display = "block";
		initialization(stage);
	};
	document.getElementsByClassName("img2")[0].src = "images/san.jpg";
	document.getElementsByClassName("img4")[0].src = "images/tian.jpg";
	document.getElementsByClassName("img5")[0].src = "images/kong.jpg";
	document.getElementsByClassName("img6")[0].src = "images/zhi.jpg";
	document.getElementsByClassName("img7")[0].src = "images/cheng.jpg";
	break;
	}
}