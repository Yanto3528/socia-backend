import { MongoMemoryReplSet } from "mongodb-memory-server";

export const createMemoryMongoDbServer = async () => {
  const mongod = await MongoMemoryReplSet.create({
    replSet: { count: 1 },
    instanceOpts: [
      {
        storageEngine: "wiredTiger",
      },
    ],
  });

  const dbName = "test";
  const uri = mongod.getUri();
  const uriSplits = uri.split("?");
  const uriWithDb = uriSplits[0] + dbName + `?${uriSplits[1]}`;

  const stopServer = async () => {
    return mongod.stop();
  };

  return { stopServer, dbUrl: uriWithDb };
};

export const createTestPrismaClient = async () => {
  const { stopServer, dbUrl } = await createMemoryMongoDbServer();

  return { stopServer, dbUrl };
};
