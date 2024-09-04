import { PrismaClient } from "@prisma/client";

const createReview = async (rating, comment, userId, propertyId) => {
  const newReview = {
    rating,
    comment,
    userId,
    propertyId,
  };

  const prisma = new PrismaClient();
  const review = await prisma.review.create({
    data: newReview,
  });

  return review;
};

export default createReview;
