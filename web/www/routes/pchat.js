var http = require('http');
var url = require('url');
var querystring = require('querystring');
var qs = require('querystring');
var template2 = require('../lib/template2.js');
var topic = require('../lib/pchattopic');
var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');
var db2 = require('../lib/db2');//heidy db
var template_chat = require('../lib/template_chat.js');
var pauth = require('../lib/pauth');
//const chatMessages = document.querySelector('.chat-messages');//여기




   
//각각의 리스트를 눌렀을때
//localhost:8080/chat
router.get('/',function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
 
  //var id = parseUrl.substring(parseUrl.lastIndexOf("=")+1);
  //console.log(id);
  if(pathname === '/'){
    if (!pauth.isOwner(request, response)) {
      response.redirect('/pmypage')
      return false
    }
    if(queryData.id === undefined){
      topic.home(request,response);
    }else{
      db2.query(`SELECT * FROM chatMessage`, function(error,topics){
        console.log(topics); //chatMessgae 테이블 데이터 다 나옴
        console.log(queryData.id);//작가이름
        console.log(queryData.user);//고객이름
        var id = queryData.id;//현근창송예인
        var user = queryData.user;//송예인
        //var roomname = id.concat(user); 
        //console.log(roomname); //현근창송예인yeinsong
        if(error){
          throw error;
        }
        
        //해당 room 대화내용 복귀
        db2.query(`SELECT * FROM chatMessage WHERE chatMessage.room=?`,[id],function(error2,topic){
          if(error2){
            throw error2;
          }
     console.log(topic); //해당 테이블만 나옴
      //객체
      
     
      var html = template_chat.list(topic);

  
        response.send(html);
       });
      
      });


    }
  }

});






module.exports = router;









