/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export default async (req: any, res: any) => {
  if (req.method === "POST") {
    const { name, password, email } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (user) {
        return res.status(409).json({ err: "Email already exists" });
      }

      const hash = await bcrypt.hash(password, 0);
      await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: hash,
        },
      });

      return res.status(200).end();
    } catch (err: any) {
      return res.status(503).json({ err: err.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
};
