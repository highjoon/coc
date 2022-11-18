import axios, { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import QUERY_KEYS from "constants/queryKeys";
import { API_CLIENT_URL } from "constants/http";
import { APILocationList, APIResponse } from "types/api";

interface APILocationData extends APILocationList {
  locationName?: string;
}

interface IParams {
  locationId: string;
  options?: UseQueryOptions<
    APIResponse<APILocationData>,
    AxiosError<{ status: number; message: string }>,
    APIResponse<APILocationData>,
    string[]
  >;
}

export const getLocations = async (
  locationId: string,
): Promise<APIResponse<APILocationData>> => {
  const response = await axios.get<APIResponse<APILocationData>>(
    `${String(API_CLIENT_URL)}/api/locations/${locationId}`,
  );

  return response.data;
};

const useGetLocations = ({ locationId, options }: IParams) => {
  return useQuery([QUERY_KEYS.locations], () => getLocations(locationId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    ...options,
  });
};

export default useGetLocations;
