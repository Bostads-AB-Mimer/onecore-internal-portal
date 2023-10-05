import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export interface RoomType {
  roomTypeId: string;
  name: string;
  materialOptionGroups: MaterialOptionGroup[];
}

export interface MaterialOptionGroup {
  materialOptionGroupId: string;
  roomTypeId: string[];
  name: string | null;
  actionName: string;
  materialOptions: MaterialOption[];
  materialChoices: MaterialChoice[];
  type: string;
}

export interface MaterialOption {
  materialOptionId: string;
  caption: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  materialOptionGroupName: string | null;
  images: string[];
}

export interface MaterialChoice {
  materialChoiceId: string;
  materialOptionId: string;
  materialOptionGroupId: string;
  apartmentId: string;
  roomTypeId: string[];
  status: string;
}

export const useCommittedChoices = (apartmentId: string) => {
  return useQuery<RoomType[], AxiosError>({
    queryKey: ['apartmentCommittedChoices', apartmentId],
    queryFn: async () => {
      const { data } = await axios.get<RoomType[]>(
        `${backendUrl}/rentalproperties/${apartmentId}/material-choices`,
        {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          withCredentials: true,
        }
      )

      return data
    },
    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}