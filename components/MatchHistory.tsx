"use client";

import { IMatchData, IParticipant } from "@/types";
import { match } from "assert";

interface MatchHistoryProps {
  recentMatches: IMatchData[];
  puuid: string;
}

const calculateKDA = (kills: number, assists: number, deaths: number) => {
  const kda = (kills + assists) / deaths;
  return kda.toFixed(2);
};

const calculateMinionsKilledPerMinute = (
  minionsKilled: number,
  gameDuration: number
) => {
  const gameDurationInMinutes = gameDuration / 60;
  const minionsKilledPerMinute = minionsKilled / gameDurationInMinutes;
  return minionsKilledPerMinute.toFixed(1);
};

const calculateDamagePerMinute = (
  totalDamage: number,
  gameDuration: number
) => {
  const gameDurationInMinutes = gameDuration / 60;
  const damagePerMinute = totalDamage / gameDurationInMinutes;
  return damagePerMinute.toFixed(0);
};

const calculateVisionPerMinute = (
  wardsPlaced: number,
  gameDuration: number
) => {
  const gameDurationInMinutes = gameDuration / 60;
  const visionPerMinute = wardsPlaced / gameDurationInMinutes;
  console.log(wardsPlaced, gameDurationInMinutes);
  return visionPerMinute.toFixed(2);
};

const MatchHistory: React.FC<MatchHistoryProps> = ({
  recentMatches,
  puuid,
}) => {
  return (
    <div className='bg-secondary w-full flex flex-col gap-4'>
      {recentMatches.map((match) => {
        const relevantParticipants = match.info.participants.filter(
          (participant) => participant.puuid === puuid
        );
        return relevantParticipants.map((player) => (
          <div
            key={player.puuid}
            className='flex flex-col bg-primary-foreground p-4 gap-4'
          >
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
            <p className='bg-slate-500'>
              {`${calculateDamagePerMinute(
                player.totalDamageDealtToChampions,
                match.info.gameDuration
              )} DMG/Min`}
            </p>
            <p className='bg-slate-500'>
              {`${calculateVisionPerMinute(
                player.wardsPlaced,
                match.info.gameDuration
              )} Vis/Min`}
            </p>
          </div>
        ));
      })}
    </div>
  );
};

export default MatchHistory;
