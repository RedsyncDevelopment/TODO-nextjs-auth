# Simple TODO app (with User login)

Try it here: [TODO App with Users](https://todo-nextjs-auth.vercel.app/)

Simple TODO app but rather than just storing task in React state, it has a functionality to store tasks to a PosgreSQL database. To store a task, user has to be loged in. Authentication and authorization are handled via [NextAuth](https://next-auth.js.org/)

## How to use?

This app is NOT Dockerized so you need to complete a few steps if you want to use it locally.
If you want to use this app locally, you need to have PostgreSQL server instance running local. After that, be sure to add

```bash
DATABASE_URL="postgresql://USER_NAME:USER_PASSWORD@localhost:5432/DATABASE_NAME?schema=public"
```

to your `.env` file. After that you need to migrate Prisma model to database with

```bash
npx prisma migrate dev
```

Also, it's nice to have some direct PostgreSQL database visualization tool like [pgAdmin](https://www.pgadmin.org/).
If everything went ok, running

```bash
npm run dev
```

and visiting [localhost:3000](localhost:3000) should show you the app.

## How it works?

Landing page is a simple React ToDo app - you can add some task, mark them as complete or you can remove them - but if you reload the page all the data is lost. So in order to save some users task I've added a PostgreSQL database and user auth. Authentication is done with email - password commbination (which is not the most secure way to handle this, but for a simple app like that I think is enough). For the authorization I've used JWT token.
