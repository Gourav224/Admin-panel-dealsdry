import { Router } from "express";
import { registerEmployee, updateEmployee, getEmployeeList, deleteEmployee, getEmployee } from "../controllers/employee.controller.js"
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/create-employee").post(upload.single("avatar"), registerEmployee);

router.route("/update-employee").post(upload.single("avatar"), updateEmployee);


router.route("/get-all-employee").get(getEmployeeList);
router.route("/delete-employee").delete(deleteEmployee);
router.route("/get-employee").post(getEmployee);




export default router;