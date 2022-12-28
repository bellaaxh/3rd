var face_x = [] 
var face_y = []
var face_size = []
var face_num = 10
var song
var songIsplay=false //設定此變數為"假"(false)，收到按下滑鼠把變數改為真，音樂開始播放
var amp
var vol
var music_btn_pressed
var mouse_btn_pressed
var Speech_btn_pressed
var camera_btn_pressed
var music_btn,mouse_btn,Speech_btn,camera_btn
var myRec = new p5.SpeechRec();
var result
//+++++++++++++++++++++++++++++++++++++++++++++++++++
let handpose;
let video;  //攝影機取得影像，放影像資料
let predictions = [];  //記錄所有手勢21點所有資料
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d  //後面變數名稱有8代表食指最上端，4代表大拇指最上端，大寫的X、Y、Z手指所在的座標，d代表為4與8的距離(只有取xy軸)
let pointerX14,pointerY14,pointerX16,pointerY16  //用四個變數紀錄第14點(pointerX14,pointerY14)，16點的X、Y(pointerX16,pointerY16)
//+++++++++++++++++++++++++++++++++++++++++++++++++++
function preload(){
  song = loadSound("Tsum Tsum .mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  //第一個按鈕
  music_btn = createButton("播音樂")
  music_btn.position(50,30)
  music_btn.size(150, 70);
  music_btn.style('background-color', '#cad2c5');
  music_btn.style('font-size', '24px');
  music_btn.style('color', '#282E1E');
  music_btn.mousePressed(music_btn_pressed) //music_btn被按下時，要到music_btn_pressed函數下執行
  //第二個按鈕
  mouse_btn = createButton("暫停音樂")
  mouse_btn.position(250,30)
  mouse_btn.size(150, 70);
  mouse_btn.style('background-color', '#cad2c5');
  mouse_btn.style('font-size', '24px');
  mouse_btn.style('color', '#282E1E');
  mouse_btn.mousePressed(mouse_btn_pressed)
  //第三個按鈕
  Speech_btn = createButton("語音辨識(播音樂/不要播)")
  Speech_btn.position(450,30)
  Speech_btn.size(150, 70);
  Speech_btn.style('background-color', '#cad2c5');
  Speech_btn.style('font-size', '20px');
  Speech_btn.style('color','#282E1E');
  Speech_btn.mousePressed(Speech_btn_pressed)
  //第四個按鈕
  camera_btn = createButton("相機")
  camera_btn.position(650,30)
  camera_btn.size(150, 70);
  camera_btn.style('background-color', '#cad2c5');
  camera_btn.style('font-size', '24px');
  camera_btn.style('color', '#282E1E');
  camera_btn.mousePressed(camera_btn_pressed)
  face_num = 5

  for(var i=0;i<face_num;i++){
    face_size[i] = random(100,200)  //臉的大小100~300
    face_x[i] = random(0,width)
    face_y[i] = random(0,height)
  }

 //+++++++++++++取得攝影機影像並連線手勢辨識++++++++++++++++++
  video = createCapture(VIDEO);  //取得攝影機的影像，影像的畫面存到video
  video.size(width, height);  //影像的大小為整個視窗大小

  handpose = ml5.handpose(video, modelReady);  //把video影像執行手德的辨識，執行辨識完畢會去執行modelReady funtion

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
      predictions = results;  //手勢辨識後的結果放到predictions變數內
  });

  // Hide the video element, and just show the canvas
  video.hide();  //隱藏video
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++
}

function modelReady() {
  console.log("Model ready!");
}

  function music_btn_pressed(){
    song.play()
    songIsplay = true
    amp=new p5.Amplitude()  
    music_btn.style('background-color', '#606F49');
    mouse_btn.style('background-color', '#cad2c5');
    Speech_btn.style('background-color', '#cad2c5');
    camera_btn.style('background-color', '#cad2c5');

  }

  function mouse_btn_pressed(){
    song.pause()
    songIsplay = false
    music_btn.style('background-color', '#cad2c5');
    mouse_btn.style('background-color', '#606F49');
    Speech_btn.style('background-color', '#cad2c5');
    camera_btn.style('background-color', '#cad2c5');
  }

  function Speech_btn_pressed(){
    music_btn.style('background-color', '#cad2c5');
    mouse_btn.style('background-color', '#cad2c5');
    Speech_btn.style('background-color', '#606F49');
    camera_btn.style('background-color', '#cad2c5');
    myRec.onResult =showResult;
    myRec.start();
  }

  function camera_btn_pressed(){
    music_btn.style('background-color', '#cad2c5');
    mouse_btn.style('background-color', '#cad2c5');
    Speech_btn.style('background-color', '#cad2c5');
    camera_btn.style('background-color', '#606F49');
  }
  function showResult()
  {
  if(myRec.resultValue==true) {
      result = myRec.resultString
        if(myRec.resultString==="播音樂")
            {
              music_btn_pressed()
            }
        if(myRec.resultString==="不要播")
            {

              mouse_btn_pressed()
            }
  }
  }
// function drawface(){
//   for(var j=0;j<face_num;j++){
//     push()  
//       var f_s = face_size[j]
//       translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
//       //腳
//       fill(255)
//       noStroke()
//       ellipse(-f_s/3.6,f_s/2.2,f_s/8) //左腳
//       ellipse(f_s/3.6,f_s/2.2,f_s/8) //右腳
//       //臉的部分
//       fill(0)
//       noStroke()
//       ellipse(0,0,f_s) //臉
//       //膚色部分
//       noStroke()
//       fill("#FFE8D6")
//       ellipse(-f_s/10,f_s/15,f_s/2,f_s/1.5) //左膚色臉
//       ellipse(f_s/10,f_s/15,f_s/2,f_s/1.5) //右膚色臉
//       fill("#FFE8D6")
//       ellipse(-f_s/160,f_s/4,f_s/1.2,f_s/2) //下膚色臉
//       //耳朵部分
//       fill(0)
//       noStroke()
//       ellipse(-f_s/1.8,-f_s/2.5,f_s/1.8) //左耳朵
//       ellipse(f_s/1.8,-f_s/2.5,f_s/1.8) //右耳朵
//       //鼻子部分
//       stroke(0)
//       fill(0)
//       ellipse(f_s/90,f_s/4,f_s/6,f_s/10) //鼻子橢圓
//       //腮紅部分
//       noStroke()
//       fill("#FFCDB2")
//       ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
//       ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅

//       //左眼
//       fill(0)
//       stroke(0)
//       ellipse(-f_s/9+map(mouseX,0,width,-f_s/100,f_s/40),-f_s/60+map(mouseY,0,height,-f_s/60,f_s/60),f_s/12,f_s/8)
//       //右眼
//       fill(0)
//       ellipse(f_s/9+map(mouseX,0,width,-f_s/100,f_s/40),-f_s/60+map(mouseY,0,height,-f_s/60,f_s/60),f_s/12,f_s/8)
      

//       if(!songIsplay){
//         fill("#FFCDB2")
//         noStroke()
//         ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
//         ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅 //沒有播放
//       }
//       else{
//         if(!songIsplay){
//           fill("#FFCDB2")
//           noStroke()
//           ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
//           ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅
//       }
//         vol = amp.getLevel() //取得聲音值(值為0~1之間)
//         // console.log(vol) //網頁中console數字
//         fill("#E5989B")
//         noStroke()
//         ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
//         ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅 
//       }
    
    

//       noFill()
//     pop()

//   }
// }
function draw() {
  //攝影機反向
  translate(width, 0);
  scale(-1, 1);
  //+++++++++
  background(255);
  image(video,0,0,width,height);
  drawKeypoints(); //取得手指位置
    
  d= dist(pointerX8,pointerY8,pointerX4,pointerY4)

  for(var j=0;j<face_num;j++){
    push()  
      var f_s = face_size[j]
      translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
      //腳
      fill(255)
      noStroke()
      ellipse(-f_s/3.6,f_s/2.2,f_s/8) //左腳
      ellipse(f_s/3.6,f_s/2.2,f_s/8) //右腳
      //臉的部分
      fill(0)
      noStroke()
      ellipse(0,0,f_s) //臉
      //膚色部分
      noStroke()
      fill("#FFE8D6")
      ellipse(-f_s/10,f_s/15,f_s/2,f_s/1.5) //左膚色臉
      ellipse(f_s/10,f_s/15,f_s/2,f_s/1.5) //右膚色臉
      fill("#FFE8D6")
      ellipse(-f_s/160,f_s/4,f_s/1.2,f_s/2) //下膚色臉
      //耳朵部分
      fill(0)
      noStroke()
      ellipse(-f_s/1.8,-f_s/2.5,f_s/1.8) //左耳朵
      ellipse(f_s/1.8,-f_s/2.5,f_s/1.8) //右耳朵
      //鼻子部分
      stroke(0)
      fill(0)
      ellipse(f_s/90,f_s/4,f_s/6,f_s/10) //鼻子橢圓
      //腮紅部分
      noStroke()
      fill("#FFCDB2")
      ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
      ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅

      //左眼
      fill(0)
      stroke(0)
      ellipse(-f_s/9+map(mouseX,0,width,-f_s/100,f_s/40),-f_s/60+map(mouseY,0,height,-f_s/60,f_s/60),f_s/12,f_s/8)
      //右眼
      fill(0)
      ellipse(f_s/9+map(mouseX,0,width,-f_s/100,f_s/40),-f_s/60+map(mouseY,0,height,-f_s/60,f_s/60),f_s/12,f_s/8)
      

      if(!songIsplay){
        fill("#FFCDB2")
        noStroke()
        ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
        ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅 //沒有播放
      }
      else{
        if(!songIsplay){
          fill("#FFCDB2")
          noStroke()
          ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
          ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅
      }
        vol = amp.getLevel() //取得聲音值(值為0~1之間)
        // console.log(vol) //網頁中console數字
        fill("#E5989B")
        noStroke()
        ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
        ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅 
      }
    
    

      noFill()
    pop()

  }
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      // noStroke();
      if (j == 8) {				//食指的上端
				pointerX8 = map(keypoint[0],0,640,0,width)  //j=8所以取得第8點的資訊，keypoint{0}代表x(食指座標)
				pointerY8 = map(keypoint[1],0,480,0,height) //keypoint{1}代表y(食指座標)
        pointerZ8 = keypoint[2]//keypoint{2}代表z(食指座標)
        console.log(pointerZ8)
        // if(pointerZ8<-40)
        // {
        //   R_draw(pointerX8,pointerY8)
        // }
				ellipse(pointerX8, pointerY8, 30, 30); //畫食指圓圈
      } else
      if (j == 4) {     //大拇指上端
		fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
        ellipse(pointerX4, pointerY4, 30, 30); //畫大拇指圓圈
		
      } else
      if (j == 14) {   //無名指的第3個關節
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) {   //無名指上端
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}