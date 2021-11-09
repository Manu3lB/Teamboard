import express from "express";
import role from "../controllers/role.js";

const router = express.Router();

//http://localhost:3001/api/role/registerRole
router.post("/registerRole", role.registerRole);
//Tercer paso
router.get("/listRole", role.listRole);
//Cuarto paso
router.get("/findRole/:_id", role.findRole);
router.put("/updateRole", role.updateRole);
router.delete("/deleteRole/:_id", role.deleteRole);

export default router;
