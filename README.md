# exam_timer
A simple browser-based exam timer


To run the timer, open exam_timer_setup.html in a browser. Set up the start date/time and the end date/time, then click the "Set up timer!" button. This uses the get method to pass the relevant arguments to exam_timer.html, which then uses javascript (clock.js) to display the timer.

The timer works as follows:
  1) If current_time is less than start_time, just display current_time.
  2) If start_time < current_time < end_time-10 min: Show time remaining
  3) If current_time > end_time, display a "count-up" timer.
