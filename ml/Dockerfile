FROM python:3.11-slim

WORKDIR /app

COPY requirements-api.txt .
RUN pip install --no-cache-dir -r requirements-api.txt

COPY inference.py .
COPY model.pt .
COPY vectorizer.pkl .
COPY scaler.pkl .
COPY api.py .

ENV PORT=5001
EXPOSE 5001

CMD ["python", "api.py"]