import { PrismaClient } from "@prisma/client";
import { MongoMemoryServer } from "mongodb-memory-server";

export const createMemoryMongoDbServer = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const uriWithDb = uri + "testDb";

  const stopServer = async () => {
    return mongod.stop();
  };

  return { stopServer, dbUrl: uriWithDb };
};

export const createTestPrismaClient = async () => {
  const { stopServer, dbUrl } = await createMemoryMongoDbServer();
  const prismaClient = new PrismaClient({
    datasources: { db: { url: dbUrl } },
  });
  await prismaClient.$connect();

  return { stopServer, prismaClient };
};
