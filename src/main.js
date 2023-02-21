const log=console.log.bind(console);
const setJId=(that,dic)=>{
  const target=event.target;
  Object.keys(dic).forEach(key=>{
    that[key]=dic[key];
  });
};
function getUrlQueries() {
  const queryStr = window.location.search.slice(1);
  const queries = {};
  if(!queryStr){
    return queries;
  }
  queryStr.split('&').forEach(function(queryStr) {
    let queryArr = queryStr.split('=');
    queries[queryArr[0]] = queryArr[1];
  });
  return queries;
}
const getJId=(event,key)=>{
  const target=event.target;
  const v=target;//[Object.keys(target)[0]];
  return v[key];
};
const escapeUhtml=str=>{
    let code, pref = {1: '\\u000', 2: '\\u00', 3: '\\u0', 4: '\\u'};
    return str.replace(/[　]/g,c=>
      "&#x"+(pref[(code = c.charCodeAt(0).toString(16)).length]+code).slice(2)+";"
    );
};
function escapeHTML(string) {
  if(typeof string !== 'string') {
    return string;
  }
  const escapes={
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
      ' ': '&nbsp;',
      '\n':'<br>',
  };
  return Array.from(string).reduce((a,c)=>{
    let x;
    if(Object.keys(escapes).includes(c)){
      x=escapes[c];
    }else{
      x=escapeUhtml(c);
    }
    return a+x;
  },"");
}
function regIndexes(target,reg){
  let oneResult;
  const result=[];
  while((oneResult=reg.exec(target))!==null) {
    result.push({start:oneResult.index,end:reg.lastIndex,match:oneResult[0]});
  }
  return result;
}
$(e=>{
if(getUrlQueries().mode==="run"){
  $("#panel #mode").text("Run Mode");
  updmode();
}else{
  $("#panel #mode").text("Edit Mode");
  updmode();
}});
if(getUrlQueries().url){
  //load({"title":"少女祈祷中... Now loading..","data":[{"type":"text","src":".use md\n## 少女祈祷中...\n#### Now Loading...","x":50,"y":19},{"type":"text","src":"リモートxfnbファイルを読み込むまでしばらくお待ちください。","x":47,"y":202},{"type":"text","src":"読み込まれない場合、URLが間違っているか、サーバーがエラーを返している可能性があります。","x":54,"y":274}]});
  fetch(getUrlQueries().url)
    .then(e=>e.json())
    .then(data=>{
      load(data)
    })
}
function save(){
  let title=$("#title").val();
  if($("#title").val().slice(-5)===".xfnb")title=title.slice(0,-5);
  let data={title:title,data:[]};
  $(".area").children().each(function(index){
    const child={};
    if($(this).attr("type")==="img"){
      child.type="img";
      child.src=$(this).find("img").attr("src");
      child.size=$(this).find("img").height();
    }
    else{
      child.type="text";
      child.src=$(this).find("#edit").val();
    }
    child.x=parseInt($(this).css("left"));
    child.y=parseInt($(this).css("top"));
    data.data.push(child);
  });
  return data;
}
function load(data){
  $("#title").val(data.title);
  const body=data.data;
  $(".area").empty();
  for(let child of body){
    if(child.type==="img"){
      newpic(child.src,child.x,child.y,child.size);
    }else if(child.type==="text"){
      newtxt(child.src,child.x,child.y);
    }
  }
  updmode();
  setTitle();
}
$("#panel #load").click(()=>{
  const input=document.createElement("input");
  input.type="file";
  input.addEventListener("change",e=>{
    const data=input.files[0];
    const reader=new FileReader();
    reader.readAsText(data);
    reader.onload=e=>{
      let data;
      try{
        data=JSON.parse(reader.result);
      }catch(e){
        window.alert("正しいJsonファイルを指定してください");
        return;
      }
      const sippai=load(data);
      if(sippai){
        window.alert("正しいxfnb v2ファイルになっているかを確認してください。旧Xearfiy Notebookファイルと互換性はありません。");
      }
    };
  });
  input.click();
});
$("#panel #save").click(()=>{
  let data=save();
  const title=data.title;
  data=JSON.stringify(data);
  const blob=new Blob([data]);
  const blobUrl=URL.createObjectURL(blob);
  const aTag=document.createElement("a");
  aTag.href=blobUrl;
  aTag.download=title+".xfnb";
  aTag.click();
});
function newtxt(text="abcABCあいう123",x=0,y=0){
  $(".area").append(`
  <div class="obj" style="top:${y};left:${x};">
    <div id="ctx" style="background-color:#fff;margin:0;padding:0.2rem;border:0.1px solid #000;border-radius:10px;font-size:1rem;width:fit-content;line-height:1.4;min-width:2rem;min-height:1rem">${text}</div>
    <textarea id="edit" style="background-color:transparent;margin:0;padding:0.2rem;border:0.1px solid transparent;border-radius:10px;position:relative;font-size:1rem;line-height:1.4;outline:none;min-width:2rem;min-height:1.5rem;color:transparent" hidden>${text}</textarea>
    <div id="ctrl" style="position: relative;bottom:10";text-align:right;" hidden>
      <span id="del" style="background-color:#f00;color:#fff;margin-right:10;">&nbsp;x&nbsp;</span>
      <span id="close" style="background-color:fff">&nbsp;&lt;&nbsp;</span>
    </div>
  </div>`);
  updateobj()
  const target=$(".area").children().last();
  target.css("left",x);
  target.css("top",y);
}
function newpic(src="",x=0,y=0,size=100){
  $(".area").append(`
      <div class="obj" style="top:${y};left:${x};" type="img">
        <img src="${src}">
        <div id="ctx"></div>
        <div id="edit"></div>
        <div id="ctrl" style="position: relative;bottom:10";text-align:right;" hidden>
          <span id="del" style="background-color:#f00;color:#fff;margin-right:10;">&nbsp;x&nbsp;</span>
          <span id="close" style="background-color:fff">&nbsp;&lt;&nbsp;</span>
          <!--<input id="size" type="range">-->
          <span id="sizeup" style="background-color:#aaa">&nbsp;+&nbsp;</span>
          <span id="sizedown" style="background-color:#aaa">&nbsp;-&nbsp;</span>
        </div>
      </div>`);
  const target=$(".area").children().last();
  target.css("top",y);
  target.css("left",x);
  target.children("img").height(size);
  updateobj()
  const height=target.children("img").height();
  target.find("#ctrl #size").val(height/$(".area").height()*100)
  target.find("#ctrl").off()
    .on("touchstart",function(e){
      this.on=true;
    }).on("touchend",function(e){
      this.on=false;
    });
}
$("#panel #newtxt").click(e=>{
  newtxt("abc((d))efg...",10);
  updateobj();
});
$("#panel #credit").click(e=>{
  $("#credits").get(0).showModal();
});
function setTitle(){
  $("title").text($("#title").val()+" -Xearfiy Notebook")
}
$("#panel #picup").click(e=>{
  const input=document.createElement("input");
  input.type="file";
  input.accept="image/*";
  input.addEventListener('change',e=>{
    const data=input.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(data);
    reader.onload=e=>{
      newpic(reader.result);
    };
  });
  input.click();
});
setTitle()
$("#title").on("change",e=>{
  setTitle();
})
function tap(){
  const time=new Date().getTime();
  if(this.tapTime===null){
    this.tapTime=0;
  }
  //if(time-this.tapTime<400){
    $(this).children("#ctrl").show();
    $(this).children("#edit").show();
    $(this).find("#ctrl #del").off().on("click",(e)=>{
      const really=window.confirm("削除しますか？")
      if(really) $(this).remove();
    });
    $(this).find("#ctrl #close").off().on("click",e=>{
      $(this).children("#ctrl").hide();
      $(this).children("#edit").hide();
    });
    const ctx=$(this).children("#ctx");
    const textChenge=function(e){
      if($(this).val().match(/[\t　]/)){
        $(this).val($(this).val()
          .replaceAll("　","  ")
          .replaceAll("\t","    ")
        );
      }
      const text=$(this).val();
      let html=text;
      html=escapeHTML(html);
      regIndexes(html,/\(\([\s\S]*?\)\)/g).reverse().forEach(elem=>{
        html=
          html.slice(0,elem.start)+
          `<span style="background-color:#f99;color:#555;">((<span style="color:#000">${elem.match.slice(2,-2)}</span>))</span>`+
          html.slice(elem.end);
      });
      regIndexes(html,/(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g).reverse().forEach(elem=>{
        html=
          html.slice(0,elem.start)+
          `<u style="color:blue">${elem.match}</u>`+
          html.slice(elem.end);
      });
      regIndexes(html,/\.use&nbsp;md/g).reverse().forEach(elem=>{
        html=
          html.slice(0,elem.start)+
          `<span style="color:green">${elem.match}</span>`+
          html.slice(elem.end);
      });

      ctx.html(html);
      const ctxHeight=ctx.outerHeight(true);
      $(this).css("bottom",ctxHeight);
      $(this).height(ctx.height()+parseInt($(this).css("font-size"))*1.4);
      $(this).width(ctx.width());
      $(this).siblings("#ctrl").css("bottom",ctxHeight);
    };
    setTimeout(textChenge.bind($(this).children("#edit").get(0)),10);
    $(this).children("#edit").off()
      .on("keydown",textChenge)
      .on("keyup",textChenge)
      .change(textChenge)
      .on("compositionstart",textChenge)
      .on("compositionend",textChenge)
      .on("paste",textChenge);
    $(this).find("#ctrl #sizeup").off().click(e=>{
      const img=$(this).find("img").get(0);
      $(img).height($(img).height()*1.1)
    })
    $(this).find("#ctrl #sizedown").off().click(e=>{
      const img=$(this).find("img").get(0);
      $(img).height($(img).height()/1.1)
    })
    /*$(this).find("#ctrl #size").off()
      .change(e=>{
        const img=$(this).find("img").get(0);
        const size=$(this).find("#ctrl #size").get(0);
        if(size.bs===null || size.bs===void(0)){
          size.bs=$(this).find("#ctrl #size").val();
        }
        const movePx=($(size).val()-size.bs)/100*$(".area").height()
        size.bs=$(size).val();
        $(this).css("top",parseInt($(this).css("top"))-movePx);
        $(img).height($(size).val()+"%")
      })*/
  //}
  this.tapTime=time;
}
$("#panel #mode").click(function(e){
  if($(this).text()==="Edit Mode"){
    $(this).text("Run Mode");
  }else{
    $(this).text("Edit Mode");
  }
  updmode();
});
function updmode(){
  const isEdit=$("#panel #mode").text()==="Edit Mode";
  if(isEdit){
    $("#panel #picup, #panel #newtxt").show();
    $(".obj").each(function(index){
      tap.call(this);
      tap.call(this);
      $(this).find("#ctrl #close").click();
    });
  }else{
    $("#panel #picup, #panel #newtxt").hide();

    $(".obj #ctrl, .obj #edit").hide();
    $(".obj #ctx").each(function(index){
      let html=$(this).html();
      html=$(this).siblings("#edit").val();
      html=html
        .replaceAll('<span style="background-color:#f99;color:#555;">((<span style="color:#000">','((')
        .replaceAll('</span>))</span>','))')
      html=html.replaceAll("<br>","\n");
      const isMd=html.split("\n")[0]==='.use md';
      if(isMd){
        html=html.split("\n").slice(1).join("\n");
        html=marked.parse(html.replaceAll("&nbsp;"," "));
      }else{
        html=escapeHTML(html);
      }
      regIndexes(html,/(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g).reverse().forEach(elem=>{
        html=
          html.slice(0,elem.start)+
          `<a href="${elem.match}">${elem.match}</a>`+
          html.slice(elem.end);
      });

      regIndexes(html,/\(\([\s\S]*?\)\)/g).reverse().forEach(elem=>{
        html=
          html.slice(0,elem.start)+
          `<span id="hidden" style="background-color:#f00;color:transparent;">${elem.match.slice(2,-2)}</span>`+
          html.slice(elem.end);
      });
      
      html=html.replaceAll("&amp;nbsp;","&nbsp;")
      $(this).html(html);
    });
    $(".obj #ctx #hidden").each(function(index){
      $(this).off().click(e=>{
        if($(this).css("color").replaceAll(" ","")==="rgba(0,0,0,0)"){
          $(this).css("color","#000");
          $(this).css("background-color","#f99");
        }else{
          $(this).css("color","transparent");
          $(this).css("background-color","#f00");
        }
      })
    });
    $(".obj #ctx pre code").each(function(index){
      hljs.highlightElement(this);
    });
  }
  $(".area a").each(function(index){
    $(this).attr("target","_blank")
  });
  resize();
}

updateobj();
const resize=e=>{
  $(".area").height(window.innerHeight-$(".area").offset().top);
};
resize();
window.addEventListener('resize',resize);

function updateobj(){

$(".obj").off().on("touchstart",function(e){
  if($("#panel #mode").text()==="Edit Mode"){
    tap.call(this);
    setJId(this,{
      touchid:e.originalEvent.changedTouches[0].identifier,
      bias:{
        x:e.originalEvent.changedTouches[0].pageX-$(this).css("left").replace("px",""),
        y:e.originalEvent.changedTouches[0].pageY-$(this).css("top").replace("px","")
      }
    });
  }
}).on("touchmove",function(e){
  if($("#panel #mode").text()==="Edit Mode"){
    if($(this).attr("type")==="img"){
      if($(this).children("#ctrl").get(0).on){
        return;
      }
    }
    e.preventDefault();
    for(const touch of Object.values(e.originalEvent.changedTouches)){
      if(touch.identifier==this.touchid){
        $(this).css("left",touch.pageX-this.bias.x);
        $(this).css("top" ,touch.pageY-this.bias.y);
        break;
      }
    }
  }
}).on("touchend",function(e){
  if($("#panel #mode").text()==="Edit Mode"){
    setJId(this,{touchid:undefined});
  }
});
}
