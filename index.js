require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const discordLinkRegex = /(\b|^)https?:\/\/cdn\.discordapp\.com\/[a-z0-9/]*\.(png|gif|mp4|jpg|jpeg|gifv|webm|mp4|mp3|wav|ogg)(\b|$)/i


client.on("message",async(msg)=>{
    console.log(msg.cleanContent)
    console.log(discordLinkRegex.test(msg.cleanContent))
    if(msg.channel.id != process.env.CHANNEL) return;
    if(
        msg.attachments.size > 0 || 
        discordLinkRegex.test(msg.cleanContent)
    ) return;
    if(msg.channel.permissionsFor(msg.member).has("MANAGE_MESSAGES")) return;
    try{
        await msg.delete({reason:"Missing Image"});
        await msg.author.send(`Hello! Your message was removed from <#${process.env.CHANNEL}> due to not containing an image! Here is the text from your message:\n\`\`\`${msg.content}\`\`\``)
    } catch (e) {
        console.error(e);
    }

})

client.login(process.env.TOKEN);