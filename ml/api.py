import os
import json
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
from inference import predict_url

app = Flask(__name__)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"success": True, "service": "anweshan-ml"})


@app.route("/analyze", methods=["POST"])
def analyze():
    body = request.get_json(silent=True) or {}
    url = (body.get("url") or "").strip()
    if not url:
        return jsonify({"success": False, "message": "URL is required"}), 400
    try:
        result = predict_url(url)
        return jsonify({"success": True, "data": result})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)