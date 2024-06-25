import express from 'express';
import { createPost , getPost , deletePost } from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router= express.Router();

router.get('/:id',getPost);
router.post("/create", protectRoute, createPost);
router.post("/:id",deletePost);


export default router;