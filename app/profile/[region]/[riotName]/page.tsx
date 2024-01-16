import getMatchData from "@/actions/getMatchData";
import getMatchIds from "@/actions/getMatchIds";
import getRiotPUUID from "@/actions/getRiotPUUID";
import getSummoner from "@/actions/getSummoner";
import MatchHistory from "@/components/MatchHistory";
import RankOverview from "@/components/RankOverview";
import {
  IMatchData,
  IRiotAccountInfo,
  ISummonerInfo,
  REGION,
  REGION_NAME,
} from "@/types";

function splitString(str: string): [string, string] {
  const splitIndex = str.indexOf("-");
  if (splitIndex === -1) {
    return [str, ""];
  }
  return [str.slice(0, splitIndex), str.slice(splitIndex + 1)];
}

function matchRegion(regionString: string): REGION {
  return REGION[regionString.toUpperCase() as keyof typeof REGION];
}

function matchRegionName(regionString: string): REGION_NAME {
  return REGION_NAME[regionString.toUpperCase() as keyof typeof REGION_NAME];
}

const ProfileMain = async ({
  params,
}: {
  params: { region: string; riotName: string };
}) => {
  const [riotName, tag] = splitString(params.riotName);
  const recentMatches: IMatchData[] = [];

  const riotAccountInfo: IRiotAccountInfo | any = await getRiotPUUID(
    matchRegion(params.region),
    riotName,
    tag
  );

  const summonerData: ISummonerInfo = await getSummoner(
    riotAccountInfo.puuid,
    matchRegionName(params.region)
  );

  const recentMatchIds: string[] = await getMatchIds(
    riotAccountInfo.puuid,
    matchRegion(params.region)
  );

  recentMatchIds.forEach(async (matchId) => {
    const matchData: IMatchData = await getMatchData(
      matchId,
      matchRegion(params.region)
    );
    recentMatches.push(matchData);
  });

  if (riotAccountInfo.status?.status_code === 404) {
    return <div>Summoner not found</div>;
  }

  return (
    <main className='bg-main p-12 flex flex-col'>
      <section className='mb-8'>
        <span className='inline-flex gap-2'>
          <p>{riotName}</p>
          <p>#{tag}</p>
        </span>
      </section>
      <section className='flex'>
        <div className='flex flex-col w-1/3'>
          <RankOverview />
        </div>
        <div className='flex flex-col w-2/3 justify-center'>
          <MatchHistory
            recentMatches={recentMatches}
            puuid={riotAccountInfo.puuid}
          />
        </div>
      </section>
    </main>
  );
};

export default ProfileMain;
