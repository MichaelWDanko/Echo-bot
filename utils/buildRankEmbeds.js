const { EmbedBuilder } = require("discord.js");

function buildRankEmbeds(csrData) {
  const rankEmbeds = [];
  console.log(`Now running function "buildRankEmbeds"`)
  // console.log(`About to log value of csrData that was passed into the function:`)
  // console.log(csrData)


  for (let playlist of csrData.playlists) {
    const currentCSR = playlist.current.csr;
    if (currentCSR !== -1) {
      const currentTierDescription = playlist.current.tierDescription;
      const imageName = currentTierDescription.replace(' ', '-').toLowerCase();
      const rankEmbed = new EmbedBuilder()
        .setTitle(playlist.playlistName)
        .setThumbnail(`https://api.halofuntime.com/static/csr_images/${imageName}.png`)
        .addFields({
          name: `${currentTierDescription} (${currentCSR})`,
          value: `**GT:** \`${csrData.gamertag}\``,
        })
        .setTimestamp()
        .setFooter({ text: 'Current CSR' });
      rankEmbeds.push(rankEmbed);
    }
  }
  if (rankEmbeds.length === 0) {
      let description = `\`${csrData.gamertag}\` is currently unranked.`;
      if (csrData.gamertag === "HFT Intern") {
        description +=
          "\n\nThis is because quantifying my greatness is impossible. You mortals wouldn't understand.";
      }
      rankEmbeds.push(
        new EmbedBuilder().setTitle("Unranked").setDescription(description)
      );
    }

    return rankEmbeds;

  }
  
  module.exports = buildRankEmbeds;