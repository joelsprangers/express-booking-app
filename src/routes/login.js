import { Router } from "express";
import login from "../services/auth/login.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);

    if (!token) {
      res
        .status(401)
        .json({ message: "Invalid credentials, please try again!" });
    } else {
      res
        .status(200)
        .json({ message: "Successfully logged in, enjoy your stay!", token });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
