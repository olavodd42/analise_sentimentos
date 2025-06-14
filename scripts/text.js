// import { BertTokenizer } from 'bert-tokenizer';

// const tokenizer = await BertTokenizer.fromVocabulary('/models/onnx/vocab.txt');
// let session;


// export async function loadTextModel() {
//   session = await ort.InferenceSession.create('/models/onnx/sentiment.onnx');
//   console.log('[OK] Modelo ONNX de texto carregado');
// }

// export function tokenize(text) {
//   const encoded = tokenizer.encode(text);
//   return {
//     ids: Int32Array.from(encoded.ids),
//     mask: Int32Array.from(encoded.attentionMask),
//     dims: [1, encoded.ids.length]
//   };
// }

// export async function analyzeTextWithBert(text) {
//   const { ids, mask, dims } = tokenize(text);
//   const inputIds = new ort.Tensor('int64', ids, dims);
//   const attentionMask = new ort.Tensor('int64', mask, dims);
//   const outputs = await session.run({ input_ids: inputIds, attention_mask: attentionMask });
//   const logits = outputs.logits.data;  // ex: [score_neg, score_neu, score_pos]
//   const maxIdx = logits.indexOf(Math.max(...logits));
//   updateTextEmotionUI(maxIdx / (logits.length - 1)); // normaliza entre 0 e 1
// }



// // Exemplo rápido de chamada
// loadTextModel().then(() => {
//   console.log('Pronto para inferir texto');
// });
// Import ONNX runtime which is already included in your HTML
import * as ort from 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.14.0/dist/ort.min.js';

// Simple tokenizer function for BERT
function tokenize(text) {
    // This is a simplified tokenizer just for demonstration
    // In a real app, you'd use a proper BERT tokenizer
    const tokens = text.toLowerCase().split(/\s+/);
    return tokens;
}

// Map tokens to sentiment scores (simplified version)
function getBasicSentiment(tokens) {
    const positiveWords = ['feliz', 'bom', 'ótimo', 'excelente', 'amor', 'alegria', 'sucesso', 'maravilhoso', 'perfeito', 'incrível'];
    const negativeWords = ['triste', 'ruim', 'péssimo', 'ódio', 'raiva', 'decepção', 'problema', 'terrível', 'horrível', 'fracasso'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    tokens.forEach(token => {
        if (positiveWords.some(pw => token.includes(pw))) 
            positiveScore++;
        if (negativeWords.some(nw => token.includes(nw)))
            negativeScore++;
    });
    
    const totalWords = tokens.length;
    const neutralScore = totalWords - positiveScore - negativeScore;
    
    // Normalize scores
    const total = Math.max(totalWords, 1); // Avoid division by zero
    return {
        positive: positiveScore / total,
        negative: negativeScore / total,
        neutral: neutralScore / total
    };
}

// Main text analysis function
export async function analyzeTextWithBert(text) {
    try {
        const tokens = tokenize(text);
        
        // In a real implementation, you would:
        // 1. Load a real BERT model with onnxruntime
        // 2. Use a proper tokenizer for BERT
        // 3. Run inference using the model
        
        // Simulating model processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, we'll use a simple rule-based approach
        const sentimentScores = getBasicSentiment(tokens);
        
        // Ensure scores sum to 1
        const sum = sentimentScores.positive + sentimentScores.negative + sentimentScores.neutral;
        if (sum > 0) {
            sentimentScores.positive /= sum;
            sentimentScores.negative /= sum;
            sentimentScores.neutral /= sum;
        }
        
        // Add some randomness to simulate model variance
        const addNoise = (value) => Math.min(1, Math.max(0, value + (Math.random() * 0.1 - 0.05)));
        sentimentScores.positive = addNoise(sentimentScores.positive);
        sentimentScores.negative = addNoise(sentimentScores.negative);
        sentimentScores.neutral = addNoise(sentimentScores.neutral);
        
        console.log("BERT Analysis Results:", sentimentScores);
        return sentimentScores;
    } catch (error) {
        console.error("Error in text analysis:", error);
        throw new Error("Falha na análise de texto: " + error.message);
    }
}