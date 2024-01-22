"use client";

import getQueueIdData from "@/helpers/getQueueIdData";
import {
  calculateWhenGameWasPlayed,
  formatGameLength,
} from "@/helpers/matchHistoryHelpers";
import { IMatchData, IParticipant } from "@/types";

interface MatchHistoryItemProps {
  match: IMatchData;
  player: IParticipant;
}

const MatchHistoryItem: React.FC<MatchHistoryItemProps> = ({
  match,
  player,
}) => {
  return (
    <div className='flex bg-primary-foreground p-4 rounded-md'>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <p className='truncate text-sm font-semibold'>
            {getQueueIdData(match.info.queueId)}
          </p>
          <p className='truncate text-gray-400 text-sm'>
            {calculateWhenGameWasPlayed(match.info.gameEndTimestamp)}
          </p>
        </div>
        <div className='bg-white h-[1px] w-full my-2'></div>
        <div className='flex flex-col'>
          <p className='truncate text-gray-400 text-sm'>
            {player.win ? <>Victory</> : <>Loss</>}
          </p>
          <p className='truncate text-gray-400 text-sm'>
            {formatGameLength(match.info.gameDuration)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryItem;
