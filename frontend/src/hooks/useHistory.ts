import { useQuery } from "react-query";
import { getHistoryData } from "../api/historyAPI";
import { HistoryDataType, HistoryParamsType } from "../Types/historyType";

export const useQueryHistoryData = (params: HistoryParamsType) => {
  return useQuery<HistoryDataType, Error>(
    ["historyData", params.id],
    () => getHistoryData(params),
    {
      enabled: !!params.id,
      staleTime: 1000 * 60 * 5,
    },
  );
};
