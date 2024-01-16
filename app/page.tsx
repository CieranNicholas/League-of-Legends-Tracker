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
  // const riotAccountInfo: IRiotAccountInfo = await getRiotPUUID(
  //   REGION.EUROPE,
  //   // "Rum%20Ham",
  //   "oHopey",
  //   // "100",
  //   "0121"
  // );

  // const summonerData: ISummonerInfo = await getSummoner(
  //   riotAccountInfo.puuid,
  //   REGION_NAME.UEW
  // );

  // console.log(summonerData);

  // const matchIds = await getMatchIds(riotAccountInfo.puuid, REGION.EUROPE);

  // console.log(matchIds);

  // const matchId = "EUW1_6768783916";
  // const matchData: IMatchData = await getMatchData(matchId, REGION.EUROPE);

  // console.log(matchData.info.participants);

  return <main className='flex p-24'></main>;
}
