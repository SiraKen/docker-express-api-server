import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app: express.Express = express();

const PORT = process.env.APP_PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", "*");
    // res.header("Access-Control-Allow-Headers", "*");
    next();
  }
);

app.listen(PORT, () => {
  console.log(`Start on port http://localhost:${PORT}.`);
});

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: "User 1", email: "1@example.local" },
  { id: 2, name: "User 2", email: "2@example.local" },
  { id: 3, name: "User 3", email: "3@example.local" },
];

// ------------------------------------------------------------
// Routes
// ------------------------------------------------------------
/**
 * GET /
 * Hello World
 */
app.get("/", (req: express.Request, res: express.Response) => {
  const data = [{ id: 1, name: "Hello, World!" }];
  res.send(JSON.stringify(data));
});

/**
 * GET /users
 */
app.get("/users", (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(users));
});

/**
 * GET /users/:id
 */
app.get("/users/id/:id", (req: express.Request, res: express.Response) => {
  const userData = users.find((user) => user.id === Number(req.params.id));
  res.send(JSON.stringify(userData));
});
