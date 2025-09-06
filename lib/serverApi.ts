import { cookies } from "next/headers";
import { nextServer } from "./api"
// import { type Note } from "../types/note";


export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
    return res.data
}
