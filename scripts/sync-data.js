import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

async function runSync() {
  console.log("=== STARTING GIST DATA SYNCHRONIZATION ===");
  try {
    const url = "https://gist.edu.in/gist/computer-science-and-engineering/";
    console.log(`Fetching latest content from: ${url}`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch main site: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract HOD details and information if changes exist
    let hodName = "";
    let hodEmail = "";

    $("h3, h4, p, td, strong").each((_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (text.includes("Dr. Lakshmana Rao") || (text.includes("HOD") && text.includes("Dr."))) {
        // Extract the name part before any academic titles or addresses
        let cleaned = text.split("Ph.D")[0].split("Professor")[0].split(",")[0].trim();
        if (cleaned.length > 5 && cleaned.length < 50) {
          hodName = cleaned;
        }
      }
      if (text.includes("csehod@gist.edu.in")) {
        hodEmail = "csehod@gist.edu.in";
      }
    });

    const dataPath = path.resolve("src/lib/department-data.ts");
    let fileContent = fs.readFileSync(dataPath, "utf-8");
    let updated = false;

    if (hodName && !fileContent.includes(hodName)) {
      console.log(`Updating HOD Name to: ${hodName}`);
      fileContent = fileContent.replace(/name: "Dr\..*?"/, `name: "${hodName}"`);
      updated = true;
    }

    if (hodEmail && !fileContent.includes(hodEmail)) {
      console.log(`Updating HOD Email to: ${hodEmail}`);
      fileContent = fileContent.replace(/email: ".*?"/, `email: "${hodEmail}"`);
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(dataPath, fileContent, "utf-8");
      console.log("Local database successfully updated with latest main website changes!");
    } else {
      console.log("No new updates found. Local database is already in sync with the main website.");
    }
  } catch (error) {
    console.error("Sync Error:", error);
  }
}

runSync();
