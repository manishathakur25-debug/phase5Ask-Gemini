import express from "express"
import dotenv from 'dotenv'
import cors from "cors";

import { GoogleGenAI } from "@google/genai"


dotenv.config()
const app=express()
const PORT= process.env.PORT || 3000;

app.use(cors());
// app.use(express.static("Frontend"))
app.use(express.json())

const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})


app.get('/',(req,res)=>{
    res.send('ask gemini backend is running')
})

app.post('/ask-gemini',async(req,res)=>{
    try{
        const {question}=req.body;

        if(!question){
            return res.status(400).json({
                message:"question is required"
            })
        }

        const response=await ai.models.generateContent({
            model:"gemini-3.6-flash",
            contents:question
        });

        const answer=response.text;

        res.json({
            answer:answer
        })
    }catch(error){
        console.error('gemini error',error);
        res.status(500).json({
            error:"something went wrong"
        })
        
    }
})



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

