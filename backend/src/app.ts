import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { checkDbConnection } from "./config/db";
import userRoutes from './routes/userRoutes';
import classRoutes from './routes/classRoutes';
import studentRoutes from './routes/studentRoutes';
import subjectRoutes from './routes/subjectRoutes';


import { prisma } from "./config/db";
const app = express();

app.use(cors());

app.use(express.json());
 checkDbConnection();

app.get("/", async (_req, res) => {
    // Get all users
    const users = await prisma.user.findMany();
    console.log(users);

    res.json({ message: "API running 🚀", users });
});
app.get("/tables", async (_req, res) => {
  const tables = await prisma.$queryRaw<
    { tablename: string }[]
  >`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public';
  `;

  res.json(tables);
});

app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);





export default app;
