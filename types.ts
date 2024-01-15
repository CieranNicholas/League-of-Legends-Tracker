export enum REGION {
  AMERICAS = "americas",
  ASIA = "asia",
  EUROPE = "europe",
  ESPOIRTS = "esports",
}

export enum REGION_NAME {
  UEW = "euw1",
  EUN = "eun1",
  NA = "na1",
}

export interface IRiotAccountInfo {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface ISummonerInfo {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

// MATCH DATA

export interface IMatchData {
  metadata: IMatchMetadata;
  info: IMatchInfo;
}

interface IMatchMetadata {
  dataVersion: string;
  matchId: string;
  participants: string[];
}

interface IMatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: any[]; // Leave this as any for now, seems like the data is different for different gamemodes
  platformId: string;
  queueId: number;
  teams: IMatchTeam[];
  tournamentCode: string;
}

interface IMatchTeam {
  bans: IMatchBan[];
  objectives: IMatchObjective;
}

interface IMatchBan {
  championId: number;
  pickTurn: number;
}

interface IMatchObjective {
  baron: IMatchObjectiveInfo;
  champion: IMatchObjectiveInfo;
  dragon: IMatchObjectiveInfo;
  inhibitor: IMatchObjectiveInfo;
  riftHerald: IMatchObjectiveInfo;
  tower: IMatchObjectiveInfo;
}

interface IMatchObjectiveInfo {
  first: boolean;
  kills: number;
}
