const Config = require('./Config.json');
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

    if (message.content.match(/^!countdown/))
    {
        if (message.member.voice?.channel)
        {
            message.member.voice.channel.join()
            .then(connection =>{
                Play(connection)
            })
        }
        else
        {
            message.reply("Please join an audio channel first");
        }
    }
})

function Play(connection)
{
    //let stream = ytdl('https://www.youtube.com/watch?v=zturQR5yJgA', { quality: 'highestaudio', filter: 'audioonly'});
    let stream = ytdl('https://www.youtube.com/watch?v=KOoCEIwswYg', { quality: 'highestaudio', filter: 'audioonly'});
    const dispatcher = connection.play(stream, streamOptions);

    dispatcher.on('finish', () =>{
        connection.disconnect();
    });
}