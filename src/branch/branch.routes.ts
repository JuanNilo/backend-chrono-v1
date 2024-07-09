import express from "express";
import { BranchController } from "./branch.controller";
import { BranchRepository } from "./branch.repository";


const router = express.Router();
const branchController = new BranchController(new BranchRepository());

router.post('/branch', branchController.createBranch.bind(branchController));
router.get('/branch', branchController.getAllBranches.bind(branchController));
router.get('/branch/:id', branchController.getBranchById.bind(branchController));
router.put('/branch/:id', branchController.updateBranch.bind(branchController));
router.delete('/branch/:id', branchController.deleteBranch.bind(branchController));

export default router;