 
 

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }   from "@google/generative-ai" ;
  
  const apiKey = "AIzaSyA_RB5CnizCrczoGFB1_3Mvc0MhelLbuDE";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    const response=result.response.text();
    return response
    
  }
  
     export default  run;