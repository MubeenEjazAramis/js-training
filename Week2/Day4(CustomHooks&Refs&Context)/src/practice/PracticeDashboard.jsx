import { useState } from 'react';
import Task1AutoFocus from './Task1AutoFocus';
import Task2Stopwatch from './Task2Stopwatch';
import Task3ToggleDemo from './Task3ToggleDemo';
import Task4LocalStorageDemo from './Task4LocalStorageDemo';
import Task5WindowWidthDemo from './Task5WindowWidthDemo';
import Task6TodoReducer from './Task6TodoReducer';

export default function PracticeDashboard() {
  const [selectedTab, setSelectedTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Tasks (1 - 6)' },
    { id: 'task1', label: '1. Auto-Focus Ref' },
    { id: 'task2', label: '2. Stopwatch Ref' },
    { id: 'task3', label: '3. useToggle Hook' },
    { id: 'task4', label: '4. useLocalStorage Hook' },
    { id: 'task5', label: '5. useWindowWidth Hook' },
    { id: 'task6', label: '6. useReducer To-Do' },
  ];

  return (
    <div className="practice-dashboard">
      <div className="practice-hero">
        <h2 className="practice-title">Week 2 Day 4: Practice Lab</h2>
        <p className="practice-subtitle">
          Interactive evaluation testbed demonstrating useRef, custom hooks (useToggle, useLocalStorage, useWindowWidth),
          and useReducer state management.
        </p>

        {/* Tab switcher */}
        <div className="practice-tab-bar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`practice-tab-btn ${selectedTab === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="practice-grid">
        {(selectedTab === 'all' || selectedTab === 'task1') && <Task1AutoFocus />}
        {(selectedTab === 'all' || selectedTab === 'task2') && <Task2Stopwatch />}
        {(selectedTab === 'all' || selectedTab === 'task3') && <Task3ToggleDemo />}
        {(selectedTab === 'all' || selectedTab === 'task4') && <Task4LocalStorageDemo />}
        {(selectedTab === 'all' || selectedTab === 'task5') && <Task5WindowWidthDemo />}
        {(selectedTab === 'all' || selectedTab === 'task6') && <Task6TodoReducer />}
      </div>
    </div>
  );
}
