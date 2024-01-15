import { REGION, REGION_NAME } from "@/types";

const getMatchIds = async (puuid: string, region: REGION) => {
  const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
  const data = await fetch(url);
  return data.json();
};

export default getMatchIds;
