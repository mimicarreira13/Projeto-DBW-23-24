import mongoose from "mongoose";


const contaSchema = mongoose.Schema({
    imagem :String // default ""
});

const fotoPerfilDB = mongoose.model("imagens", contaSchema);

export async function getFotoPerfil() {
  console.log("getFotoPerfil");
  const queryResult = { success: false, result: null, error: null };

  try {
    queryResult.result = await fotoPerfilDB.find({});
    queryResult.success = true;
  } catch (error) {
    console.log("Erro: ", error);
    queryResult.error = error;
  }
  return queryResult;
}

export async function adicionaFoto(novaFoto){
    console.log("novaFoto");
    const queryResult = {success: false, error : null};

    try {
        const nova = new fotoPerfilDB(novaFoto);
        await nova.save();
        queryResult.success = true;

    }catch(error){
        console.log(error);
        queryResult.error = error;
    }

    return queryResult;
}

export async function getFotoById(id){
    const queryResult = {success: false, result: null, error: null};

    try{
        queryResult.result = await fotoPerfilDB.findById(id).exec();

        if(queryResult.result){
            queryResult.success = true;
        }
    }catch(error){
        console.log(error);
        queryResult.error = error;
    }

    return queryResult;
}

export async function updateFotobyId(id,desc){
    console.log("updateFotobyId");

    try{
        const oldFotoQueryResult = getFotoById(id);

        if( oldFotoQueryResult.success == true){
            oldFotoQueryResult.result.imagem = desc;
            oldFotoQueryResult.result.save()
            queryResult.success = true;
        }
        else {
            console.log("erro ao carregar a nova imagem")
        }
    }catch(error){
        console.error(error);
        queryResult.error = error;
    }

    return queryResult;

};
