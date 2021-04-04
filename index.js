require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("message",async(msg)=>{

    if(msg.channel.id != process.env.CHANNEL) return;
    if(msg.attachments.size > 0) return;
    if(msg.channel.permissionsFor(msg.member).has("MANAGE_MESSAGES")) return;

    try{
        await msg.delete({reason:"Missing Image"});
        await msg.author.send(`Hello! Your message was removed from <#${process.env.CHANNEL}> due to not containing an image! Here is the text from your message:\n\`\`\`${msg.content}\`\`\``)
    } catch (e) {
        console.error(e);
    }

})

client.login(process.env.TOKEN);