"use client";

import { FormEvent, useState } from "react";

type SIEStructure = {
  goal: string;
  goalType: string;
  desiredState: string;
  currentStateNeed: string;
  phases: { name: string; purpose: string }[];
  nextAction: { title: string; reason: string; estimatedMinutes: number };
};

export default function Home() {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<SIEStructure | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createStructure(event: FormEvent) {
    event.preventDefault();
    if (!goal.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: goal.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "SIE could not create a structure.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div>
          <div className="brand">SIE</div>
          <div className="brand-sub">System for Intelligence<br />and Execution</div>
        </div>
        <nav className="nav" aria-label="Primary">
          <button className="active">New goal</button>
          <button disabled>Projects — later</button>
          <button disabled>History — later</button>
        </nav>
        <div className="version">V0.1 · Goal → Structure → Action</div>
      </aside>

      <main className="main">
        <div className="eyebrow">Execution begins with structure</div>
        <h1 className="hero">What are you trying <em>to make real?</em></h1>
        <p className="lede">Give SIE the outcome. V0.1 creates an initial structure appropriate to that goal, then reduces it to one action you can take next.</p>

        <form className="composer" onSubmit={createStructure}>
          <textarea
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            placeholder="I want to earn an A in every course this semester."
            aria-label="Your goal"
          />
          <div className="composer-footer">
            <span className="hint">Do not organize it first. State the outcome naturally.</span>
            <button className="primary" type="submit" disabled={!goal.trim() || loading}>
              {loading ? "Structuring…" : "Create structure →"}
            </button>
          </div>
        </form>

        {error && <div className="error">{error}</div>}

        {result && (
          <section className="result" aria-live="polite">
            <div className="result-top">
              <div className="result-goal">{result.goal}</div>
              <div className="goal-type">{result.goalType}</div>
            </div>

            <div className="structure">
              <div className="block">
                <div className="block-label">Desired state</div>
                <h3>What success means</h3>
                <p>{result.desiredState}</p>
              </div>
              <div className="block">
                <div className="block-label">First uncertainty</div>
                <h3>What SIE needs to establish</h3>
                <p>{result.currentStateNeed}</p>
              </div>
              {result.phases.map((phase, index) => (
                <div className="block" key={`${phase.name}-${index}`}>
                  <div className="block-label">{String(index + 1).padStart(2, "0")} · Structure</div>
                  <h3>{phase.name}</h3>
                  <p>{phase.purpose}</p>
                </div>
              ))}
            </div>

            <div className="next">
              <div className="next-head">
                <span className="next-label">Next action</span>
                <span className="next-time">~{result.nextAction.estimatedMinutes} min</span>
              </div>
              <h2>{result.nextAction.title}</h2>
              <p>{result.nextAction.reason}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
