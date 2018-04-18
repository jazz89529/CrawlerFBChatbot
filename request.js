const request = require('request');

let url = 'https://www.cwb.gov.tw/V7/forecast/taiwan/Taipei_City.htm';
//let url = 'https://i.nccu.edu.tw/Home.aspx';
request(url, (err, res, body) => {
	console.log(body);
})

/*
	(1)Everything up-to-date 解法

	git branch
	git checkout master
	git commit -am "xxxyyzzz"
	git push heroku master

	(2)重新啟動 heroku restart -a app_name

	(3)看git 狀態 git status、git log

	(4)停止服務 heroku ps:scale web=0

	(5)單一檔案 沒git上去
		1. git status
		2. git add {File_Name} //the file name you haven been changed
		3. git status
		4. git commit -m '{your_message}'
		5. git push origin master
*/
