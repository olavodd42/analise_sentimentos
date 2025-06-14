import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
output_path = "sentiment.onnx"

# 1) Carrega tokenizer e modelo em PyTorch
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
model.eval()

# 2) Cria um input dummy (batch size 1)
text = "Este produto é excelente!"
inputs = tokenizer(text, return_tensors="pt")

# 3) Exporta para ONNX
torch.onnx.export(
    model,
    (inputs["input_ids"], inputs["attention_mask"]),
    output_path,
    input_names=["input_ids", "attention_mask"],
    output_names=["logits"],
    dynamic_axes={
        "input_ids":    {0: "batch", 1: "sequence"},
        "attention_mask": {0: "batch", 1: "sequence"},
        "logits":       {0: "batch"}
    },
   opset_version=14
)


print(f"✅ ONNX salvo em {output_path}")
