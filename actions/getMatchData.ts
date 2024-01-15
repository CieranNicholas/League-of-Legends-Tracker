import { REGION } from "@/types";

const getMatchData = async (matchId: string, region: REGION) => {
  const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`;
  const data = await fetch(url);
  return data.json();
};

export default getMatchData;
