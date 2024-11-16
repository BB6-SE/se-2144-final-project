import React from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Deck as DeckType } from "../../types/deck.types";

interface DeckProps extends DeckType {
  // Props automatically get the types from DeckType
}

const Deck: React.FC<DeckProps> = ({ id, deck_name, card_count }) => {
  const manageDeck = () => {
    console.log("Selected deck: ", { deck_name });
  };

  return (
    <div className="w-80 border border-black rounded-[35px] bg-white hover:shadow-lg">
      <div className="w-full h-20 bg-[#03c04a] rounded-t-[35px] flex items-center justify-end px-5">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          onClick={manageDeck}
        >
          <PiDotsThreeCircle size={30} color="white" />
        </button>
      </div>

      <Link
        to={`/flashcards/${id}/${deck_name}`}
        className="p-6 flex flex-col items-start justify-center space-y-2 hover:bg-gray-100 rounded-b-[35px]"
      >
        <div className="text-3xl font-secondaryRegular">{deck_name}</div>
        <div className="text-gray-500 text-lg font-primaryRegular">
          {card_count === 0
            ? "No cards"
            : `${card_count} card${card_count !== 1 ? "s" : ""}`}
        </div>
      </Link>
    </div>
  );
};

export default Deck;
