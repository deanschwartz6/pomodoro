import React from "react";

function TimerSection({sessionActive, focusSessionActive, minutesToDuration, secondsToDuration, focusDuration, breakDuration, sessionCountdown, barValue, isTimerRunning}) {
    if (sessionActive) {
        return (
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
                        <p>{sessionActive && isTimerRunning === false ? 'PAUSED' : null}</p>
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
                                aria-valuenow={barValue} // TODO: Increase aria-valuenow as elapsed time increases
                                style={{ width: `${barValue}%` }} // TODO: Increase width % as elapsed time increases
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }   
}

export default TimerSection;