
var request = require("request");
var login = require("facebook-chat-api");
var SimsimiAnswered;
var text;
var botkey = "http://sandbox.api.simsimi.com/request.p?key=keyowday&lc=vi&ft=1.0&text=";
login(
	{	
	email: "giangtrg20@gmail.com", 
	password: "Giang1qazxc" 
	},
function callback (err, api)
{
	if(err) return console.error(err);
	
	api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent"});
	
	api.listen(function callback(err, message)
	{
		if(message.body === "stopchat") { 
			api.sendMessage(";) Ngừng auto chat thành công.", message.threadID); 
			api.markAsRead(message.threadID);
			return api.logout(err);
		}
		if (message.body==="Getid"||message.body==="getid"||message.body==="get id"||message.body==="Get id") {
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("Your ID: ", message.threadID); 
			api.sendMessage(message.senderID, message.threadID); 
			api.markAsRead(message.threadID); 
			console.log("Sender ID: " + message.senderID);
		}
		else if(message.body === 'Xem Wall') { 
	        api.sendMessage('- - mời click: https://facebook.com/ldmcmob', message.threadID);
			return;
		}
		 else if (message.senderID==="id_loại_trừ_1"||message.senderID==="id_loại_trừ_2") {			 
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			return;
		}else if (message.body)
		{
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			request(botkey + encodeURI(message.body),  
			function(error, response, body)
			{			
				if (error) api.sendMessage("Tao đang đơ, không trả lời được :)", message.threadID);
		var ans = JSON.parse(body);
				if (ans.result == "100")
				{
					SimsimiAnswered = ans.response;
					api.sendMessage(SimsimiAnswered+"\n--------------\n-Mình đang bận nhé ", message.threadID);
					api.markAsRead(message.threadID);
					console.log("Answered:"+SimsimiAnswered);
				}
				if (body.indexOf("502 Bad Gateway") > 0 || body.indexOf("response") < 0)
					api.sendMessage("Đã Xem, Đã Rep ;)"
				);
			});
		}
	});
})