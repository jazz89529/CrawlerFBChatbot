const login = require('facebook-chat-api');
const getWeatherInfo = require('./getWeatherInfo');
const getRayInfo = require('./getRayInfo.js');

let account = {
	email: '',
	password: ''
}

function send(time){
	time = '現在時刻：' + time;
	login(account, function(err, api) {

		getWeatherInfo(function(err, weatherData) {
			getRayInfo(function(err, rayData) {
				let receiverID = 100005505486728;//sie
				let data = [];
				data.push(time);
				data.push(weatherData);
				data.push(rayData);
				data = data.join('\n');
				api.sendMessage(data, receiverID);
			})
		})

		getWeatherInfo(function(err, weatherData) {
			getRayInfo(function(err, rayData) {
				let receiverID = 100002665725764;
				let data = [];
				data.push(time);
				data.push(weatherData);
				data.push(rayData);
				data = data.join('\n');
				api.sendMessage(data, receiverID);
			})
		})
	})
}


function startTime() {
	var today=new Date()
	var h=today.getHours()
	var m=today.getMinutes()
	var s=today.getSeconds()

	m=checkTime(m)
	s=checkTime(s)

	if(h+":"+m+":"+s == '21:00:00') send(h+":"+m+":"+s); // 晚上九點
	if(h+":"+m+":"+s == '06:00:00') send(h+":"+m+":"+s); // 早上六點

	console.log(h+":"+m+":"+s);
}
function checkTime(i) {
	if (i<10)
	  {i="0" + i}
	  return i
}
setInterval(function() {
	startTime();
},1000)
// console.log(h+":"+m+":"+s)
