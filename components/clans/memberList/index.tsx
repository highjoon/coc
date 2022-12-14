import React from "react";
import { useRouter } from "next/dist/client/router";
import DataCard from "components/common/dataCard";
import { IProps } from "./types";

function ClanMemberList({ memberList, members }: IProps) {
  const router = useRouter();

  const moveToPlayerDetail = (tag: string) => {
    router.push({ pathname: `/players/${encodeURIComponent(tag)}` });
  };

  return (
    <div className="flex flex-col justify-center w-full py-2 bg-white rounded-lg">
      <div className="w-full pb-2 text-lg font-bold text-center border-b-2 border-b-default">
        <span>클랜원 </span>
        {members}
        <span>명</span>
      </div>
      {memberList.map((member) => (
        <DataCard
          key={member.tag}
          tag={member.tag}
          rank={member.clanRank}
          imgUrl={member.league.iconUrls.small}
          name={member.name}
          donations={member.donations}
          donationsReceived={member.donationsReceived}
          role={member.role}
          level={member.expLevel}
          onClickHandler={moveToPlayerDetail}
        />
      ))}
    </div>
  );
}

export default ClanMemberList;
