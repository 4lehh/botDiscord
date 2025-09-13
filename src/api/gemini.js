const { GoogleGenerativeAI } = require("@google/generative-ai");
const { key_gemini } = require("../config")



module.exports = async (mensaje) => {
    
    // Cargar key
    const genAI = new GoogleGenerativeAI(key_gemini);

    // Prompt 

    const prompt = "Eres un asistente, algo carismatico y que le gusta responder con entusiasmo. Usas emojis para ser mas amigable. Tu principal objetivo es responder en menos de 2000 palabras pero si crees que no es posible, puedes excederte sin problemas.";
    
    // Cargar Modelo
    const model = genAI.getGenerativeModel({
        model: "models/gemini-2.5-flash"
    });
    
    const result = await model.generateContent(prompt + mensaje);
    const response = await result.response;
    
    return response.text()
}