import { getProfile } from "../api/user";

export default async function useAuth(credentials, func) {
  let credentialsErrors;
  const loading = false;
  const res = await func(credentials).then(({ data }) => data);
  if (!res.granted) credentialsErrors = res;
  if (res.granted) {
    const profile = await getProfile().then((p) => p);
    return { profile, loading, credentialsErrors: null };
  }
  return { credentialsErrors, loading, profile: null };
}
