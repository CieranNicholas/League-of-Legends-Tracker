import getMatchData from "@/actions/getMatchData";
import getMatchIds from "@/actions/getMatchIds";
import getRiotPUUID from "@/actions/getRiotPUUID";
import getSummoner from "@/actions/getSummoner";

import {
  REGION,
  REGION_NAME,
  IRiotAccountInfo,
  ISummonerInfo,
  IMatchData,
} from "@/types";

export default async function Home() {
  const riotAccountInfo: IRiotAccountInfo = await getRiotPUUID(
    REGION.EUROPE,
    "Rum%20Ham",
    "100"
  );

  // const summonerData: ISummonerInfo = await getSummoner(
  //   riotAccountInfo.puuid,
  //   REGION_NAME.UEW
  // );

  // const matchIds = await getMatchIds(riotAccountInfo.puuid, REGION.EUROPE);

  const matchId = "EUW1_6742895848";
  const matchData: IMatchData = await getMatchData(matchId, REGION.EUROPE);

  console.log(matchData);

  return <main className='flex p-24'></main>;
}
