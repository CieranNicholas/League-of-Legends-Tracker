import { REGION } from "@/types";

const getRiotPUUID = async (
  region: REGION,
  gameName: string,
  tagLine: string
) => {
  const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.RIOT_API_KEY}`;
  const res = await fetch(url);
  return res.json();
};

export default getRiotPUUID;
