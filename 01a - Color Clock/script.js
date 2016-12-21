(function () {
    'use strict';
    var classes = document.getElementsByClassName('coloredBlock'),
        blockInterval = 1000,
        today = function() {
            return new Date();
        },
        dayElm = document.getElementById('day'),
        hourElm = document.getElementById('hour'),
        minuteElm = document.getElementById('minutes'),
        secondsElm = document.getElementById('seconds');

    function getRandomColor() {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var black = Math.floor(Math.random() * 256);		
        return 'rgb(' + red + ', ' + green + ', ' + black + ')';	
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

    /*@requires a date object as parameter*/
    function getDay(dateObj){
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dateObj.getDay()];
        
    }
    /*@requires a date object as parameter*/
    function getMonth(dateObj) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[dateObj.getMonth()];
     
    }
    
    function getHours(dateObj) {
        var hours = dateObj.getHours();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + " " + ampm;
    }
    function returnWithZero(value){
        return value < 10 ? "0"+value : value;
    }
    var mHolder = 0,
        hHolder = 0;
    
    function updateTime() {
        var now = today();
        secondsElm.querySelector('span').innerHTML = returnWithZero(now.getSeconds());
        changeBackgroundColor(secondsElm, getRandomColor());
        minuteElm.querySelector('span').innerHTML = returnWithZero(now.getMinutes());
        hourElm.querySelector('span').innerHTML = getHours(now);
        
        if(now.getMinutes() > mHolder){
            changeBackgroundColor(minuteElm, getRandomColor());
            mHolder = now.getMinutes();            
            
        }
        
        if(now.getHours() > hHolder){
            changeBackgroundColor(hourElm, getRandomColor());
            hHolder = now.getHours();
        }
        
    }
    
    function initTime() {
        var now = today();
        var dayString = "Today is " + getDay(now) + ", "+ getMonth(now) + ", " + now.getFullYear();
        mHolder = now.getMinutes();
        hHolder = now.getHours();
        secondsElm.querySelector('span').innerHTML = returnWithZero(now.getSeconds());
        minuteElm.querySelector('span').innerHTML = returnWithZero(now.getMinutes());
        hourElm.querySelector('span').innerHTML = getHours(now);
        dayElm.querySelector('span').innerHTML = dayString;
    }
   
    setInterval(function(){
        updateTime();
    },500);

    changeBlockColor();
    initTime();
}());
