const axios = require("axios");

async function getCSR(xboxLiveGamertag) {
    console.log("Running getCSR function")
    const { HALOFUNTIME_API_KEY, HALOFUNTIME_API_URL } = process.env;

    // Temporary code to always return a test vale
    // const sampleXuid = "sampleXuid value"
    // const samplePlaylist_000 = {
    //     playlistId: "playlistId_000",
    //     playlistName: "playlistName_000",
    //     playlistDescription: "playlistDescription_000",
    //     current: {
    //         csr: 0,
    //         tier: "current.tier_000",
    //         subtier: 0,
    //         tierDescription: "onyx"
    //     },
    //     currentResetMax: {
    //         csr: 0,
    //         tier: "currentResetMax.tier_000",
    //         subtier: 0,
    //         tierDescription: "currentResetMax.tierDescription_000" 
    //     },
    //     allTimeMax: {
    //         csr: 0,
    //         tier: "allTimeMax.tier_000",
    //         subtier: 0,
    //         tierDescription: "allTimeMax.tierDescription_000" 
    //     }
    // }
    // const samplePlaylist_001 = {
    //     playlistId: "playlistId_001",
    //     playlistName: "playlistName_001",
    //     playlistDescription: "playlistDescription_001",
    //     current: {
    //         csr: 0,
    //         tier: "current.tier_001",
    //         subtier: 0,
    //         tierDescription: "onyx"
    //     },
    //     currentResetMax: {
    //         csr: 0,
    //         tier: "currentResetMax.tier_001",
    //         subtier: 0,
    //         tierDescription: "currentResetMax.tierDescription_001" 
    //     },
    //     allTimeMax: {
    //         csr: 0,
    //         tier: "allTimeMax.tier_001",
    //         subtier: 0,
    //         tierDescription: "allTimeMax.tierDescription_001" 
    //     }
    // }
    // const samplePlaylistArray = []
    // samplePlaylistArray.push(samplePlaylist_000)
    // samplePlaylistArray.push(samplePlaylist_001)
    // return {
    //     gamertag: xboxLiveGamertag,
    //     xuid: sampleXuid,
    //     playlists: samplePlaylistArray
    // };
    // End of temporary code.



    try {
        console.log(`getCSR - Making GET request to /halo-infinite/csr?gamertag with ${xboxLiveGamertag}`)
        const response = await axios.get(
        `${HALOFUNTIME_API_URL}/halo-infinite/csr?gamertag=${encodeURIComponent(xboxLiveGamertag)}`,
        {
            headers: {
            Authorization: `Bearer ${HALOFUNTIME_API_KEY}`,
            },
        }
        );
        // console.log(`About to log value of "response"`)
        // console.log(response)
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
        return error.response.data;
        } else {
        console.error(error);
        throw new Error("An unknown error occurred while fetching CSR data.");
        }
    }
}

module.exports = getCSR;