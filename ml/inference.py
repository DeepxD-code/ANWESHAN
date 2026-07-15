import os
import numpy as np
import torch
import joblib

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

from urllib.parse import urlparse

def levenshtein_distance(s1, s2):
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)
    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

def predict_url(url):
    model_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(model_dir, "model.pt")
    vectorizer_path = os.path.join(model_dir, "vectorizer.pkl")

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}. Run train_model.py first.")
    if not os.path.exists(vectorizer_path):
        raise FileNotFoundError(f"Vectorizer not found at {vectorizer_path}. Run train_model.py first.")

    # URL Preprocessing: Ensure protocol and www prefix exist for ML vectorizer consistency
    if not (url.startswith("http://") or url.startswith("https://")):
        if url.startswith("www."):
            url = "https://" + url
        else:
            url = "https://www." + url

    model = torch.jit.load(model_path, map_location=device)
    model.eval()
    vectorizer = joblib.load(vectorizer_path)

    features_arr = vectorizer.transform([url]).toarray().astype(np.float32)

    with torch.no_grad():
        X_tensor = torch.tensor(features_arr, dtype=torch.float32).to(device)
        prob = float(model(X_tensor).item())

    risk_score = round((1 - prob) * 100, 2)

    # Typosquatting/Impersonation Check using Levenshtein distance
    is_typosquatted = False
    try:
        parsed = urlparse(url)
        domain = parsed.hostname or url
        if domain.startswith("www."):
            domain = domain[4:]
        domain_name = domain.split('.')[0]
        
        brands = ["paypal", "google", "microsoft", "amazon", "facebook", "instagram", "whatsapp", "netflix", "paytm", "sbi", "hdfc", "icici"]
        for brand in brands:
            dist = levenshtein_distance(domain_name, brand)
            if 0 < dist <= 2:
                is_typosquatted = True
                break
    except Exception:
        pass

    if is_typosquatted:
        risk_score = 100.0
        risk_level = "high"
        scam_type = "Brand Impersonation / Typosquatting"
    else:
        if risk_score < 33:
            risk_level = "low"
            scam_type = "Safe Link"
        elif risk_score < 66:
            risk_level = "medium"
            scam_type = "Suspicious Link"
        else:
            risk_level = "high"
            scam_type = "Generic Phishing"

        if risk_level != "low":
            url_lower = url.lower()
            if any(x in url_lower for x in ["gov", "sarkari", "scheme", "police", "notice", "court", "arrest"]):
                scam_type = "Fake Authority / Government Scam"
            elif any(x in url_lower for x in ["bank", "paytm", "paypal", "secure", "hdfc", "sbi", "icici", "card", "wallet", "verify", "login"]):
                scam_type = "Financial Phishing"
            elif any(x in url_lower for x in ["prize", "win", "free", "lottery", "reward", "cashback", "loan", "gift"]):
                scam_type = "Lottery / Reward Fraud"
            elif any(x in url_lower for x in ["microsoft", "google", "amazon", "facebook", "instagram", "whatsapp", "netflix", "apple"]):
                scam_type = "Brand Impersonation"
            elif any(url_lower.endswith(tld) for tld in [".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".top", ".club", ".work", ".click"]):
                scam_type = "Suspicious Domain"

    return {"risk_score": risk_score, "risk_level": risk_level, "scam_type": scam_type}

import sys
import json
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", type=str, help="URL to analyze")
    args = parser.parse_args()

    if args.url:
        try:
            result = predict_url(args.url)
            print(json.dumps(result))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
    else:
        print(json.dumps({"error": "No URL provided"}))
