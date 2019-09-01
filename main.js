var main = {
    version:"wordbasic",
    history:"",
    hide:false,
    means(e) {
        var appKey = '749e437d6cb8fe87';
        var key = 'wTicQxQLjSQSdj9LmItgseEKKrrwUj5g'; //注意：暴露appSecret，有被盗用造成损失的风险
        var salt = (new Date).getTime();
        var query = e;
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        var from = 'en';
        var to = 'zh-CH';
        var str1 = appKey + query + salt + key;
        var sign = md5(str1);
        $.ajax({
            url: 'http://openapi.youdao.com/api',
            type: 'post',
            dataType: 'jsonp',
            data: {
                q: query,
                appKey: appKey,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            success: function (result) {
               // var a = JSON.parse(result);
                console.log(result);
                console.log(result.basic.explains);
                $("#" + e).next().text(result.basic.explains).next().text(result.translation).next().text(result.basic['us-phonetic']).next().text(result.basic['uk-phonetic']).next().text(result.basic['exam_type'])
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                alert("错误："+e);
                console.log(e.status);
                console.log(e.responseText);

            }
        });
    },
    sounds(e){
     
        // function onclick1(e){
        var path = e.path || (e.composedPath && e.composedPath());
        var WordString = path[1].id.toString().replace(main.version, ''); 
        console.log(path);
        var play = document.getElementById("play");
        var appKey = '749e437d6cb8fe87';
        var key = 'wTicQxQLjSQSdj9LmItgseEKKrrwUj5g'; //注意：暴露appSecret，有被盗用造成损失的风险
        var salt = (new Date).getTime();
        var query = WordString;
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        var from = 'en';
        var to = 'zh-CH';
        var str1 = appKey + query + salt + key;
        var sign = md5(str1);
        //console.log(e.target.innerText);
        if(e.target.innerText=="🇺🇸"||e.target.innerText=="🇬🇧"){
            
            var strSearch = e.target.innerText=="🇺🇸"?"us-speech":"uk-speech";
            $.ajax({
                url: 'http://openapi.youdao.com/api',
                type: 'post',
                dataType: 'jsonp',
                data: {
                    q: WordString,
                    appKey: appKey,
                    salt: salt,
                    from: from,
                    to: to,
                    sign: sign
                },
                success: function (result) {          
                    console.log(result);
                    play.src = result.basic[strSearch];
                    play.play();
                },
                //请求失败，包含具体的错误信息
                error: function (e) {
                    tableElement.removeEventListener("click",onclick1);
                    alert("错误："+e);
                    console.log(e.status);
                }
            });
        }
        
     //   }
        
    },
    
    color(){
        $('#word tr').hover(function(){  
            $(this).children('td').stop().addClass('tablecolor')
            if(main.hide == true){
                $(this).children('td:eq(5)').show()
                $(this).children('td:eq(6)').show()
            }        
        }, function(){  
            $(this).children('td').stop().removeClass('tablecolor')
            if(main.hide == true){
                $(this).children('td:eq(5)').hide()
                $(this).children('td:eq(6)').hide()
            }
        });    
    },
    wordInit(version,versionID){
        var tableElement = document.getElementById("word");
        tableElement.removeEventListener("click",main.sounds);
        switch (versionID) {
            case "wordsbasic":
                main.version = "wordsbasic";
                var list = version;
                var strHTML = ' <tr align="left"><th>序号</th><th>实际</th><th>🇬🇧</th><th>🇺🇸</th><th>英文</th><th>中文详细</th><th>中文简单</th><th>美式音标</th><th>英式音标</th><th>考试范围</th></tr>';
                var word = document.getElementById("word");
                word.innerHTML = strHTML;
                var idforSearchString =versionID;
                for (let i = 0; i <list.length ; i++) {
                    strHTML += '<tr  class="wordlist" id="'+ idforSearchString + list[i].En +'" >' + '<td style="cursor:default" >' + (i + 1) + '</td>' +'<td style="cursor:default" >' + list[i].realID + '</td><td style="cursor:pointer" >'+'🇬🇧'+'</td><td style="cursor:pointer" >'+'🇺🇸'+'</td><td  id="' + list[i].En + ' "style="cursor:default" >' + list[i].En + '</td>' + '<td style="">'+list[i].Cn+'</td>'+ '<td style="">'+list[i].CnS+'</td>'+ '<td style="">'+list[i].Am+'</td>'+ '<td style="">'+list[i].Eng+'</td>'+ '<td style="">'+list[i].exam+'</td>'+'</tr>';
                }
                word.innerHTML = strHTML;
                var tableElement = document.getElementById("word");
                tableElement.addEventListener("click",main.sounds);
                
            break;
            case "wuteacher":
                console.log(version);
                main.version = "wuteacher";
                var list = version;
                var strHTML = ' <tr align="left"><th>序号</th><th>频率</th><th>🇬🇧</th><th>🇺🇸</th><th>英文</th><th>中文</th></tr>';
                var word = document.getElementById("word");
                word.innerHTML = strHTML;
                var idforSearchString =versionID;
                for (let i = 0; i <list.length ; i++) {
                   strHTML += '<tr class="wordlist" id="'+ idforSearchString + list[i].En +'" >' + '<td style="cursor:default" >' + (i + 1) + '</td>' +'<td style="cursor:default" >' + list[i].ID + '</td><td style="cursor:pointer" >'+'🇬🇧'+'</td><td style="cursor:pointer" >'+'🇺🇸'+'</td><td  id="' + list[i].En + ' "style="cursor:default" >' + list[i].En + '</td>' + '<td style="">'+list[i].Cn+'</td></tr>';
                }
                word.innerHTML = strHTML;
                var tableElement = document.getElementById("word");
                tableElement.addEventListener("click",main.sounds);
              
                console.log("wuteacher");
            break;
            case "aideIELTS":  
                console.log(version);
                main.version = "aideIELTS";
                var list = version;
                var strHTML = '<tr align="left"><th>真实序号</th><th>序号</th><th>天数</th><th>🇬🇧</th><th>🇺🇸</th><th>英文</th><th>中文</th></tr>';
                var word = document.getElementById("word");
                word.innerHTML = strHTML;
                var idforSearchString =versionID;
                for (let i = 0; i <list.length ; i++) {
                    strHTML += '<tr class="wordlist" id="'+ idforSearchString + list[i].En +'" >' + '<td style="cursor:default">'+(i+1)+'</td>' + '<td style="cursor:default" >' +  list[i].ID  + '</td>' +'<td style="cursor:default" >' + list[i].day + '</td><td style="cursor:pointer" >'+'🇬🇧'+'</td><td style="cursor:pointer" >'+'🇺🇸'+'</td><td  id="' + list[i].En + ' "style="cursor:default" >' + list[i].En + '</td>' + '<td style="">'+list[i].Cn+'</td></tr>';
                }
                word.innerHTML = strHTML;
                var tableElement = document.getElementById("word");
                tableElement.addEventListener("click",main.sounds);
               
                console.log("aideIELTS");
            break;
            case "TOEFLsubject": // 未完成
                console.log(version);
                var list = version;
                var strHTML = ' <tr align="left"><th>序号</th><th>频率</th><th>🇬🇧</th><th>🇺🇸</th><th>英文</th><th>中文</th></tr>';
                var word = document.getElementById("word");
                word.innerHTML = strHTML;
                var idforSearchString =versionID;
                for (let i = 0; i <list.length ; i++) {
                    strHTML += '<tr class="wordlist" id="'+ idforSearchString + list[i].En +'" >' + '<td style="cursor:default" >' + (i + 1) + '</td>' +'<td style="cursor:default" >' + list[i].ID + '</td><td style="cursor:pointer" >'+'🇬🇧'+'</td><td style="cursor:pointer" >'+'🇺🇸'+'</td><td  id="' + list[i].En + ' "style="cursor:default" >' + list[i].En + '</td>' + '<td style="">'+list[i].Cn+'</td></tr>';
                }
                word.innerHTML = strHTML;
                console.log("TOEFLsubject");
            break;
        }
 
        this.color()
    },
  
    menuButtonEvent(){
        var btn1 = document.getElementById("wordbasicButton");
        var btn2 = document.getElementById("wuteacherButton");
        var btn3 = document.getElementById("aideIELTSButton");
        var btn4 = document.getElementById("TOEFLsubjectButton");
        btn1.addEventListener('click',function() {
            main.version = "wordbasic";
            main.wordInit(wordsbasic,"wordsbasic");
        },false);  
        btn2.addEventListener('click',function() {
            main.version = "wuteacher";
            main.wordInit(wuteacher,"wuteacher");
        },false);   
        btn3.addEventListener('click',function() {
            main.version = "aideIELTS";
            main.wordInit(aideIELTS,"aideIELTS");
        },false); 
        btn4.addEventListener('click',function() {
            main.version = "TOEFLsubject";
        },false);   
       
    },
}

var tools = {
    wrongWord(){
        var tableElement = document.getElementById("word");
        tableElement.addEventListener("click",onclick2);
        function onclick2(e){
            var value = e.target.innerText;
            if(value.match(/[\W]/g,'')==null){
                var tableElement2 = document.getElementById("wrongWord");
                tableElement2.innerHTML +="<tr>"+value+"</tr>"
            }
        }      
    },
    buttonEvent(){
        var btn = document.getElementById("hideCn");  
        btn.addEventListener('click',function() {
           tools.hideCn();
           main.hide = true;
        },false);  
        var btn2 = document.getElementById("showCn");  
        btn2.addEventListener('click',function() {
           tools.showCn();
           main.hide = false;
        },false);   
        var btn3 = document.getElementById("cleanAll");  
        btn3.addEventListener('click',function() {
        var table =  document.getElementById("wrongWord");   
        table.innerHTML = "";
        },false);  
    },  
    hideCn(){
        main.hide = true;
        for(var i = 5;i<10;i++){
            $('#word tr').find('td:eq('+i+')').hide();
            $('#word tr').find('th:eq('+i+')').hide();
          }
    },
    showCn(){
        main.hide = false;
        for(var i = 5;i<10;i++){
          $('#word tr').find('td:eq('+i+')').show();
          $('#word tr').find('th:eq('+i+')').show();
        }
    },
}

$(document).ready(function(){
    main.wordInit(wordsbasic,"wordsbasic");
    main.menuButtonEvent();
    tools.buttonEvent();
    tools.wrongWord();
});
