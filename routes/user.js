const router = require("express").Router();
const userController = require("../controller/user");

router.patch("/api/user/:userId", userController.patchUserById);

router.delete("/api/user/:userId", userController.deleteUserById);

router.get("/api/user/:userId", userController.getUserById);

router.get("/api/users", userController.getUsers);

router.post("/api/user", userController.postUser);

module.exports = router;
