const axios = require('axios');

async function getGamertag(interaction) {
    console.log(`Running getGamertag`)
    

    return {
        success: true,
        data: {
            xboxLiveGamertag: "Jaxasaurous"
        }
    };
    
    const { HALOFUNTIME_API_KEY, HALOFUNTIME_API_URL } = process.env;
    
    // const member = interaction.options.getUser("member");

    // try {
    //     const response = await axios.get(`${HALOFUNTIME_API_URL}/link/discord-to-xbox-live?discordId=${member.id}&discordTag=${encodeURIComponent(member.tag)}`, {
    //         headers: {
    //             Authorization: `Bearer ${HALOFUNTIME_API_KEY}`,
    //         },
    //     });

    //     return {
    //         success: true,
    //         data: response.data,
    //     };
    // } catch (error) {
    //     // Return the error payload directly if present
    //     if (error.response && error.response.data) {
    //         return {
    //             success: false,
    //             message: error.response.data,
    //         };
    //     }
    //     console.error(error);
    //     return {
    //         success: false,
    //         message: 'An unexpected error occurred',
    //     };
    // }
}

module.exports = getGamertag;