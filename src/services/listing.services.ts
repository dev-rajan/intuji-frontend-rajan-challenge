import { apiCallHandler } from "@src/lib/api";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";

type QueryConfig = {
  key: QueryKey;
  listingUrl: string;
  params?: Record<string, unknown>;
  id?: string;
  enabled?: boolean;
};

type DetailQueryConfig = {
  key: QueryKey;
  listingUrl: string;
  enabled: boolean;
};

type AddDataConfig = {
  url: string;
};

type DeleteDataConfig = {
  url: string;
};

export const useTableListQuery = ({
  key,
  listingUrl,
  params,
  id,
  enabled = true,
}: QueryConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<unknown, Error, any, QueryKey>({
    queryKey: key,
    queryFn: apiCallHandler({
      method: "get",
      url: listingUrl,
      queryParams: params,
      id: id,
    }),
    staleTime: 1000 * 60 * 2,
    enabled,
  });
};

export const useDetailQuery = ({
  enabled,
  key,
  listingUrl,
}: DetailQueryConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<unknown, Error, any, QueryKey>({
    queryKey: key,
    queryFn: apiCallHandler({
      method: "get",
      url: listingUrl,
    }),
    staleTime: 1000 * 60 * 2,
    enabled,
  });
};

export const useAddData = ({ url }: AddDataConfig) => {
  return useMutation({
    mutationFn: apiCallHandler({
      method: "post",
      url: url,
    }),
  });
};

export const useEditData = ({ url }: AddDataConfig) => {
  return useMutation({
    mutationFn: apiCallHandler({
      method: "patch",
      url: url,
    }),
  });
};

export const useDeleteData = ({ url }: DeleteDataConfig) => {
  return useMutation({
    mutationFn: apiCallHandler({
      method: "delete",
      url: url,
    }),
  });
};
