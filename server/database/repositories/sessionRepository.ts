import prisma from "~/server/database/client";

import { User } from "@prisma/client";

export async function createSession(sessionData: ISession): Promise<ISession> {
  if (!sessionData.authToken || sessionData.userId === undefined) {
    throw Error("missing auth token for session");
  }

  return await prisma.session.create({
    data: {
      userId: sessionData.userId,
      authToken: sessionData.authToken,
    },
  });
}

export async function getSessionByAuthToken(
  authToken: string
): Promise<ISession> {
  const user: User = (await getUserByAuthToken(authToken)) as unknown as User;

  return { authToken, user } as ISession;
}

async function getUserByAuthToken(authToken: string): Promise<User | null> {
  return prisma.session
    .findUnique({
      where: {
        authToken: authToken,
      },
    })
    .user();
}
