"use client";

import { IMatchData, IParticipant } from "@/types";
import getQueueIdData from "@/helpers/getQueueIdData";
import MatchHistoryItem from "./MatchHistoryItem";

interface MatchHistoryProps {
  recentMatches: IMatchData[];
  puuid: string;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({
  recentMatches,
  puuid,
}) => {
  return (
    <div className='w-full flex flex-col gap-4'>
      {recentMatches.map((match) => {
        const relevantParticipants = match.info.participants.filter(
          (participant) => participant.puuid === puuid
        );

        return relevantParticipants.map((player) => (
          <>
            <MatchHistoryItem match={match} player={player} />
            {/* <div
              key={player.puuid}
              className='flex flex-col bg-primary-foreground p-4 gap-4'
            >
              <p>{match.info.gameType}</p>
              <p className='bg-slate-500'>
                {player.win ? <>Victory</> : <>Loss</>}
              </p>
              <p className='bg-slate-500'>
                {calculateKDA(player.kills, player.assists, player.deaths)} KDA
              </p>
              <p className='bg-slate-500'>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p>
              <p className='bg-slate-500'>{match.info.gameMode}</p>
              <p className='bg-slate-500'>
                {`${calculateMinionsKilledPerMinute(
                  player.totalMinionsKilled + player.neutralMinionsKilled,
                  match.info.gameDuration
                )} CS/Min`}
              </p>
              <p className='bg-slate-500'>
                {player.totalMinionsKilled + player.neutralMinionsKilled} CS
              </p>
              <div>
                <p className='bg-slate-500'>
                  {`${calculateDamagePerMinute(
                    player.totalDamageDealtToChampions,
                    match.info.gameDuration
                  )} DMG/Min`}
                </p>
                <p className='bg-slate-500'>
                  {`${calculateDamagePercentageOfTeam(
                    player.totalDamageDealtToChampions,
                    match.info.participants,
                    player.teamId
                  )}% of team`}
                </p>
              </div>
              <p className='bg-slate-500'>
                {`${calculateVisionPerMinute(
                  player.wardsPlaced,
                  match.info.gameDuration
                )} Vis/Min`}
              </p>
              <p className='bg-slate-500'>{`${calculateGoldPerMinute(
                player.goldEarned,
                match.info.gameDuration
              )} Gold/Min`}</p>
              <p className='bg-slate-500'>
                {calculateWhenGameWasPlayed(match.info.gameEndTimestamp)}
              </p>
              <p className='bg-slate-500'>
                {convertUppercaseToTitleCase(player.role)}
              </p>
              {getQueueIdData(match.info.queueId)}
            </div> */}
          </>
        ));
      })}
    </div>
  );
};

export default MatchHistory;
