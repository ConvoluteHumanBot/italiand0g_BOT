const Discord = require('discord.js')
const client = new Discord.Client()
const ytdl = require('ytdl-core')
const streamOptions = { seek:0, volume:1};

let commandsBot=["quote","summon","leave","petto","tilt","flame"] //list of commands 

client.on('message', (receivedMessage) => {
    console.log("Connected as " + client.user.tag)
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    switch (receivedMessage.content[0]){ //Switch case to separate commands from bot@ mentions
        case "!":
            processCommand(receivedMessage);
            break;
        default:
            replyToUser(receivedMessage);
    }
})



function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments
    
    switch (primaryCommand) {  //Switch case to process the command, TODO:: call function by function name
        case "multiply":
            multiplyCommand(arguments, receivedMessage);
            break;
        case "quote":
            aforisma(arguments,receivedMessage);
            break;
        case "summon":
            summon(receivedMessage);
            break;
        case "leave":
            disconnectChannel(receivedMessage);
            break;
        case "trigger":
            bot_zero(receivedMessage);
            break;
        case "petto":
            tito_latella(receivedMessage);
            break;
        case "flame":
            dogHASspoken(receivedMessage);
            break;
        case "giveup":
            lee_sin(receivedMessage);
            break;
        case "tilt":
            madding_a_bit(receivedMessage);
            break;
        default:
            helpCommand(arguments, receivedMessage);
    }
}

function madding_a_bit(receivedMessage){
    receivedMessage.member.voiceChannel.join()
    .then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=A7XrRrJn7GI',{ filter : 'audioonly'});
        const dispatcher = connection.playStream(stream, streamOptions);
      })
    .catch(err => console.log(err));
}

function lee_sin(receivedMessage){
    receivedMessage.member.voiceChannel.join()
    .then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=Y7h9cisFQEc',{ filter : 'audioonly'});
        const dispatcher = connection.playStream(stream, streamOptions);
      })
    .catch(err => console.log(err));
}

function disconnectChannel(receivedMessage){
    if(receivedMessage.guild.voiceConnection){ //Disconnect the bot from current voice channel only if it's already in
        receivedMessage.guild.voiceConnection.disconnect();
    }else{
        receivedMessage.channel.send("I need to be in a voice channel first")
    }
}

function bot_zero(receivedMessage){
    let bestemmie = ['Orrrrco dio',
                    'Dio bbestia',
                    'Dioschifoso porco',
                    'Una SSssega diocane',
                    'Sei un fallito, con gli occhiali!',
                    'Spara diocane!'
                    ]
    let bestemmia = bestemmie[Math.floor(Math.random()*bestemmie.length)];
    receivedMessage.channel.send(bestemmia)
}

function dogHASspoken(receivedMessage){
    let yturls =[
        'https://www.youtube.com/watch?v=wL5Trajg2rI',
        'https://www.youtube.com/watch?v=CWLzsiuJdbA',
        'https://www.youtube.com/watch?v=avpFFPDCnd4',
        'https://www.youtube.com/watch?v=wRFpmSqTMGo',
        'https://www.youtube.com/watch?v=lPcgxjEx3AU',
        'https://www.youtube.com/watch?v=TDG763Ifdnc',
        'https://www.youtube.com/watch?v=1Wi61CPB4wk'
    ]
    let citazione =yturls[Math.floor(Math.random()*yturls.length)]
    receivedMessage.member.voiceChannel.join()
    .then(connection => {
        const stream = ytdl(citazione,{ filter : 'audioonly'});
        const dispatcher = connection.playStream(stream, streamOptions);
      })
    .catch(err => console.log(err));
    
}

function summon(receivedMessage){
    if (!receivedMessage.guild) return;

    // Only try to join the sender's voice channel if they are in one themselves (and it's joinable)
    if (receivedMessage.member.voiceChannel && receivedMessage.member.voiceChannel.joinable) {
      receivedMessage.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          console.log('I have successfully connected to the channel!');
        })
        .catch(console.log);
    } else {
      receivedMessage.reply('You need to join a non-private voice channel first!');
    }
}

function helpCommand(arguments, receivedMessage) {
    receivedMessage.channel.send("Available commands::  " + commandsBot)
}

function tito_latella(receivedMessage){
    let tito = "TITO LATELLA"
    receivedMessage.channel.send(tito)
}

function replyToUser(receivedMessage){
    if(receivedMessage.isMentioned(client.user)){
        console.log("Message received: ",receivedMessage.content)
        receivedMessage.channel.send("<@"+receivedMessage.author.id+"> MAIALE!")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

function aforisma(arguments, receivedMessage){
    let bestQuotes =["E' ancora top... E' ANCORA TOP!!!",
                    "XD...faccina uuhh... SCRIVIMI  E  VIENI  SU   DISCORD!",
                    "I mean on the toweeeeer..",
                    "STOP PLS STOP PLS STOP PLS STOP",
                    "TTTEEEEEEEEAAAAAAAAAAAM   MA   DOVE   CAZZO   SIETE!?!?!?",
                    "TF ULT POST MORTEM!",
                    "Adesso carico il pugno, lo carico, lo CARICO CAZZOOOO!",
                    "Community di pazzi sclerati!",
                    "Im madding a bit.....",
                    "I gotta ganked 30 seconds ago!",
                    "Come fa amumu? HIHIHI",
                    "Su questo account ho la macumba"];
    let chosenQuote = bestQuotes[Math.floor(Math.random()*bestQuotes.length)];
    receivedMessage.channel.send(chosenQuote)
}



bot_secret_token = "NDI2MTA0NTE3Nzg1MDI2NTYw.D1nj4A.VK9emLYVd3-ayMCmUqAR-TCWD9U"

client.login(bot_secret_token)