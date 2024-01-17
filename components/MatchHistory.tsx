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

const calculateDamagePercentageOfTeam = (
  totalDamage: number,
  participants: IParticipant[],
  teamId: number
) => {
  const teamParticipants = participants.filter(
    (participant) => participant.teamId === teamId
  );

  const totalTeamDamage = teamParticipants.reduce((acc, participant) => {
    return acc + participant.totalDamageDealtToChampions;
  }, 0);

  const damagePercentage = (totalDamage / totalTeamDamage) * 100;

  return damagePercentage.toFixed(0);
};

// Doesnt look like this is working correctly
const calculateVisionPerMinute = (
  wardsPlaced: number,
  gameDuration: number
) => {
  const gameDurationInMinutes = gameDuration / 60;
  const visionPerMinute = wardsPlaced / gameDurationInMinutes;
  return visionPerMinute.toFixed(2);
};

const calculateGoldPerMinute = (goldEarned: number, gameDuration: number) => {
  const gameDurationInMinutes = gameDuration / 60;
  const goldPerMinute = goldEarned / gameDurationInMinutes;
  return goldPerMinute.toFixed(0);
};

const calculateWhenGameWasPlayed = (gameEndTimestamp: number) => {
  const gameEndDate = new Date(gameEndTimestamp);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - gameEndDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else if (diffInSeconds < 172800) {
    return "Yesterday";
  } else {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
};

const convertUppercaseToTitleCase = (string: string) => {
  const lowerCaseString = string.toLowerCase();
  const titleCaseString =
    lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
  return titleCaseString;
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
          <>
            <div
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
            </div>
            {/* {player.gameMode === "CLASSIC" } */}
          </>
        ));
      })}
    </div>
  );
};

export default MatchHistory;
