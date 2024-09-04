import { PrismaClient } from "@prisma/client";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating,
  hostId
) => {
  const newProperty = {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating,
    hostId,
  };

  const prisma = new PrismaClient();
  const property = await prisma.property.create({
    data: newProperty,
  });

  return property;
};

export default createProperty;
