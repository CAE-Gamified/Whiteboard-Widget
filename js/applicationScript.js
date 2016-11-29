/*
 * Copyright (c) 2015 Advanced Community Information Systems (ACIS) Group, Chair
 * of Computer Science 5 (Databases & Information Systems), RWTH Aachen
 * University, Germany All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of the ACIS Group nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var client;
var likeArr, dislikeArr, statusArr;
var init = function() {
  
  var iwcCallback = function(intent) {
    // define your reactions on incoming iwc events here
    console.log(intent);
  };
  
  client = new Las2peerWidgetLibrary("http://localhost:8080/whiteboard", iwcCallback);
  
Y({
  db: {
    name: 'memory'
  },
  connector: {
    name: 'websockets-client',
    room: 'cae-room'
  },
  sourceDir: "http://y-js.org/bower_components",
  share: {
    dislikeStatus:'Text',
    likeStatus:'Text',
    whiteboard:'Text',
    likeArr:'Array',
    dislikeArr:'Array',
    statusArr:'Array'
  }
}).then(function (y) {
  window.yTextarea = y

  y.share.dislikeStatus.bind(document.getElementById('dislikeStatus'))
  y.share.likeStatus.bind(document.getElementById('likeStatus'))
  y.share.whiteboard.bind(document.getElementById('whiteboard'))
  likeArr = y.share.likeArr;
  dislikeArr = y.share.dislikeArr;
  statusArr = y.share.statusArr;

likeArr.observe(function(event){
  console.dir(event)
  if(event.length == 1){
    if(event[0].value){
      $("#likeStatus").val(event[0].value);
    }
  }
})
dislikeArr.observe(function(event){
  console.dir(event)
  if(event.length == 1){
    if(event[0].value){
      $("#dislikeStatus").val(event[0].value);
    }
  }
})
statusArr.observe(function(event){
  console.dir(event)
  if(event.length == 1){
    if(event[0].value){
      $("#status").val(event[0].value);
    }
  }
})

  if(likeArr.toArray().length < 1){

    likeArr.push([0]);
  }
  

  if(dislikeArr.toArray().length < 1){

    dislikeArr.push([0]);
  }

  console.log(likeArr.toArray())
  console.log(dislikeArr.toArray())
  $("#likeStatus").val(likeArr.toArray()[0]);
  $("#dislikeStatus").val( dislikeArr.toArray()[0]);

  if(statusArr.toArray().length<1){
  }
  else if(statusArr.toArray().length>1){
    statusArr.delete(0,statusArr.toArray().length);
    statusArr.push([""])
  }
  else{
    statusArr.delete(0,statusArr.toArray().length);
    statusArr.push([""])
  }
})



  $('#dislikeButton').on('click', function() {
    dislikeFunction();
  })
  $('#newPage').on('click', function() {
    newPageFunction();
  })
  $('#likeButton').on('click', function() {
    likeFunction();
  })



}


// newPageFunction
var newPageFunction = function(){
  // Reset all


  likeArr.delete(0,likeArr.toArray().length);
  likeArr.push([0]);

  dislikeArr.delete(0,dislikeArr.toArray().length);
  dislikeArr.push([0]);
  $("#whiteboard").val('');
  $("#likeStatus").val(likeArr.toArray()[0]);
  $("#dislikeStatus").val(dislikeArr.toArray()[0]);
  feedbackStatus("New Page Created")
}


// likeFunction
var likeFunction = function(){
  var valTemp = likeArr.toArray()[0];
  likeArr.delete(0,likeArr.toArray().length);
  likeArr.push([valTemp+ 1]);
  $("#likeStatus").val(likeArr.toArray()[0]);
  feedbackStatus("A person liked the content")
}


// dislikeFunction
var dislikeFunction = function(){
  var valTemp = dislikeArr.toArray()[0];
  dislikeArr.delete(0,dislikeArr.toArray().length);
  dislikeArr.push([valTemp + 1]);
  $("#dislikeStatus").val(dislikeArr.toArray()[0]);
  feedbackStatus("A person disliked the content")
}


$(document).ready(function() {
  init();
});

function feedbackStatus(text){
  $("#status").val(text);

    statusArr.delete(0,statusArr.toArray().length);
    statusArr.push([text])

}