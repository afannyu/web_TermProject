// 获取当前时间
const day = document.querySelector(".day")
const month_ch = document.querySelector(".month_ch")
const year = document.querySelector(".year")
const month = document.querySelector(".month")
let monthArray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug",
"Sep","Oct","Nov","Dec")

let date = new Date()
day.innerHTML = date.getDate()
month_ch.innerHTML = date.getMonth()+1
year.innerHTML = date.getFullYear()
month.innerHTML = monthArray[date.getMonth()]

// 切换菜单时字体样式发生变化
const menu = document.querySelectorAll(".m-menu> a")
const block = document.querySelectorAll(".block")

menu.forEach((item,i)=>{
  menu[i].addEventListener('click',()=>{
    menu.forEach((item,j)=>{
      menu[j].classList.remove("sel")
      block[j].classList.remove("ael")
    })
    menu[i].classList.add("sel")
    block[i].classList.add("ael")
  })
})

// 实时股市变化 走马灯
function marquee(i, direction) {
  var obj = document.getElementById("marquee" + i);
  var obj1 = document.getElementById("marquee" + i + "_1");
  var obj2 = document.getElementById("marquee" + i + "_2");
  if (direction == "up") {
    if (obj2.offsetTop - obj.scrollTop <= 0) {
      obj.scrollTop -= (obj1.offsetHeight + 20);
    } else {
      var tmp = obj.scrollTop;
      obj.scrollTop++;
      if (obj.scrollTop == tmp) {
        obj.scrollTop = 1;
      }
    }
  } else {
    if (obj.scrollLeft <= 0) {
      obj.scrollLeft += obj2.offsetWidth;
    } else {
      obj.scrollLeft--;
    }
  }
}

function marqueeStart(i, direction) {
  var obj = document.getElementById("marquee" + i);
  var obj1 = document.getElementById("marquee" + i + "_1");
  var obj2 = document.getElementById("marquee" + i + "_2");
  obj2.innerHTML = obj1.innerHTML;
  var marqueeVar = window.setInterval("marquee(" + i + ", '" + direction + "')",
    40);
  obj.onmouseover = function() {
    window.clearInterval(marqueeVar);
  }
  obj.onmouseout = function() {
    marqueeVar = window.setInterval("marquee(" + i + ", '" + direction + "')", 30);
  }
}
marqueeStart(1, "left")

// 本地股市变化json文件传入客户端
const price_do = document.querySelectorAll("#marquee1_1> .green")
const price_up = document.querySelectorAll("#marquee1_1> .red")

const url_price = "../json/price.json"

init=()=>{
  const req_price = new XMLHttpRequest
  req_price.open("get",url_price)
  req_price.send(null)
  req_price.onload = ()=> {
    if (req_price.status == 200) {
      const req_price_arry = JSON.parse(req_price.responseText)
      // 股价下降的股市
      for(let i = 0; i < price_do.length; i++){
        for(let j = 0; j < req_price_arry.price_down.length; j++) {
          price_do[j].innerHTML =
          '<a>'+req_price_arry.price_down[j].name+'</a>'
          +'<a>'+req_price_arry.price_down[j].price+'</a>'
          +'<a>'+req_price_arry.price_down[j].down+'</a>'
          +'<a>'+req_price_arry.price_down[j].down_li+'</a>'
        }
      }
      // 股价上升的股市
      for(let i = 0; i < price_up.length; i++){
        for(let j = 0; j < req_price_arry.price_up.length; j++) {
          price_up[j].innerHTML =
          '<a>'+req_price_arry.price_up[j].name+'</a>'
          +'<a>'+req_price_arry.price_up[j].price+'</a>'
          +'<a>'+req_price_arry.price_up[j].down+'</a>'
          +'<a>'+req_price_arry.price_up[j].down_li+'</a>'
        }
      }
    }
  }
}

init()

// 轮播图
init = ()=>{
  const pic_items = document.querySelectorAll(".pic_items> li")
  const circles = document.querySelectorAll(".circles> li")
  const btn_lt = document.querySelector(".btn-lt")
  const btn_rt = document.querySelector(".btn-rt")
  const m_content = document.querySelector(".m-content")
  let timer = null
  let index = 0

  // 清除class
  clearClass = ()=>{
    // console.log("hhh")
    for(let i = 0; i < pic_items.length; i++){
      // console.log(pic_items[i].className )
      pic_items[i].className = "pic_item"
      circles[i].className = "circle"
      circles[i].setAttribute("num",i)
    }
  }

  // 只显示一个class
  move = ()=>{
    clearClass()
    pic_items[index].className = "pic_item active"
    circles[index].className = "circle white"
  }

  move()

  // 点击右边按钮切换下一张图片
  btn_rt.addEventListener("click",()=>{
    console.log(index)
    if(index < pic_items.length-1) {
      index ++
    }else {
      index = 0
    }
    move()
  })

  // 点击左边按钮切换上一张图片
  btn_lt.addEventListener("click",()=>{
    console.log(index)
    if(index < pic_items.length-1) {
      index --
      if(index < 0) {
        index = 2
      }
    }else {
      index = 1
    }
    move()
  })

  // 开始定时器 实现轮播
  lunbo = ()=>{
    if(index < pic_items.length-1) {
      index ++
    }else {
      index = 0
    }
    move()
  }

  timer = setInterval(lunbo,1300)

  // 点击原点跳转
  for(let i = 0; i< circles.length; i++) {
    circles[i].addEventListener("click",()=>{
      clearInterval(timer);
      let point_index = circles[i].getAttribute("num")
      index = point_index
      move()
    })
  }

  // 鼠标移入时 清除定时器
  m_content.onmouseover = ()=> {
    clearInterval(timer)
    timer = setInterval(lunbo,2500)
  }

  // 鼠标移出时 开启定时器
  m_content.onmouseleave = ()=> {
    clearInterval(timer)
    timer = setInterval(lunbo,1300)
  }

  // 调用天行数据的全国新冠疫情数据接口
  const epi_url = "http://api.tianapi.com/ncov/index?key=d030712b7ddf2a2bc20d714c522f8dc2"
  const req_epi = new XMLHttpRequest()
  req_epi.open("get",epi_url)
  req_epi.send(null)
  req_epi.onload = () => {
    if(req_epi.status == 200) {
      let req_epi_arry = JSON.parse(req_epi.responseText)
      let req_epi_news_list = req_epi_arry.newslist[0].news
      $("#contain").html("")
      for(let i = 0; i < 2; i++) {
        let str = "<div class='epi-list'>";
        str += "<div class='epi-pic'>"
        str += "<img src='./img/epi_"+i+".jpeg' alt=''>"
        str += "</div>"
        str += "<div></div>"
        str += "<div class='epi-content'>"
        str += "<div class='epi-title'><a href='"+req_epi_news_list[i].sourceUrl+"'>"+
        req_epi_news_list[i].title+"</a></div>"
        str += "<div class='epi-news'>"+
        req_epi_news_list[i].summary+"</div>"
        str += "<div class='epi-bottom'><li>"+
        dateFormat_1(req_epi_news_list[i].pubDate)+"</li><li>"+
        req_epi_news_list[i].infoSource + "</li><li>"+
        req_epi_news_list[i].pubDateStr + "</li></div>"
        str += "</div></div><div class='epi_border'></div></div>"
        $("#contain").append(str)
      }

      // 查看更多
      const ka_rt = document.querySelector(".ka-rt")
      ka_rt.addEventListener("click",()=>{
        window.location.href = "./src/epi_more.html"
      })
    }
  }
}

// 将lang类型的日期变成普通形式
function dateFormat_1(longTypeDate){ 
  var dateType = ""; 
  var date = new Date(); 
  date.setTime(longTypeDate); 
  dateType += date.getFullYear();  //年 
  dateType += "-" + getMonth(date); //月  
  dateType += "-" + getDay(date);  //日 
  return dateType;
} 
//返回 01-12 的月份值  
function getMonth(date){ 
  var month = ""; 
  month = date.getMonth() + 1; //getMonth()得到的月份是0-11 
  if(month<10){ 
    month = "0" + month; 
  } 
  return month; 
} 
//返回01-30的日期 
function getDay(date){ 
  var day = ""; 
  day = date.getDate(); 
  if(day<10){ 
    day = "0" + day; 
  } 
  return day; 
}

init()

