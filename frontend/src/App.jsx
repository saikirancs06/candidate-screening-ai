import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { FileText, Upload, Sparkles, CheckCircle, AlertCircle, LoaderCircle } from "lucide-react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!file || !jobDescription.trim()) {
      setError("Please upload a resume PDF and enter a job description.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("http://localhost:5000/api/screen", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Screening failed.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Unable to connect to the screening server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand-icon"><Sparkles size={23} /></div>
        <div>
          <h1>TalentMatch AI</h1>
          <p>Candidate screening workspace</p>
        </div>
        <span className="status">AI screening</span>
      </header>

      <section className="intro">
        <span className="eyebrow">SMARTER RECRUITMENT</span>
        <h2>Find the right skills for the right role.</h2>
        <p>Upload a candidate's resume and compare it with a job description to identify matching and missing skills.</p>
      </section>

      <form className="workspace" onSubmit={handleSubmit}>
        <section className="panel">
          <div className="section-heading">
            <FileText size={20} />
            <h3>Candidate resume</h3>
          </div>

          <label className="upload-area">
            <Upload size={30} />
            <strong>{file ? file.name : "Upload a resume"}</strong>
            <span>{file ? "PDF selected" : "Choose a PDF file from your computer"}</span>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => setFile(event.target.files[0] || null)}
            />
          </label>

          <p className="helper">PDF format only. Upload a resume you have permission to process.</p>
        </section>

        <section className="panel">
          <div className="section-heading">
            <FileText size={20} />
            <h3>Job description</h3>
          </div>

          <label className="field-label" htmlFor="jobDescription">Required qualifications and skills</label>
          <textarea
            id="jobDescription"
            rows="10"
            placeholder="Example: Looking for a developer with JavaScript, React, Node.js, REST APIs, SQL and Git experience..."
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
          />
          <p className="helper">Include required skills and responsibilities for a more useful comparison.</p>
        </section>

        <div className="submit-row">
          <button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="spin" size={18} /> : <Sparkles size={18} />}
            {loading ? "Analyzing resume..." : "Analyze candidate"}
          </button>
        </div>
      </form>

      {error && (
        <div className="message error">
          <AlertCircle size={19} />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <section className="results panel">
          <span className="eyebrow">SCREENING RESULTS</span>
          <h3>Candidate skill analysis</h3>

          <div className="score">
            <strong>{result.matchScore}%</strong>
            <span>Skill match</span>
          </div>

          <div className="skill-columns">
            <div>
              <h4><CheckCircle size={17} /> Matched skills</h4>
              {result.matchedSkills?.length ? result.matchedSkills.map((skill) => (
                <span className="skill matched" key={skill}>{skill}</span>
              )) : <p>No matched skills returned.</p>}
            </div>
            <div>
              <h4><AlertCircle size={17} /> Missing skills</h4>
              {result.missingSkills?.length ? result.missingSkills.map((skill) => (
                <span className="skill missing" key={skill}>{skill}</span>
              )) : <p>No missing skills returned.</p>}
            </div>
          </div>

          {result.summary && <p className="summary">{result.summary}</p>}
          {result.aiAnalysis && (
  <section className="ai-analysis">
    <h2>AI-Powered Candidate Analysis</h2>
    <ReactMarkdown>{result.aiAnalysis}</ReactMarkdown>
  </section>
)}

{result.aiStatus === "failed" && (
  <p>
    AI analysis is temporarily unavailable. The skill-matching
    results are still available.
  </p>
)}
          <p className="disclaimer">This tool supports human review. A skill match score is not a hiring decision.</p>
        </section>
      )}

      <footer>TalentMatch AI · Resume skills comparison</footer>
    </main>
  );
}

export default App;
