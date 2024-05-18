"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

  const session = cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject("664730410036e47ad6a4")
    .setKey('c2b582bd327bc955aa2af82d9585080657010b3496fac71c704c06c116df42d522c0ffb18c1a227c88ebcf3790829e8facf248a1c5eeb3aa3641fb3e1f36d0ee6b1ed63017a1ab3c08c1dc45b1ed07104ffd3f6c91f3d68e641f9b457629b66b3e00f53409dace4a8d97b8914a1eb01a8406dd119ac416b66e3db94a969ffe89');
  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client)
    },
    get user() {
      return new Users(client)
    },
  };
}
