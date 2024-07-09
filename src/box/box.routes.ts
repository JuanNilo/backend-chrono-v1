import express from "express";
import { BoxController } from "./box.controller";
import { BoxRepository } from "./box.repository";


const router = express.Router();
const boxController = new BoxController(new BoxRepository());

router.post('/box', boxController.createBranch.bind(boxController));
router.get('/box', boxController.getAllBranches.bind(boxController));
router.get('/box/:id', boxController.getBranchById.bind(boxController));
router.put('/box/:id', boxController.updateBranch.bind(boxController));
router.delete('/box/:id', boxController.deleteBranch.bind(boxController));

export default router;