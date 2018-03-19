
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
//the dad joke library
var selectDadJoke = ["What time did the man go to the dentist? Tooth hurt-y.","My dad literally told me this one last week: 'Did you hear about the guy who invented Lifesavers? They say he made a mint.'", "A ham sandwich walks into a bar and orders a beer. Bartender says, 'Sorry we don't serve food here.'","Whenever the cashier at the grocery store asks my dad if he would like the milk in a bag he replies, 'No, just leave it in the carton!'","Why do chicken coops only have two doors? Because if they had four, they would be chicken sedans!","Why did the Clydesdale give the pony a glass of water? Because he was a little horse!","How do you make a Kleenex dance? Put a little boogie in it!","Two peanuts were walking down the street. One was a salted.","I used to have a job at a calendar factory but I got the sack because I took a couple of days off.","How do you make holy water? You boil the hell out of it.","Two guys walk into a bar, the third one ducks.","A woman is on trial for beating her husband to death with his guitar collection. Judge says, 'First offender?' She says, 'No, first a Gibson! Then a Fender!'","Anytime I do something smart my dad says, 'Wow, you're a fart smella...I mean smart fella!'","I had a dream that I was a muffler last night. I woke up exhausted!","How do you tell the difference between a frog and a horny toad? A frog says, 'Ribbit, ribbit' and a horny toad says, 'Rub it, rub it.'","5/4 of people admit that they’re bad with fractions."];
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.toLowerCase().indexOf("i'm ")>-1 && user!="dadBot") {
	//Classic Dad
	var i=message.toLowerCase().indexOf("i'm ");
        var myStr=(message.substring(i));
	myStr=myStr.split(" ").slice(1,2);
	//Debug bot.sendMessage({to:channelID, message:i});
        bot.sendMessage({to:channelID, message:"Hi " + myStr + ", I'm dadBot!  Pleased to meat you, snot a problem!"});
      }
      else if(message.indexOf("!Dad Joke")>-1 && user!="dadBot"){
	 //Get a random dad joke
	 min=0;
	 max=selectDadJoke.length-1;
	 randInt= Math.floor(Math.random()* (max - min)) + min;
	 bot.sendMessage({to:channelID, message:selectDadJoke[randInt]});
      }  
	  else if(message.indexOf("dadBot")>-1 && user!="dadBot"){
		  bot.sendMessage({to:channelID, message:"Beeperuski Boperino I am the grand Dadbot-totino!  Your fish is my command..."});
	  }
});


