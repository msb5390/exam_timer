var brighttime = 10;
var flashtime = 1;
var query = window.location.search;
if (query.substring(0, 1) == '?') {
    query = query.substring(1);
}
var data = query.split('&');
for (i = 0; (i < data.length); i++) {
    data[i] = unescape(data[i]);
    var data_piece = data[i].split('=');
    data[i] = data_piece[1];
}

var start_time = new Date(data[0]);
var end_time = new Date(data[1]);
start_time.setDate(start_time.getDate() + 1);
end_time.setDate(end_time.getDate() + 1);
start_time.setHours(data[2].split(':')[0]);
start_time.setMinutes(data[2].split(':')[1]);
end_time.setHours(data[3].split(':')[0]);
end_time.setMinutes(data[3].split(':')[1]);

start_time = new Date(start_time);
end_time = new Date(end_time);

var repeater;
var frequency = 1000;
//var current_time = new Date();

function doWork() {
//    var flashtime = 1;
//    var brighttime = 10;
    var current_time = new Date();
//    var current_time = Date().getTime();
    console.log(current_time);
    var offset = current_time.getTimezoneOffset();
    console.log(offset);
//    var offset = Date().getTimezoneOffset();
    var distance, hours, minutes, seconds, milliseconds;
    
    document.getElementById('start-time').innerHTML = "Start Time: " + start_time.toLocaleTimeString();
    document.getElementById('end-time').innerHTML = "End Time: " + end_time.toLocaleTimeString();
    //document.getElementById('current-time').innerHTML = "Current Time: " + Date().toLocaleTimeString();
  //  console.log(Date().toLocaleTimeString());
    document.getElementById('current-time').innerHTML = "Current Time: " + current_time.toLocaleTimeString();

    if(start_time  > current_time) {
//    if (start_time.getTime() > Date().getTime()) {
	document.getElementById('body').className = "black-on-white"
//	document.getElementById('clock').innerHTML = Date().toLocaleTimeString();
	document.getElementById('clock').innerHTML = current_time.toLocaleTimeString();
    }
    else if (current_time > end_time) {
	frequency = 1000;
	document.getElementById('body').className = "white-on-black";
	document.getElementById('clock').style = "color:red;";
//	distance = Date().getTime() - end_time.getTime();
		distance = current_time.getTime() - end_time.getTime();
	hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	seconds = Math.floor((distance % (1000 * 60)) / 1000);
	document.getElementById('clock').innerHTML = "+" + hours + "h " + minutes + "m " + seconds + "s";
//	document.write('hello');
    }
    else {

	document.getElementById('body').className = "white-on-black";

//	distance = end_time.getTime() - Date().getTime();
	distance = end_time.getTime() - current_time.getTime();
	hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	seconds = Math.floor((distance % (1000 * 60)) / 1000);
	//if (seconds >= 30) minutes += 1
	milliseconds = distance % 1000;

	if ((hours == 0) && (minutes < brighttime) && (minutes > flashtime)) {
	    document.getElementById('body').className = "black-on-white";
	    document.getElementById('clock').innerHTML = minutes + "m " + seconds + "s"
	}
	else if((hours == 0) && (minutes <= flashtime)) {
	    frequency = 500;
	    if (milliseconds < 500) {
		document.getElementById('body').className = "black-on-white";}
	    else {
		document.getElementById('body').className = "white-on-black";}
	    document.getElementById('clock').innerHTML = minutes + "m " + seconds + "s";
	}
	else {
	    document.getElementById('body').className = "white-on-black";
	    document.getElementById('clock').innerHTML = hours + "h " + minutes + "m";
	}
    }

//    repeater = setInterval(doWork, frequency);
}

//doWork();
setInterval(doWork, 1000);
