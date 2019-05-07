export {
    webp,
    pushHistory,
    throttle,
    checkContent,
    checkName,
    mobile,
    debounce,
    appendScript,
    blur,
    setTime,
    setStorage,
    getStorage,
    delStorage,
    supportCss,
    UniqueArray,
    shuffle,
    ping,
    addFace
}
var addFace = function(params){
   
        return params.replace(/«[a-zA-Z]{1,5}_56»/g, function (express) {
            return express.replace(/«/, `<img src='./face/`).replace(/»/,
                ".gif'>")
        })
}
var shuffle = function (arr) { 
    let i = arr.length; 
    while (i) { 
        let j = Math.floor(Math.random() * i--); 
        [arr[j], arr[i]] = [arr[i], arr[j]]; 
    } 
} 

var UniqueArray = function(arr){
    var arr_temp = JSON.stringify(arr);
    var set = new Set();
    JSON.parse(arr_temp).forEach((el)=>{
        set.add(JSON.stringify(el));
    });
    console.log(arr_temp)
    return [...set].map((el)=>{
        return JSON.parse(el);
    });
}
var supportCss = (function() {
    var div = document.createElement('div'),
       vendors = 'Ms O Moz Webkit'.split(' '),
       len = vendors.length;
  
    return function(prop) {
       if ( prop in div.style ) return true;
  
       prop = prop.replace(/^[a-z]/, function(val) {
          return val.toUpperCase();
       });
  
       while(len--) {
          if ( vendors[len] + prop in div.style ) {
             return true;
          } 
       }
       return false;
    };
 })();
 
import "./dom";
const storage = window.localStorage || null;
if(!storage.getItem('JULONE') || storage.getItem('JULONE') == ""){
    storage.setItem('JULONE','{}');
}
var setStorage = function(key,val){
    let a = JSON.parse(storage.getItem('JULONE'));
    a[key] = val;
    storage.setItem('JULONE',JSON.stringify(a));
}
var getStorage = function(key){
    let a = JSON.parse(storage.getItem('JULONE'));
    return a[key];
}
var delStorage = function(key){
    let a = JSON.parse(storage.getItem('JULONE'));
    delete a[key];
    storage.setItem('JULONE',JSON.stringify(a));
}

var checkContent = function (val) {
    return /^[\s\S]{1,}$/.test(val);
}
var checkName = function (val) {
    return /^[\u4E00-\u9FA5A-Za-z]{1,16}$/.test(val);
}
var appendScript = function (src) {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    document.head.appendChild(s);
}
var oldTime = new Date().getTime();
var throttle = function (func, timer, against) {
    var curTime = new Date().getTime();
    if (curTime - oldTime >= timer) {
        oldTime = curTime;
        func();
    } else {
        if (typeof against == 'function')
            against();
        return false;
    }
}

var debounce = function (func, timer) {
    var timeout;
    return function () {
        var _this = this,
            _args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(_this, _args);
        }, timer);
    }
};

export function Sound(para) {
    var src = "";
    switch (para) {
        case "click":
            src = "http://yz.lol.qq.com/v1/map/audio/sfx-ui-buttons-generic-click-01.mp3";
            break;
        case "hover":
            src = "http://yz.lol.qq.com/v1/map/audio/sfx-ui-hover-regions-01.mp3";
            break;
        case "open":
            src = "http://yz.lol.qq.com/v1/map/audio/sfx-ui-sidedrawer-open-01.mp3";
            break;
        case "ding":
            src = "http://yz.lol.qq.com/v1/map/audio/sfx-ui-tome-marker-hit-01.mp3";
            break;
        case "heavy":
            src = "http://yz.lol.qq.com/v1/map/audio/sfx-ui-click-tome-01.mp3";
            break;
        case "hu":
            src = "http://yz.lol.qq.com/v1/map/audio/sfx-ui-hover-tome-01.mp3";
            break;
        default:
            src = "http://yz.lol.qq.com/v1/map/audio/sfx-ui-buttons-generic-click-01.mp3";
            break;
    }
    var audio = $(`<audio><source src='${src}'></source></audio>`);
    $(".sound_wrapper").empty().append(audio);
    $(".sound_wrapper audio")[0].play();
}

var mobile = function () {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    } else {
        return false;
    }
}

function setTime(time) {
    var currentTime = Date.parse(new Date());
    var dateTime = time;
    var d_day = Date.parse(new Date(dateTime.replace(/-/g, "/"))) || time;
    var day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24));
    var hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600));
    var minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60));
    var seconds = Math.abs(parseInt((d_day - currentTime) / 1000));
    if (day > 367) {
        return parseInt(day / 365) + "年前".toString();
    } else if (day > 31) {
        return parseInt(day / 30) + "月前".toString();
    } else if (day >= 2) {
        return parseInt(day) + "天前".toString();
    } else if (day > 0 && day < 2) {
        return "昨天".toString();
    } else if (hour > 0 && hour < 24) {
        return parseInt(hour) + "小时前".toString();
    } else if (minutes > 0 && minutes < 60) {
        return parseInt(minutes) + "分钟前".toString();
    } else if (seconds >= 0 && seconds < 60) {
        return parseInt(seconds) + "秒前".toString();
    }
}


var blur = function (bool) {
    if (bool)
        $(".com_main,.footer,.getTop,.content,.home,.notMain,.form,.score,.container,.loadAni").css('filter', 'blur(5px)');
    else
        $(".com_main,.footer,.getTop,.content,.home,.notMain,.form,.score,.container,.loadAni").css('filter', 'blur(0px)');
}


var webp = (function () {
    var isSupportWebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    return isSupportWebp
})();

var isSeen = function (id, mh) {
    var mh = mh || 100;
    var t = $(id).offset().top - mh;
    if (t >= $(window).scrollTop() && t < ($(window).scrollTop() + $(window).height())) {
        return true;
    } else {
        return false;
    }
}

var pushHistory = function (dowhat) {
    function pushHistory() {
        window.history.pushState({}, "index", "");
    }
    pushHistory();
    window.addEventListener("popstate", function (e) {
        dowhat()
    }, false);
}