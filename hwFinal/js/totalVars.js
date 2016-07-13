
var canvas, ctx;                     //画布
var iStart = 0;                
var bRightBut = false;         
var bLeftBut = false;          
var leftButCommit =true;
var rightButCommit = true;
var  oBalls, oPadd, oBricks,oTools   //小球、挡板、砖块、道具
var aSounds = [];                    //音乐
var iPoints = 0;                     //分数
var iGameTimer;
var iElapsed = iMin = iSec = 0;      //时间信息
var sLastTime, sLastPoints;          //上次时间和分数
var totalBricks = 0;                 //剩余砖块数
var clearFlag = false;               //是否清除所有砖块
var breakFlag = false;               //游戏失败
var stages = 1;                      //关卡


//砖块
var SMASHING = 2;       //破碎
var NORMAL = 1;         //正常
var NONE = 0;           //消失


//道具
var NONE = 0;         //没有
var KEEP = 1;         //粘球
var BREAKTHROUGH = 2; //穿透
var SPLIT = 3;        //分裂
var LONGER = 4;       //变长


//砖块样式
var BRICKNORMAL = 1;
var BRICKFOREVER = 2;
var MAXLASTTIME = 100*5; //道具最长持续时间