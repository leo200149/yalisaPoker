var canvas = document.getElementById("main")
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WIDTH=250;
const HEIGHT=400;
const CARD_WIDTH = canvas.width;
const CARD_HEIGHT = canvas.height;
const FONT_SIZE_RATE = canvas.height/HEIGHT;
const POSITION = 0;



function Card(num,color,name,desc){
	return {
  	num:num,
    name:name,
    desc:desc,
    color:color,
  }
}


const card_define = {
	0:new Card(0,"brown","喝酒遊戲","陪酒小姐 阿亞/麗欣特別版！ 點擊即可開始遊戲"),
	1:new Card(1,"orange","我愛阿亞","可指定一個玩家喊我愛阿亞，並喝掉1杯酒"),
  2:new Card(2,"red","陪酒小姐","當場上有人喝酒就要跟著一起喝，直到下一位抽到「2」的人"),
  3:new Card(3,"orange","逛三園","果園、菜園、動物園，tempo遊戲，抓miss/重複的人喝1杯酒"),
  4:new Card(4,"orange","照相機","可在任意時使用1次，當喊出照相機，所有人都不能動，抓最慢或第一個動的人喝1杯酒"),
  5:new Card(5,"orange","摸鼻子","可在任意時使用1次，當摸鼻子，所有人都要跟著摸，抓最慢的人喝1杯酒"),
  6:new Card(6,"green","跳過","這回安心啦，沒有事情發生"),
  7:new Card(7,"orange","單挑牌","找阿亞/麗欣單挑任意遊戲，輸的人喝1杯酒"),
  8:new Card(8,"gold","尿尿牌","遊戲開始後，全部人就不能上廁所了，只有拿到尿尿牌的人可以去1次。"),
  9:new Card(9,"red","我愛麗欣","喊出我愛麗欣後，自己喝1杯酒"),
  10:new Card(10,"gray","神經病","需宣告「我是神經病」完成後，其他人不能跟神經病互動，抓第一個互動的人喝掉1杯酒"),
  11:new Card(11,"red","上家喝","上家喝1杯酒"),
  12:new Card(12,"gold","王牌特務","阿亞/麗欣可以指定你幫他們做1件事。"),
  13:new Card(13,"red","下家喝","下家喝1杯酒"),
	14:new Card(0,"brown","遊戲結束","點擊後重新開始。"),
}

function shuffle(arr){
    let n = arr.length, random;
    while(0!=n){
        random =  (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
        [arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
    }
    return arr;
}

function clear(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
}
function paintCard(card,point){
	ctx.beginPath();
  ctx.rect(0,0,CARD_WIDTH,CARD_HEIGHT);
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.fillStyle = card.color;
  ctx.font =  (150 *FONT_SIZE_RATE)+"px Arial";
  ctx.fillText(card.num, CARD_WIDTH/2, CARD_HEIGHT/3);
  ctx.font = (50 *FONT_SIZE_RATE)+"px Arial";
  ctx.fillText(card.name, CARD_WIDTH/2, CARD_HEIGHT/3+(80 *FONT_SIZE_RATE));
 	canvasTextAutoLine(card.desc,canvas, CARD_WIDTH/2, CARD_HEIGHT/3+(140 *FONT_SIZE_RATE),(30 *FONT_SIZE_RATE));
}

function canvasTextAutoLine(str,canvas,initX,initY,lineHeight){
    var ctx = canvas.getContext("2d"); 
 		 ctx.font = (12 *FONT_SIZE_RATE)+"px Arial";
    var lineWidth = 0;
    var canvasWidth = CARD_WIDTH; 
    var lastSubStrIndex= 0; 
    for(let i=0;i<str.length;i++){ 
        lineWidth+=ctx.measureText(str[i]).width; 
        if(lineWidth>canvasWidth-initX){//減去initX,防止邊界出現的問題
            ctx.fillText(str.substring(lastSubStrIndex,i),initX,initY);
            initY+=lineHeight;
            lineWidth=0;
            lastSubStrIndex=i;
        } 
        if(i==str.length-1){
            ctx.fillText(str.substring(lastSubStrIndex,i+1),initX,initY);
        }
    }
  }

let cards = [];

function initCards(){
	cards = [];
  for(let i=1;i<=13;i++){
    for(let j=0;j<4;j++){
      cards.push(i);
    }
  }
  cards = shuffle(cards);
  cards.push(0);
  cards.shift(14);
}
function initEvent(){
	canvas.addEventListener('click', function() {
  	clear();
		paintCard(card_define[cards.pop()]);
    if(cards.length==0){
    	initCards();
    }
  }, false);
}
initCards();
initEvent();
paintCard(card_define[cards.pop()]);
