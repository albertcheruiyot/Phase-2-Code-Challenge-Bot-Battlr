import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ enlistedBots, releaseBot, dischargeBot }) {
  const handleDischarge = (botId) => {
    dischargeBot(botId);
  };
  //your bot army code here...
  const handleRelease = (bot) => {
    releaseBot(bot);
  };


  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {/*...and here...*/}
          Your Bot Army
          {/*enlistedBots.map((bot) => (
            <div key={bot.id} className="ui card" onClick={() => handleRelease(bot)} style={{ cursor: "pointer" }}>
              <BotCard bot={bot} />
            </div>
          ))*/}

          {enlistedBots.map((bot) => (
            <BotCard key={bot.id} bot={bot} onClick={() => handleRelease(bot)} onDischarge={handleDischarge}/>
          ))}


        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
