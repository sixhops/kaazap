"use client";

// import { VIEW_SPLASH, type ViewName, getNextView } from "@/app/constants/constants";
import { Card } from "@/app/constants/card-data";
import { Color, COLOR_STRINGS } from "@/app/constants/card-data";

export interface CardBoxProps {
  displayCard: Card;
  clickEvent: () => void;
}

export function CardBox({ displayCard, clickEvent }: CardBoxProps) {
  function handleClick() {
    clickEvent();
  }

  let backColor = ``;
  let lowColor = ``;
  let circleColor = ``;
  let secondaryCircleVisibility = ``;
  let switchSymbolVisibility = ``;
  let plusSymbolVisibility = ``;
  switch (displayCard.color) {
    case COLOR_STRINGS[Color.COLOR_RED]:
      backColor = "bg-red-500";
      lowColor = "bg-red-500";
      circleColor = "bg-red-500";
      secondaryCircleVisibility = "hidden";
      switchSymbolVisibility = "hidden";
      plusSymbolVisibility = "hidden";
      break;
    case COLOR_STRINGS[Color.COLOR_BLUE]:
      backColor = "bg-blue-500";
      lowColor = "bg-blue-500";
      circleColor = "bg-blue-500";
      secondaryCircleVisibility = "hidden";
      switchSymbolVisibility = "hidden";
      break;
    case COLOR_STRINGS[Color.COLOR_SWITCH]:
      backColor =
        "bg-gradient-to-b from-blue-500 from-[0%] via-blue-500 via-[49.5%] to-red-500 to-[50.5%]";
      lowColor =
        "bg-gradient-to-r from-red-500 from-[0%] via-red-500 via-[49.5%] to-blue-500 to-[50.5%]";
      circleColor = "bg-blue-500";
      plusSymbolVisibility = "hidden";
      break;
  }

  return (
    <div
      className="relative flex w-24 h-32 flex-col rounded-lg border border-black/10 bg-gray-300 p-3 pb-0 shadow-sm"
      role="region"
      aria-labelledby="card-slot"
      onClick={handleClick}
    >
      <div
        id="back"
        className={`min-h-[80px] max-h-[80px] w-full rounded-lg mb-3 ${backColor}`}
      ></div>
      <div
        id="backOverlay"
        className="absolute top-[35px] left-[29px] min-w-[36px] max-w-[36px] min-h-[36px] max-h-[36px] h-full bg-gray-300 rotate-45"
      ></div>
      <div
        id="low"
        className={`min-h-[22px] max-h-[22px] rounded-t-lg ${lowColor}`}
      ></div>
      <div
        id="circle"
        className={`min-h-[24px] max-h-[24px] min-w-[24px] max-w-[24px] absolute top-[5px] right-[5px] rounded-full ${circleColor} text-white text-center font-black drop-shadow-sm`}
      >
        {displayCard.selectedValue > 0 ? "+" : "-"}
      </div>
      <div
        id="secondaryCircle"
        className={`${secondaryCircleVisibility} min-h-[24px] max-h-[24px] min-w-[24px] max-w-[24px] absolute top-[5px] right-[65px] rounded-full bg-red-500 text-white text-center font-black drop-shadow-sm`}
      >
        {"-"}
      </div>
      <div
        id="text"
        className={`drop-shadow-2xl relative -top-[88px] min-h-[30px] rounded-[3px] border-2 border-gray-300 bg-black text-white text-center flex items-center justify-center`}
      >
        <p>
          <span className={`${switchSymbolVisibility} relative -top-[1px]`}>
            {"±"}
          </span>
          <span className={`${plusSymbolVisibility} relative -top-[1px]`}>
            {"+"}
          </span>
          {displayCard.selectedValue}
        </p>
      </div>
    </div>
  );
}
