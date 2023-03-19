const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} 

async function getGamertagFromDiscordInteraction(interaction) {
    console.log(`Running getGamertagFromDiscordInteraction`)
    
    // Temporary code to always return a test vale
    return {
       discordUserId: "Jaxasaurous",
       discordUserTag: "4767",
       xboxLiveXuid: 2535429473929971,
       xboxLiveGamertag: "Jaxasaurous",
       verified: true
    };
    
    const HALOFUNTIME_API_KEY = process.env.HALOFUNTIME_API_KEY;
    const HALOFUNTIME_API_URL = process.env.HALOFUNTIME_API_URL;
    
    const member = interaction.options.getUser("member");

    try {
        const response = await axios.get(`${HALOFUNTIME_API_URL}/link/discord-to-xbox-live?discordId=${member.id}&discordTag=${encodeURIComponent(member.tag)}`, {
            headers: {
                Authorization: `Bearer ${HALOFUNTIME_API_KEY}`,
            },
        });

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
        console.error(error);
        return {
            success: false,
            message: 'An unexpected error occurred',
        };
    }
}

module.exports = getGamertagFromDiscordInteraction;