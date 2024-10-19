import React from "react";
import { Games } from "@/Data";

function GameList({handleSportSelect}: {handleSportSelect: (id: number)=>void}) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 mt-4">
      {Games.map((val: GameType) => {
        return (
          <div
            key={val.id}
            className="flex flex-col items-center cursor-pointer "
            onClick={()=>handleSportSelect(val.id)}
          >
            <img
              src={val.image}
              width={45}
              height={45}
              className="hover:animate-bounce transition-all duration-150"
            />
            <h2 className="text-[14px] text-center">{val.name}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default GameList;
