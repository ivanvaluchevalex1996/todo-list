/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react";
import "./Timer.css";
import getPadTime from "../../utils/getPadTime";

function Timer(props) {
  const allTime = 60 * props.minute + props.second;
  const [timeLeft, setTimeLeft] = useState(allTime);
  const [isCounting, setIsCounting] = useState(false);
  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);
  useEffect(() => {
    const interval = setInterval(
      () => isCounting && setTimeLeft((timeleft) => (timeleft >= 1 ? timeleft - 1 : 0)),
      1000
    );
    if (timeLeft === 0) setIsCounting(false);
    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, isCounting]);

  const handleStart = () => {
    setIsCounting(true);
  };
  const handleStop = () => {
    setIsCounting(false);
  };

  return (
    <div className="app">
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        {isCounting ? (
          <button type="button" className="icon icon-pause" onClick={handleStop} />
        ) : (
          <button type="button" className="icon icon-play" onClick={handleStart} />
        )}
      </div>
    </div>
  );
}

export default Timer;
