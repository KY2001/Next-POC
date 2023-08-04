import { User as FirebaseUser } from 'firebase/auth';
import { Configuration } from '@/openapi/runtime';
import { DefaultApi } from '@/openapi/apis/DefaultApi';

export const getApiConfig = async (user: FirebaseUser): Promise<Configuration> => {
  const idToken = await user.getIdToken();
  return new Configuration({
    accessToken: idToken,
  });
};

export const getApiClientWithCredential = async (user: FirebaseUser): Promise<DefaultApi> => {
  const apiConfig = await getApiConfig(user);
  return new DefaultApi(apiConfig);
};

export const getApiClient = (): DefaultApi => {
  return new DefaultApi();
};
