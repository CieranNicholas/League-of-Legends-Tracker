import { IParticipant } from "@/types";

export const calculateKDA = (
  kills: number,
  assists: number,
  deaths: number
) => {
  const kda = (kills + assists) / deaths;
  return kda.toFixed(2);
};

export const calculateMinionsKilledPerMinute = (
  minionsKilled: number,
  gameDuration: number
) => {
  const gameDurationInMinutes = gameDuration / 60;
  const minionsKilledPerMinute = minionsKilled / gameDurationInMinutes;
  return minionsKilledPerMinute.toFixed(1);
};

export const calculateDamagePerMinute = (
  totalDamage: number,
  gameDuration: number
) => {
  const gameDurationInMinutes = gameDuration / 60;
  const damagePerMinute = totalDamage / gameDurationInMinutes;
  return damagePerMinute.toFixed(0);
};

export const calculateDamagePercentageOfTeam = (
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
export const calculateVisionPerMinute = (
  wardsPlaced: number,
  gameDuration: number
) => {
  const gameDurationInMinutes = gameDuration / 60;
  const visionPerMinute = wardsPlaced / gameDurationInMinutes;
  return visionPerMinute.toFixed(2);
};

export const calculateGoldPerMinute = (
  goldEarned: number,
  gameDuration: number
) => {
  const gameDurationInMinutes = gameDuration / 60;
  const goldPerMinute = goldEarned / gameDurationInMinutes;
  return goldPerMinute.toFixed(0);
};

export const calculateWhenGameWasPlayed = (gameEndTimestamp: number) => {
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

export const convertUppercaseToTitleCase = (string: string) => {
  const lowerCaseString = string.toLowerCase();
  const titleCaseString =
    lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
  return titleCaseString;
};

export const formatGameLength = (gameDuration: number) => {
  const minutes = Math.floor(gameDuration / 60);
  const seconds = gameDuration % 60;
  return `${minutes}m ${seconds}s`;
};
