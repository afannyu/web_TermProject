init = ()=>{
  const epi_url = "http://api.tianapi.com/ncov/index?key=d030712b7ddf2a2bc20d714c522f8dc2"
  const req_epi = new XMLHttpRequest()
  req_epi.open("get",epi_url)
  req_epi.send(null)
  req_epi.onload = () => {
    if(req_epi.status == 200) {
      let req_epi_arry = JSON.parse(req_epi.responseText)
      let req_epi_news_list = req_epi_arry.newslist[0].news
      console.log(req_epi_news_list);
      // 查看更多
      $("#contain").html("")
      for(let i = 0; i < req_epi_news_list.length; i++) {
        var msg=req_epi_news_list[i].summary;
        console.log(msg)
        // var msgrep=msg.replaceAll("。 ", "。\<\/br\> ")
        var msgrep=msg.replace(/\s\s\s\s/g,"</br>")
        console.log(msgrep)
        let str = "<div class='epi-list'>"
        str += "<div class='epi-pic'>"
        str += "<img src='../img/epi_"+i+".jpeg' alt=''>"
        str += "</div>"
        str += "<div></div>"
        str += "<div class='epi-content'>"
        str += "<div class='epi-title'><a href='"+req_epi_news_list[i].sourceUrl+"'>"+
        req_epi_news_list[i].title+"</a></div>"
        str += "<div class='epi-news'>"+
        msgrep+"</div>"
        str += "<div class='epi-bottom'><li>"+
        dateFormat_1(req_epi_news_list[i].pubDate)+"</li><li>"+
        req_epi_news_list[i].infoSource + "</li><li>"+
        req_epi_news_list[i].pubDateStr + "</li></div>"
        str += "</div></div><div class='epi_border'></div></div>"
        $("#contain").append(str)
      }
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