import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://ml:5001";

export const analyzeUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: "URL is required" });
    }

    // 1) Try the containerized ML service (HTTP)
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      const response = await fetch(`${ML_SERVICE_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (response.ok) {
        const result = await response.json();
        return res.status(200).json(result);
      }
      console.warn(`[ML] HTTP service returned ${response.status}, falling back to local exec`);
    } catch (err) {
      console.warn("[ML] HTTP service unavailable, falling back to local exec:", (err as Error).message);
    }

    // 2) Fallback: run Python inference directly on the host
    const mlDir = path.resolve(__dirname, "../../../ml");
    const scriptPath = path.join(mlDir, "inference.py");

    exec(`python "${scriptPath}" --url "${url}"`, { cwd: mlDir }, (error, stdout, stderr) => {
      if (error) {
        console.error("ML Error:", error);
        return res.status(500).json({ success: false, message: "Error running ML model" });
      }

      try {
        const result = JSON.parse(stdout);
        if (result.error) {
          return res.status(500).json({ success: false, message: result.error });
        }
        res.status(200).json({ success: true, data: result });
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Stdout:", stdout);
        res.status(500).json({ success: false, message: "Failed to parse ML output" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};