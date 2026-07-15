import os
import re
import math
import numpy as np
import pandas as pd
from urllib.parse import urlparse
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import HashingVectorizer
import joblib

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"PyTorch device: {device}")

ML_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(ML_DIR, "phiusiil_dataset.csv")

def load_dataset():
    if not os.path.exists(DATASET_PATH):
        from ucimlrepo import fetch_ucirepo
        phiusiil = fetch_ucirepo(id=967)
        df = phiusiil.data.original
        df.to_csv(DATASET_PATH, index=False)
    else:
        df = pd.read_csv(DATASET_PATH)

    print(f"[*] Processing {len(df)} URLs...")
    vectorizer = HashingVectorizer(n_features=256, analyzer='char', ngram_range=(2, 5))
    X = vectorizer.transform(df['URL']).toarray().astype(np.float32)
    y = df['label'].values.astype(np.float32)
    
    print(f"[*] Features: {X.shape[1]}, Samples: {len(X)}")
    print(f"[*] Class distribution: legitimate={sum(y==1)}, phishing={sum(y==0)}")
    return X, y, vectorizer

class PhishingDetector(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.net(x)

def train_model():
    print("=" * 60)
    print("  Phishing URL Detector - 256 Features (HashingVectorizer)")
    print("=" * 60)

    X, y, vectorizer = load_dataset()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"[*] Train: {len(X_train)}, Test: {len(X_test)}")

    X_train_t = torch.tensor(X_train, dtype=torch.float32)
    y_train_t = torch.tensor(y_train, dtype=torch.float32).view(-1, 1)
    X_test_t = torch.tensor(X_test, dtype=torch.float32)
    y_test_t = torch.tensor(y_test, dtype=torch.float32).view(-1, 1)

    train_loader = DataLoader(TensorDataset(X_train_t, y_train_t), batch_size=2048, shuffle=True)
    test_loader = DataLoader(TensorDataset(X_test_t, y_test_t), batch_size=2048, shuffle=False)

    model = PhishingDetector(256).to(device)
    criterion = nn.BCELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.002)

    print(f"\n[*] Model: 256 features -> 256 -> 128 -> 1")
    
    epochs = 20
    best_val_loss = float('inf')
    
    for epoch in range(epochs):
        model.train()
        train_loss, train_correct, train_total = 0.0, 0, 0
        for X_batch, y_batch in train_loader:
            X_batch, y_batch = X_batch.to(device), y_batch.to(device)
            optimizer.zero_grad()
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)
            loss.backward()
            optimizer.step()
            train_loss += loss.item() * X_batch.size(0)
            train_correct += ((outputs >= 0.5).float() == y_batch).sum().item()
            train_total += y_batch.size(0)
        
        train_loss /= train_total
        train_acc = train_correct / train_total

        model.eval()
        val_loss, val_correct, val_total = 0.0, 0, 0
        with torch.no_grad():
            for X_batch, y_batch in test_loader:
                X_batch, y_batch = X_batch.to(device), y_batch.to(device)
                outputs = model(X_batch)
                loss = criterion(outputs, y_batch)
                val_loss += loss.item() * X_batch.size(0)
                val_correct += ((outputs >= 0.5).float() == y_batch).sum().item()
                val_total += y_batch.size(0)
        
        val_loss /= val_total
        val_acc = val_correct / val_total

        print(f"Epoch {epoch+1:2d}/{epochs} - Train Loss: {train_loss:.4f} Acc: {train_acc:.4f} | Val Loss: {val_loss:.4f} Acc: {val_acc:.4f}")
        
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), os.path.join(ML_DIR, "model_weights.pt"))

    model.eval()
    example_input = torch.randn(1, 256).to(device)
    traced_model = torch.jit.trace(model, example_input)
    traced_model.save(os.path.join(ML_DIR, "model.pt"))
    joblib.dump(vectorizer, os.path.join(ML_DIR, "vectorizer.pkl"))

    print(f"\n[+] Model saved to: {os.path.join(ML_DIR, 'model.pt')}")
    print(f"[+] Vectorizer saved to: {os.path.join(ML_DIR, 'vectorizer.pkl')}")

if __name__ == "__main__":
    train_model()
