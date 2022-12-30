import * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  async function getUser() {
    // get userId from request
    const { userId } = getAuth(opts.req);
    // get full user object
    const user = userId ? await clerkClient.users.getUser(userId) : null;
    return user;
  }

  const user = await getUser();

  return { user };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
