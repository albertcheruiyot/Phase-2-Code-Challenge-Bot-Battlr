import React from "react";
import BotCard from "./BotCard";

function BotCollection({bots, onBotClick}) {
  // Your code here
  return (
    <div className="ui four column grid">
      <div className="row">
        {/*...and here..*/}
    
        {bots.map(bot => (
          <BotCard key={bot.id} bot={bot} onClick={() => onBotClick(bot)}/>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
