const Config = require('./Config.json');
const Video = require('./Video.json');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const bot = new Discord.Client();

const streamOptions = {
    seek: 0,
    volume: 0.8
}

bot.login(Config.token);

bot.on('ready', () =>{
    console.log('Bot connecté');
})

bot.on('message', (message) =>{
    if (message.author.bot) return;

    if (message.content.match(/^\?countdown/))
    {
        if (message.member.voice?.channel)
        {
            message.member.voice.channel.join()
            .then(connection =>{
                Play(connection, Video.countdown)
            })
            message.delete({timeout:0});
        }
        else
        {
            message.reply("Please join an audio channel first")
            .then(returnMessage =>{
                returnMessage.delete({timeout: 3000});
            });
        }
    }
    else if (message.content.match(/^\?help/))
    {
        message.channel.send(new Discord.MessageEmbed()
                       .setTitle('Liste des commandes:')
                       .addFields({ name: '?countdown ou ajoute une reaction 😢 à un message', value:'Le bot rejoint votre channel audio et lance un compte à rebours', inline: true}))
        .then(returnMessage =>{
            returnMessage.delete({timeout:6000});
        });
        message.delete({timeout:5500})
        .catch(err => console.log(err));
    }
    else if (message.content.match(/^\?erwan/))
    {
        message.member.voice.channel.join()
            .then(connection =>{
                Play(connection, Video.erwan)
            })
        message.delete({timeout:0});
    }
})

bot.on('messageReactionAdd', (reaction) =>{
    //reaction.message.channel.send("jfioerzjfioer");
    if (reaction.emoji.name == '😢')
    {
        if (reaction.message.member.voice?.channel)
        {
            reaction.message.member.voice.channel.join()
            .then(connection =>{
                Play(connection, Video.countdown)
            })
            //message.delete({timeout:0});
        }
        else
        {
            reaction.message.reply("Please join an audio channel first")
            .then(returnMessage =>{
                returnMessage.delete({timeout: 3000});
            });
        }
    }
})

function Play(connection, url)
{
    let stream;
    if (url == Video.erwan)
    {
        stream = Video.erwan;
    }
    else{
        stream = Video.countdown;
    }
    
    const dispatcher = connection.play(stream, streamOptions);

    dispatcher.on('finish', () => {
        connection.disconnect();
    });
}