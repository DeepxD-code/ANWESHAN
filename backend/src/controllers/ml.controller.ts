import { Request, Response } from "express";
import { exec } from "child_process";
import path from "path";

export const analyzeUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: "URL is required" });
    }

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
