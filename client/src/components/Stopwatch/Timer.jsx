import React, { useState, useRef } from "react";
import "./Timer.css";

const Timer = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [status, setStatus] = useState("Get set go!");
  const intervalRef = useRef(null);

  const format = (unit) => (unit < 10 ? `0${unit}` : unit);

  const displayTime = () =>
    `${format(hours)}:${format(minutes)}:${format(seconds)}:${format(milliseconds)}`;

  const tick = () => {
    setMilliseconds((ms) => {
      if (ms + 1 === 100) {
        setMilliseconds(0);
        setSeconds((s) => {
          if (s + 1 === 60) {
            setSeconds(0);
            setMinutes((m) => {
              if (m + 1 === 60) {
                setMinutes(0);
                setHours((h) => h + 1);
              }
              return m + 1;
            });
          }
          return s + 1;
        });
        return 0;
      }
      return ms + 1;
    });
  };

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(tick, 10);
    setStatus("Stop watch started");
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setStatus("Stop watch stopped");
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setStatus("Stop watch reset");
  };

  return (
    <div className="clock">
      <h1 id="time">{displayTime()}</h1>
      <h1 id="status">{status}</h1>
      <div>
        <button onClick={start} className="start">Start</button>
        <button onClick={stop} className="stop">Stop</button>
        <button onClick={reset} className="reset">Reset</button>
      </div>
    </div>
  );
};

export default Timer;
