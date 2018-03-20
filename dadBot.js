
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var respond=true;
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
var selectDadJoke = ["What time did the man go to the dentist? Tooth hurt-y.","My dad literally told me this one last week: 'Did you hear about the guy who invented Lifesavers? They say he made a mint.'", "A ham sandwich walks into a bar and orders a beer. Bartender says, 'Sorry we don't serve food here.'","Whenever the cashier at the grocery store asks my dad if he would like the milk in a bag he replies, 'No, just leave it in the carton!'","Why do chicken coops only have two doors? Because if they had four, they would be chicken sedans!","Why did the Clydesdale give the pony a glass of water? Because he was a little horse!","How do you make a Kleenex dance? Put a little boogie in it!","Two peanuts were walking down the street. One was a salted.","I used to have a job at a calendar factory but I got the sack because I took a couple of days off.","How do you make holy water? You boil the hell out of it.","Two guys walk into a bar, the third one ducks.","A woman is on trial for beating her husband to death with his guitar collection. Judge says, 'First offender?' She says, 'No, first a Gibson! Then a Fender!'","Anytime I do something smart my dad says, 'Wow, you're a fart smella...I mean smart fella!'","I had a dream that I was a muffler last night. I woke up exhausted!","How do you tell the difference between a frog and a horny toad? A frog says, 'Ribbit, ribbit' and a horny toad says, 'Rub it, rub it.'","5/4 of people admit that they’re bad with fractions.","You can't plant flowers if you haven't botany.","What's the difference between a good joke and a bad joke timing.","I was just looking at my ceiling. Not sure if it’s the best ceiling in the world, but it’s definitely up there.","I used to have a job collecting leaves. I was raking it in.","Shout out to my grandma, that's the only way she can hear.","Why aren't jet skis called boatercyles?","Toasters were the first form of pop-up notifications.","I've been addicted to cold turkey for 2 years. I keep telling people I'm trying to quit cold turkey but nobody is taking me seriously.","I just read a book about Stockholm syndrome. It was pretty bad at first, but by the end I liked it.","What's the difference between a hippo and a zippo? One is really heavy, the other is a little lighter."];
function getDadJoke(){
	//Get a random dad joke
	 var min=0;
	 var max=selectDadJoke.length-1;
	 var randInt= Math.floor(Math.random()* (max - min)) + min;
	 return selectDadJoke[randInt];
}
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
	
    if (message.toLowerCase().indexOf("i'm ")>-1 && user!="dadBot" && respond) {
		//Classic Dad
			var str = ""
			var i=message.toLowerCase().indexOf("i'm ");
			var myStr=(message.substring(i+4)).split(" ");
			i=0;
			while (myStr[i]==""||myStr[i]=="a" || myStr[i]=="the" || myStr[i]=="an"){
				i++;
			}
			var test=myStr[i].toLowerCase();
			var str=myStr[i];
		//Debug bot.sendMessage({to:channelID, message:i});
			bot.sendMessage({to:channelID, message:"Hi " + str + ", I'm dadBot!  Pleased to meat you, snot a problem!"});
      }
      else if(message.toLowerCase().indexOf("!dad joke")>-1 && user!="dadBot" && respond){
	 //Get a random dad joke
			bot.sendMessage({to:channelID, message:getDadJoke()});
      }  
	  //stop the pain
	  else if(message.toLowerCase().indexOf("!dadbotstop")>-1 && user!="dadBot" && respond){
			  bot.sendMessage({to:channelID, message:"There is not stopping dadTron.  Just kidding.  \nType '!dadbotsAssemble' to start me again."});
			  respond=false;
	  }
	  //i'm a glutton lets get dad bot back
	  else if(message.toLowerCase().indexOf("!dadbotsassemble")>-1 && user!="dadBot" && !respond){
			  bot.sendMessage({to:channelID, message:"You've got to be dadding me.\nType '!dadbotStop' to stop dad facts. \n\n"+getDadJoke()});
			  respond=true; 
	  }
	  //dadbot briefing
	  else if(message.toLowerCase().indexOf("!dadbot")>-1 && user!="dadBot"&& respond ){
			bot.sendMessage({to:channelID, message:"Beeperuski Booperino I am the grand DadBotino!  Your fish is my commandidoodily. \n commands: \n '!dadbotStop' to stop \n '!dadbotsAssemble' to turn back on"});	
	  }

});


