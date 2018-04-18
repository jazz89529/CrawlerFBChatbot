const request = require('request');
const cheerio = require('cheerio');

let webUrl = 'https://www.cwb.gov.tw/V7/forecast/taiwan/inc/UVI/Tainan_City.htm';

function getRayInfo(callback) {
	let messageResult;
	request(webUrl , (err, res, body) => {
	//console.log(body);
	const $ = cheerio.load(body);

  let ray = [];
  $('img').each(function() { //這裡不能arrow function
		ray.push($(this).attr('src'));
	});

  ray = ray[0].substr(15);
  if(ray.length === 5) ray = ray.substr(0, 1)
  else if (ray.length === 6) ray = ray.substr(0, 2);

	if(0 <= ray <= 2) ray = '紫外線：低量級';
	if(3 <= ray <= 5) ray = '紫外線：中量級';
	if(6 <= ray <= 7) ray = '紫外線：高量級';
	if(8 <= ray <= 10) ray = '紫外線：過量級';
	if(ray >= 11) ray = '紫外線：危險級';

	callback(err, ray);
	})

}

module.exports = getRayInfo;
