import express from "express";
import {
    createStaffMember,
    loginController,
    getAllStaffMembers,
    getStaffMemberById,
    updateProfileController,
    deleteStaffMemberById,
    sendRegistrationConfirmationEmail,
    getAllExpertIn,
    getStaffByExpertise,
} from "../controllers/staffController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";



const router = express.Router();


router.post("/create-staff", createStaffMember);
router.post("/send-registration-email", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
      await sendRegistrationConfirmationEmail(email);
      res.status(200).json({ success: true, message: "Registration confirmation email sent successfully" });
    } catch (error) {
      console.error("Error sending registration confirmation email:", error);
      res.status(500).json({ success: false, message: "Error sending registration confirmation email" });
    }
  });

router.get("/staff",  getAllStaffMembers);
router.get("/staff/:id", getStaffMemberById);
router.put('/profile-staff', requireSignIn, updateProfileController);
router.delete("/staff/:id", deleteStaffMemberById);

router.get("/staff-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get('/expertise/all', getAllExpertIn);
router.get('/expertise/:expertise', getStaffByExpertise);


export default router;
