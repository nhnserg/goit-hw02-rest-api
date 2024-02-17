const express = require("express");
const { validateBody, authToken, upload } = require("../../middlewares");
const { schemasUser } = require("../../services/userModel");
const wrapp = require("../../controllers/user");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemasUser.registerSchema),
  wrapp.register
);

router.post("/login", validateBody(schemasUser.loginSchema), wrapp.login);
router.get("/current", authToken, wrapp.getCurrent);
router.post("/logout", authToken, wrapp.logout);
router.patch(
  "/",
  authToken,
  validateBody(schemasUser.subscriptionSchema),
  wrapp.updateSubscription
);
router.patch(
  "/avatars",
  authToken,
  upload.single("avatar"),
  wrapp.updateAvatar
);

module.exports = router;
