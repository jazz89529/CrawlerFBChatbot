const request = require('request');
const cheerio = require('cheerio');

let webUrl = 'https://www.cwb.gov.tw/V7/forecast/taiwan/Tainan_City.htm';

function getWeatherInfo(callback) {
	let messageResult;
	request(webUrl , (err, res, body) => {
	//console.log(body);
	const $ = cheerio.load(body);

	let weather = [];
	$('table.FcstBoxTable01 > tbody > tr').each(function() { //這裡不能arrow function
		weather.push($(this).text().split('\n'));
	});

	weather.pop();
	weather.pop();

	let result = weather.map((elem) => {
		return {
			time: elem[1].trim().split(' ')[0],
			temp: elem[2].trim(),
			rain: elem[6].trim()
		}
	});

	let message = result.map(function(e) {
		return e.time + '=> 溫度：' + e.temp + '，降雨機率：' + e.rain;
	}).join('\n');

	callback(err, message);
	})

}

module.exports = getWeatherInfo;
