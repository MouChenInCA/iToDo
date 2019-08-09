//-File name: app.js
//-Author: Mou Chen
//-web site name: iToDo
//-file description: This is the app.js page. this use to define the function for MC-btn.

$(function(){

    $(".MC-btn").click(function(){
         $('.MC-incidents').toggle('slow')
    });


});