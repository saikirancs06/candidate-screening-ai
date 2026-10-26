process.env.DISABLE_AI = "true";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("./server");
const fs = require("node:fs");
const path = require("node:path");

describe("Candidate Screening API", () => {
  it("GET / should return the API status", async () => {
    const response = await request(app).get("/");

    assert.equal(response.status, 200);
    assert.equal(response.body.message, "Candidate Screening API is running.");
  });

  it("POST /api/screen without a resume should return 400", async () => {
    const response = await request(app)
      .post("/api/screen")
      .field("jobDescription", "JavaScript React SQL");

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Please upload a resume PDF.");
  });

  it("POST /api/screen without a job description should return 400", async () => {
    const response = await request(app)
      .post("/api/screen")
      .attach("resume", Buffer.from("fake PDF content"), {
        filename: "resume.pdf",
        contentType: "application/pdf"
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Job description is required.");
  });

  it("rejects a non-PDF file", async () => {
    const response = await request(app)
      .post("/api/screen")
      .field("jobDescription", "Python SQL Data Analysis")
      .attach("resume", Buffer.from("This is not a PDF"), {
        filename: "resume.txt",
        contentType: "text/plain",
      });

    assert.equal(response.status, 400);
    assert.equal(response.body.error, "Please upload a PDF resume.");
  });

  it("rejects a resume larger than 5 MB", async () => {
    const largeBuffer = Buffer.alloc(5 * 1024 * 1024 + 1, 65);

    const response = await request(app)
      .post("/api/screen")
      .field("jobDescription", "Python SQL Data Analysis")
      .attach("resume", largeBuffer, {
        filename: "large-resume.pdf",
        contentType: "application/pdf",
      });

    assert.equal(response.status, 413);
    assert.match(response.body.error, /too large/i);
  });
  
    it("screens a valid resume and returns matched and missing skills", async () => {
    const resumePath = path.join(__dirname, "sample-resume.pdf");

    const response = await request(app)
        .post("/api/screen")
        .field(
        "jobDescription",
        "Python SQL Pandas NumPy Data Analysis Excel Power BI"
        )
        .attach("resume", fs.readFileSync(resumePath), {
        filename: "sample-resume.pdf",
        contentType: "application/pdf",
        });

    assert.equal(response.status, 200);
    assert.equal(typeof response.body.matchScore, "number");
    assert.ok(Array.isArray(response.body.matchedSkills));
    assert.ok(Array.isArray(response.body.missingSkills));
    assert.ok(response.body.matchedSkills.includes("Python"));
    assert.ok(response.body.missingSkills.includes("Power BI"));
    assert.equal(response.body.matchScore, 86);
    });
});
