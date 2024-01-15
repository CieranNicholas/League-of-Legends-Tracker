import { REGION_NAME } from "@/types";

const getSummoner = async (puuid: string, region: REGION_NAME) => {
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.RIOT_API_KEY}`;
  const data = await fetch(url);
  return data.json();
};

export default getSummoner;

// https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/K1r0v6UEFO4oKA-RKgpTdwLn7A791D7I6ihAeSGY8XycUCNscm8pYuF6XIf2IkN4vO3YdNtxorMmZw?api_key=RGAPI-bdbd1668-e428-47b2-bb7b-62c9ad3a9a1e

// https://euw1.api.riotgames.com/lol/summoner/v4/by-puuid/K1r0v6UEFO4oKA-RKgpTdwLn7A791D7I6ihAeSGY8XycUCNscm8pYuF6XIf2IkN4vO3YdNtxorMmZw?api_key=RGAPI-bdbd1668-e428-47b2-bb7b-62c9ad3a9a1e
