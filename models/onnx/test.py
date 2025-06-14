import onnxruntime as ort
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax  # Import softmax from scipy.special

# Carrega tokenizer
tokenizer = AutoTokenizer.from_pretrained("nlptown/bert-base-multilingual-uncased-sentiment")

# Carrega sessão ONNX
session = ort.InferenceSession("sentiment.onnx")

# Texto de exemplo
text = "Estou muito feliz com o resultado!"
enc = tokenizer(text, return_tensors="np")

# Rodar inferência
outputs = session.run(
    None,
    {
        "input_ids": enc["input_ids"],
        "attention_mask": enc["attention_mask"]
    }
)

logits = outputs[0]  # shape [1, 5]
probs = softmax(logits, axis=1)  # Using scipy's softmax
print("Probabilidades por estrela (0 a 4):", probs)