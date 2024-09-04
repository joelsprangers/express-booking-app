import { PrismaClient } from "@prisma/client";

const getHosts = async () => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany();

  return hosts;
};

export default getHosts;
