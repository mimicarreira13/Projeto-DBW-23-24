import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.API_KEY;
const DEFAULT_MODEL = "mistralai/mistral-7b-instruct";

const instrucoesSchema = mongoose.Schema({
  text: String,
});

const intrucoesDB = mongoose.model("instrucoes", instrucoesSchema);

export async function getInstruções() {
  const queryResult = { success: false, result: null, error: null };
  try {
    queryResult.result = await intrucoesDB.find();
    queryResult.success = true;
  } catch (error) {
    queryResult.error = error;
  }
  return queryResult;
}

export async function storeInstrucoes(instrucaoGerada) {
  const queryResult = { success: false, error: null };
  try {
    const count = await intrucoesDB.countDocuments();
    if (count < 3) {
      const novaInstrucao = new intrucoesDB(instrucaoGerada);
      await novaInstrucao.save();
      queryResult.success = true;
    } else {
      queryResult.error = "A base de dados já contém 3 items";
    }
  } catch (error) {
    queryResult.error = error;
  }
  return queryResult;
}

export async function generate() {
  const queryResult = { success: false, result: null, error: null };

  const getInst = await getInstruções();
  const count = await intrucoesDB.countDocuments();

  if (getInst.result != null && count === 3) {
    queryResult.result = getInst.result;
    queryResult.success = true;
    return queryResult;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: "user",
            content:
                "Breve descrição e instruções para o jogo da forca (tendo em conta que é online e esta informação vai para um site que já tem o jogo)",
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      queryResult.success = true;
      queryResult.result = data.choices[0].message.content;
      await storeInstrucoes({ text: queryResult.result });
    } else {
      throw new Error("Resposta inesperada da API: " + JSON.stringify(data));
    }

    return queryResult;
  } catch (error) {
    queryResult.error = error;
    return queryResult;
  }
}
