import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();


const storage = multer.diskStorage({
    //destination: 'public/images/uploads',
    destination:(req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) =>{
        //console.log(file.originalname);
        console.log(file);
        //console.log(file.mimetype);
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage });

import { showMinhaContaPage } from "../controllers/minhaContaController.js";
import * as minhaContaController from "../controllers/minhaContaController.js";

router.get("/minhaConta", showMinhaContaPage);
router.patch("/atualizarUtilizador", minhaContaController.atualizarUtilizador);
router.patch("/editarImagem",upload.single('image'), minhaContaController.editarImagem);
export default router;


