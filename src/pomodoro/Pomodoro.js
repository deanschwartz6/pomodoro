import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration} from "../utils/duration";
import {secondsToDuration} from "../utils/duration";
import ButtonHandler from "./ButtonHandler";
import StopButtonHandler from "./StopButtonHandler";
import TimerSection from "./TimerSection";

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
                sessionActive={sessionActive}
              />
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <ButtonHandler
                type="button"
                className="btn btn-secondary"
                dataTestId="increase-focus"
                spanClass="oi oi-plus"
                focusDuration={focusDuration}
                setFocusDuration={setFocusDuration}
                sessionActive={sessionActive}
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
                  sessionActive={sessionActive}
                />
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <ButtonHandler
                  type="button"
                  className="btn btn-secondary"
                  dataTestId="increase-break"
                  spanClass="oi oi-plus"
                  breakDuration={breakDuration}
                  setBreakDuration={setBreakDuration}
                  sessionActive={sessionActive}
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
              sessionActive={sessionActive}
            />
          </div>
        </div>
      </div>
        <TimerSection
          sessionActive={sessionActive}
          focusSessionActive={focusSessionActive}
          minutesToDuration={minutesToDuration}
          secondsToDuration={secondsToDuration}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          sessionCountdown={sessionCountdown}
          barValue={barValue}
          isTimerRunning={isTimerRunning}
        />
    </div>
  );
}

export default Pomodoro;
