-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);
