import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ unauthorized: true });
  }

  // HTTP POST METHOD - add more tasks

  if (req.method === "POST") {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) {
      return res.status(401).json({ unauthorized: true });
    }

    if (!req.body.data.heading) {
      return res.status(500).json({ error: "validation error" });
    }

    const task = await prisma.task.create({
      data: {
        userId: user.id,
        heading: req.body.data.heading,
      },
    });

    if (task.id) {
      res.status(200).json(task);
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
    res.end();
  }

  // HTTP GET METHOD - get tasks from database

  if (req.method === "GET") {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) {
      return res.status(401).json({ unauthorized: true });
    }

    const tasks = await prisma.task.findMany({
      where: { userId: user.id },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (tasks) {
      res.status(200).json(tasks);
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.end();
  }

  // HTTP DELETE METHOD - delete task

  if (req.method === "DELETE") {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) {
      return res.status(401).json({ unauthorized: true });
    }

    if (!req.body.id) {
      return res.status(500).json({ error: "validation error" });
    }

    const task = await prisma.task.delete({
      where: {
        id: req.body.id,
      },
    });

    if (task) {
      res.status(200).json(task);
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
    res.end();
  }

  // HTTP UPDATE METHOD - update task

  if (req.method === "PUT") {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) {
      return res.status(401).json({ unauthorized: true });
    }

    if (!req.body.data.id) {
      return res.status(500).json({ error: "validation error" });
    }

    const task = await prisma.task.findUnique({
      where: {
        id: req.body.data.id,
      },
    });

    await prisma.task.update({
      where: {
        id: req.body.data.id,
      },
      data: {
        checked: task?.checked === true ? false : true,
      },
    });

    if (task) {
      res.status(200).json(task);
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
    res.end();
  } else {
    // Handle any other HTTP method
  }
}
