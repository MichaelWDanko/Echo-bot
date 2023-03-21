const axios = require('axios');
const Discord = require("discord.js");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} 

// About to log values for member.id and member.tag:
// 315984901826412545
// Jaxasaurous#4767

async function getGamertagFromDiscordInteraction(interaction) {
    console.log(`Running getGamertagFromDiscordInteraction`)
    // console.log(`About to log the interaction passed into getGamertagFromDiscordInteraction`)
    // console.log(interaction)

    
    const HALOFUNTIME_API_KEY = process.env.HALOFUNTIME_API_KEY;
    const HALOFUNTIME_API_URL = process.env.HALOFUNTIME_API_URL;
    
    // const member = interaction.options.getUser("member");
    // const member = interaction.member;
    // const discordId = interaction.member.user.id
    // let discordTag = interaction.user.username + "#" + interaction.user.discriminator;
    
    const targetUser = interaction.targetUser
    const targetDiscordId = interaction.targetUser.id
    const targetDiscordTag = interaction.targetUser.discriminator
    // console.log(`The value of targetUser is: ${targetUser}`)
    // console.log(targetUser)

    

    const requestURL = `${HALOFUNTIME_API_URL}/link/discord-to-xbox-live?discordId=${targetDiscordId}&discordTag=${encodeURIComponent(targetDiscordTag)}`
    console.log(`The requestURL is: ${requestURL}`)
    return
    try {
        const response = await axios.get(requestURL, {
            headers: {
                Authorization: `Bearer ${HALOFUNTIME_API_KEY}`,
            },
        });
        // console.log("About to log the value of const: response")
        // console.info(response)

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        // Return the error payload directly if present
        if (error.response && error.response.data) {
            return {
                success: false,
                message: error.response.data,
            };
        }
        console.error("We failed to get a Gamertag for the user")
        console.error(error);
        return {
            success: false,
            message: 'An unexpected error occurred',
        };
    }
}

module.exports = getGamertagFromDiscordInteraction;