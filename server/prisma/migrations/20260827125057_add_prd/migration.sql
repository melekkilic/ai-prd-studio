-- CreateTable
CREATE TABLE "Prd" (
    "id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "targetUsers" JSONB NOT NULL,
    "goals" JSONB NOT NULL,
    "nonGoals" JSONB NOT NULL,
    "userStories" JSONB NOT NULL,
    "functionalRequirements" JSONB NOT NULL,
    "nonFunctionalRequirements" JSONB NOT NULL,
    "acceptanceCriteria" JSONB NOT NULL,
    "risks" JSONB NOT NULL,
    "openQuestions" JSONB NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prd_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prd_projectId_key" ON "Prd"("projectId");

-- AddForeignKey
ALTER TABLE "Prd" ADD CONSTRAINT "Prd_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
