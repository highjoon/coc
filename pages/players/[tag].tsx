import React, { Suspense } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next/types";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import LoadingSpinner from "components/common/loadingSpinner";
import QUERY_KEYS from "constants/queryKeys";
import { getPlayerInfo } from "hooks/useGetPlayerInfo";

const DynamicPlayerSearchResult = dynamic(
  () => import("components/search/searchResult/players"),
  { suspense: true },
);

function PlayerPage() {
  return (
    <>
      <Head>
        <title>Clash of Clans Stats - Player</title>
        <meta
          name="description"
          content="Clash of Clans Stats - 플레이어 정보"
        />
      </Head>
      <Suspense fallback={<LoadingSpinner />}>
        <DynamicPlayerSearchResult />
      </Suspense>
    </>
  );
}

export default PlayerPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tag } = context.query;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery([QUERY_KEYS.players, tag], () =>
      getPlayerInfo(String(tag)),
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    return { notFound: true };
  } finally {
    queryClient.clear();
  }
};
