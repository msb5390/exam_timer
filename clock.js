/*
Display a timer for an exam setting. Before the start of the exam, display the current time.
Once the exam begins, show the time remaining for the duration of the exam time.
Default display is white on black to save energy.

Uses GET from exam_timer_setup.html
*/

var brighttime = 10; // Change to black on white when down to brighttime minutes remaining.
var flashtime = 1;   // Begin flashing with flashtime minutes remaining.

// Grab parameters using GET method
var query = window.location.search;

// Drop the '?' from beginning of query.
if (query.substring(0, 1) == '?') {
    query = query.substring(1);
}

// Split the query into start_date, end_date, start_time, end_time.
var data = query.split('&');
for (i = 0; (i < data.length); i++) {
    data[i] = unescape(data[i]);
    var data_piece = data[i].split('=');
    data[i] = data_piece[1]; // Grab just the numbers.
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

function doWork() {
    var current_time = new Date();
    console.log(current_time);
    var offset = current_time.getTimezoneOffset();
    console.log(offset);
    var distance, hours, minutes, seconds, milliseconds;
    
    document.getElementById('start-time').innerHTML = "Start Time: " + start_time.toLocaleTimeString();
    document.getElementById('end-time').innerHTML = "End Time: " + end_time.toLocaleTimeString();
    document.getElementById('current-time').innerHTML = "Current Time: " + current_time.toLocaleTimeString();

    // If exam hasn't started yet, display current time.
    if(start_time  > current_time) {
	document.getElementById('body').className = "black-on-white"
	document.getElementById('clock').innerHTML = current_time.toLocaleTimeString();
    }
    // If exam period is over, start counting up to show how much extra time has elapsed.
    else if (current_time > end_time) {
	frequency = 1000;
	document.getElementById('body').className = "white-on-black";
	document.getElementById('clock').style = "color:red;";
	distance = current_time.getTime() - end_time.getTime();
	hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	seconds = Math.floor((distance % (1000 * 60)) / 1000);
	document.getElementById('clock').innerHTML = "+" + hours + "h " + minutes + "m " + seconds + "s";
    }
    // Otherwise, exam is in progress: Show how much time remains.
    else {
	document.getElementById('body').className = "white-on-black";
	distance = end_time.getTime() - current_time.getTime();
	hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	seconds = Math.floor((distance % (1000 * 60)) / 1000);
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


}

setInterval(doWork, 1000);
