/**
 * EvaluationGuide Component
 * 
 * Prepares the student for the Week 2 Evaluation (12:00-15:00 assessment).
 * Summarizes the evaluation format, grading rubric, and key viva questions.
 */
export default function EvaluationGuide() {
  const assessmentCriteria = [
    { name: 'Working Output', weight: '30%', desc: 'App meets the written specification completely and runs without runtime errors.' },
    { name: 'Understanding', weight: '25%', desc: 'Clear verbal explanation of code structure, React hooks, and rendering behavior without notes.' },
    { name: 'Code Quality', weight: '20%', desc: 'Clean naming conventions, modular components, pure functions, and no dead code.' },
    { name: 'Debugging', weight: '15%', desc: 'Finding issues using React DevTools, browser console logs, and error stacks systematically.' },
    { name: 'Consistency', weight: '10%', desc: 'Daily pull requests and learning logs submitted on time throughout the week.' },
  ];

  const keyQuestions = [
    {
      q: 'Why should error messages be calculated during render rather than stored in useState?',
      a: 'Storing errors in state creates redundant, duplicate state. If the input changes and you forget to update the error state, they fall out of sync. Calculating errors during render ensures errors are always a pure reflection of the current formData.'
    },
    {
      q: 'How does blur-based validation ("touched" state) improve user experience?',
      a: 'If validation errors appear while a user is typing their first character (e.g. "Password must be 8 characters" after typing "P"), it creates a frustrating, hostile UX. By tracking which inputs have been blurred (touched), we only highlight errors after the user leaves the field.'
    },
    {
      q: 'What is a controlled component in React?',
      a: 'A controlled component has its input value bound to React state via value={...} and onChange={...}. React serves as the single source of truth for the input data, rather than relying on the internal DOM state.'
    },
    {
      q: 'Why do we store form inputs in a single object instead of 6 separate useState hooks?',
      a: 'Grouping related inputs into a single object state (formData) simplifies change handling into a single generic handler ([name]: value), makes passing/resetting form data trivial, and prevents component clutter.'
    }
  ];

  return (
    <div className="evaluation-card">
      <div className="eval-header">
        <div className="eval-badge">Thursday Evaluation Prep</div>
        <h3 className="eval-title">Week 2 React Fundamentals Assessment Guide</h3>
        <p className="eval-subtitle">
          From 12:00 to 15:00 on Thursdays, you sit an evaluation scored out of 100 (Pass mark: 70).
        </p>
      </div>

      {/* 4 Evaluation Parts */}
      <div className="eval-parts-grid">
        <div className="part-card">
          <div className="part-num">Part 1</div>
          <h4 className="part-title">90-Minute Live Build</h4>
          <p className="part-desc">Build a complete small React application from a written specification without AI tools.</p>
        </div>
        <div className="part-card">
          <div className="part-num">Part 2</div>
          <h4 className="part-title">Bug Fixing Drill</h4>
          <p className="part-desc">Diagnose and resolve planted React bugs (e.g., infinite loops, stale closures, missing dependencies).</p>
        </div>
        <div className="part-card">
          <div className="part-num">Part 3</div>
          <h4 className="part-title">Concepts Viva Defense</h4>
          <p className="part-desc">Explain key React concepts out loud (rendering lifecycle, state snapshots, effects, custom hooks).</p>
        </div>
        <div className="part-card">
          <div className="part-num">Part 4</div>
          <h4 className="part-title">Weekly PR Review</h4>
          <p className="part-desc">Detailed code defense and walkthrough of your daily PRs (Day 1 through Day 5).</p>
        </div>
      </div>

      {/* Grading Rubric */}
      <div className="rubric-section">
        <h4 className="section-heading">Assessment Criteria & Weightage</h4>
        <div className="rubric-table-wrapper">
          <table className="rubric-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Weight</th>
                <th>Expectation</th>
              </tr>
            </thead>
            <tbody>
              {assessmentCriteria.map((c) => (
                <tr key={c.name}>
                  <td><strong>{c.name}</strong></td>
                  <td><span className="weight-badge">{c.weight}</span></td>
                  <td>{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Interview / Standup Questions */}
      <div className="viva-section">
        <h4 className="section-heading">Key Viva & Stand-up Questions</h4>
        <div className="faq-list">
          {keyQuestions.map((item, idx) => (
            <div key={idx} className="faq-item">
              <h5 className="faq-q">Q: {item.q}</h5>
              <p className="faq-a">A: {item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
