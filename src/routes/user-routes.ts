import { UserController } from "../controller/user-controller";
import { UserService } from "../services/user-service";
import { Bcrypt } from "../utils/bcrypt";
import expess from "express";
import { JWT } from "../utils/jwt";
import { Auth } from "../middleware/auth-middleware";
import { validationMiddleWare } from "../middleware/validation-middleware";
import { loginSchema, signupSchema } from "../utils/zod-schema";

const bcrypt = new Bcrypt();
export const jwt = new JWT();
export const authMiddleWare = new Auth(jwt);
const userService = new UserService(bcrypt, jwt);
const userController = new UserController(userService);

const userRoutes = expess.Router();

userRoutes.post(
  "/auth/login",
  validationMiddleWare(loginSchema),
  userController.login.bind(userController)
);

userRoutes.post(
  "/auth/signup",
  validationMiddleWare(signupSchema),
  userController.signUp.bind(userController)
);

userRoutes.post(
  "/auth/logout",
  authMiddleWare.isAuth.bind(authMiddleWare),
  userController.logout.bind(userController)
);

userRoutes.post(
  "/auth/refresh",
  authMiddleWare.isRefresh.bind(authMiddleWare),
  userController.refresh.bind(userController),
);

export default userRoutes;
