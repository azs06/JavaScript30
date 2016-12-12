(function () {
    'use strict';
    var id = null;
    var timer = null;
    var blockTimer = null;
    var classes = document.getElementsByClassName('coloredBlock');
    var classesArray = Array.from(classes);
    var classesArrayLength = classesArray.length;
    var blockInterval = 1000;
    var rootInterval = classesArrayLength * blockInterval;
    var today = function() {
        return new Date();
    };
    var dayElm = document.getElementById('day'),
        hourlElm = document.getElementById('hour'),
        minuteElm = document.getElementById('minutes'),
        secondsElm = document.getElementById('seconds');

    function getRandomColor() {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var black = Math.floor(Math.random() * 256);		
        return 'rgb(' + red + ', ' + green + ', ' + black + ')';	
    }


    function animation() {
        loopAndChangeColor(0);
        timer = setTimeout(function () {
        id = requestAnimationFrame(animation);  
        }, rootInterval);
    }


    function start_animation() {
        //start the first frame
        id = requestAnimationFrame(animation);
    }


    function cancel_animation() {
        //cancel the latest frame.
        clearTimeout(blockTimer);
        clearTimeout(timer);
        cancelAnimationFrame(id);
    }


    function changeBlockColor(){
        [].forEach.call(classes, function(element){
        element.style.backgroundColor = getRandomColor();

        });
    }


    function changeBackgroundColor(element, color) {
        //console.log(typeof element);
        element.style.backgroundColor = color;
    }


    function loopAndChangeColor(i){
          i = i || 0;	
          blockTimer = setTimeout(function () {   
          changeBackgroundColor(classesArray[i], getRandomColor());
          i++;
          if ( i < classesArrayLength ) loopAndChangeColor(i);    
       }, blockInterval)
    }
    
    function setSeconds(){
        var now = today();
        secondsElm.innerHTML = now.getSeconds();
    }
    
    function setMinutes() {
        var now = today();
        minuteElm.innerHTML = now.getMinutes();
    }
    function getDay(datObj){
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        
    }
    
    function getMonth(dateObj) {
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
     
    }
    function updateTime() {
        var now = today();
        secondsElm.querySelector('span').innerHTML = now.getSeconds();
        changeBackgroundColor(secondsElm, getRandomColor());
        
        if(now.getSeconds() >= 59){
            minuteElm.querySelector('span').innerHTML = now.getMinutes();         
        }
        if(now.getMinutes() >= 59){
            hourlElm.querySelector('span').innerHTML = now.getHours();
        }
    }
    function initTime() {
        var now = today();
        console.log(hourlElm);
        secondsElm.querySelector('span').innerHTML = now.getSeconds();
        minuteElm.querySelector('span').innerHTML = now.getMinutes();
        hourlElm.querySelector('span').innerHTML = now.getHours();
    }
   
    setInterval(function(){
        updateTime();
    },1000);

    changeBlockColor();
    initTime();
    //start_animation();
}());
