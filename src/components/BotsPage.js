import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";

function BotsPage() {
  //start here with your code for step one

  const [botsData, setBotsData] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [enlistedBots, setEnlistedBots] = useState([]);

  const handleBotClick = (bot) => {
    setSelectedBot(bot);
  };

  useEffect(() => {
    fetch("http://localhost:8002/bots")
      .then(response => response.json())
      .then(data => setBotsData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleGoBack = () => {
    setSelectedBot(null); // assuming setSelectedBot is the state setter function for the selected bot
  };

  const handleEnlistBot = (bot) => {
    // Check if the bot is already enlisted
    if (!enlistedBots.some((enlistedBot) => enlistedBot.id === bot.id)) {
      setEnlistedBots([...enlistedBots, bot]);
    }
  };

  const handleReleaseBot = (bot) => {
    const updatedEnlistedBots = enlistedBots.filter((enlistedBot) => enlistedBot.id !== bot.id);
    setEnlistedBots(updatedEnlistedBots);
  };

  /*const handleDischargeBot = async (botId) => {
    try {
      // Delete the bot from the backend
      await axios.delete(`http://localhost:8002/bots/${botId}`);

      // Remove the bot from the frontend state
      const updatedEnlistedBots = enlistedBots.filter((bot) => bot.id !== botId);
      setEnlistedBots(updatedEnlistedBots);
    } catch (error) {
      console.error("Error discharging bot:", error);
    }
  };*/

  const handleDischargeBot = async (botId) => {
    try {
      const response = await fetch(`http://localhost:8002/bots/${botId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove the bot from the frontend state
        const updatedEnlistedBots = enlistedBots.filter((bot) => bot.id !== botId);
        setEnlistedBots(updatedEnlistedBots);
      } else {
        console.error("Failed to discharge bot:", response.statusText);
      }
    } catch (error) {
      console.error("Error discharging bot:", error);
    }
  };

  return (
    <div>
      <YourBotArmy enlistedBots={enlistedBots} releaseBot={handleReleaseBot} dischargeBot={handleDischargeBot}/>

      {selectedBot ? (
        <BotSpecs bot={selectedBot} goBack={handleGoBack} enlistBot={handleEnlistBot}/>
      ) : (
        <BotCollection bots={botsData} onBotClick={handleBotClick} />
      )}
    </div>
  )
}

export default BotsPage;
