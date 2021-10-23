import express from 'express'
import {authUser, getUserProfile, registerUser, updateUserProfile} from "../controllers/userController.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router();


router.route("/login").post(authUser);
router.route("/profile").get(protect , getUserProfile).patch(protect , updateUserProfile);
// router.route("/update");
router.route("/").post(registerUser);

export default router