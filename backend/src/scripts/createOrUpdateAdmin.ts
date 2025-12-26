import bcrypt from "bcrypt";
import {prisma} from "../config/db";

async function createOrUpdateAdmin() {
  const email = "admin@gmail.com";
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    console.log("Admin password updated!");
  } else {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "Admin",
        role: "admin",
      },
    });
    console.log("Admin created!");
  }
}

createOrUpdateAdmin()
  .catch(console.error)
  .finally(() => process.exit());
