import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration} from "../utils/duration";
import {secondsToDuration} from "../utils/duration";
import ButtonHandler from "./ButtonHandler.js";
import StopButtonHandler from "./StopButtonHandler";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionCountdown, setSessionCountdown] = useState(0);
  const [focusSessionActive, setFocusSessionActive] = useState(false);
  const [barValue, setBarValue] = useState(0);


  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  useInterval(() => {
      if (focusSessionActive) {
        setBarValue((sessionCountdown / (focusDuration * 60)) * 100);
      } else if (!focusSessionActive & (sessionCountdown !== 0)) {
        setBarValue((sessionCountdown / (breakDuration * 60)) * 100);
      }
      setSessionCountdown((currentSessionCountdown) => {
        if (
          focusSessionActive &&
          currentSessionCountdown === focusDuration * 60
        ) {
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
          setFocusSessionActive(!focusSessionActive);
          return (currentSessionCountdown = 0);
        } else if (
          !focusSessionActive &&
          currentSessionCountdown === breakDuration * 60
        ) {
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
          setFocusSessionActive(!focusSessionActive);
          return (currentSessionCountdown = 0);
        } else {
          return (currentSessionCountdown += 1);
        }
      });
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    if (!sessionActive) setSessionActive(true);
    if (!focusSessionActive && sessionCountdown === 0) {
      setFocusSessionActive((currentFocusSession) => {
        return !currentFocusSession;
      });
    }
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <ButtonHandler
                type="button"
                className="btn btn-secondary"
                dataTestId="decrease-focus"
                spanClass="oi oi-minus"
                focusDuration={focusDuration}
                setFocusDuration={setFocusDuration}
                isTimerRunning={isTimerRunning}
              />
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <ButtonHandler
                type="button"
                className="btn btn-secondary"
                dataTestId="increase-focus"
                spanClass="oi oi-plus"
                focusDuration={focusDuration}
                setFocusDuration={setFocusDuration}
                isTimerRunning={isTimerRunning}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <ButtonHandler
                  type="button"
                  className="btn btn-secondary"
                  dataTestId="decrease-break"
                  spanClass="oi oi-minus"
                  breakDuration={breakDuration}
                  setBreakDuration={setBreakDuration}
                  isTimerRunning={isTimerRunning}
                />
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <ButtonHandler
                  type="button"
                  className="btn btn-secondary"
                  dataTestId="increase-break"
                  spanClass="oi oi-plus"
                  breakDuration={breakDuration}
                  setBreakDuration={setBreakDuration}
                  isTimerRunning={isTimerRunning}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <StopButtonHandler
              isTimerRunning={isTimerRunning}
              setIsTimerRunning={setIsTimerRunning}
              setFocusDuration={setFocusDuration}
              setBreakDuration={setBreakDuration}
              setSessionCountdown={setSessionCountdown}
              setFocusSessionActive={setFocusSessionActive}
              setSessionActive={setSessionActive}
            />
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {focusSessionActive ? "Focusing" : "On Break"} for {focusSessionActive ? `${minutesToDuration(focusDuration)}` : `${minutesToDuration(breakDuration)}`} minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {focusSessionActive ? `${secondsToDuration(focusDuration * 60 - sessionCountdown)}` : `${secondsToDuration(breakDuration * 60 - sessionCountdown)}`} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
