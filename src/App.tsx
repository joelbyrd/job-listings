import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 100)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <h2 className="text-3xl font-bold underline">Hello, world!</h2>
      <div className="flex gap-3">
        <div className="bg-teal w-20 h-20">Teal</div>
        <div className="bg-teal-light w-20 h-20">Teal Light</div>
        <div className="bg-gray-light w-20 h-20">Gray Light</div>
        <div className="bg-gray w-20 h-20">Gray</div>
        <div className="bg-gray-dark w-20 h-20">Gray Dark</div>
      </div>

      {/* Frontend Mentor attribution: */}
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by Joel Byrd.
      </div>
    </>
  );
}

export default App;
