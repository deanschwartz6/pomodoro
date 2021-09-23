import React from "react";

function StopButtonHandler ({isTimerRunning, setIsTimerRunning, setFocusDuration, setBreakDuration, setSessionActive, setSessionCountdown, setFocusSessionActive, sessionActive}) {
    const handleClick = () => {
        setIsTimerRunning(false);
        setFocusDuration(25);
        setBreakDuration(5);
        setSessionCountdown(() => 0);
        setFocusSessionActive(false);
        setSessionActive(false);
    };

    if (sessionActive === true){
        return (
            <button
            type="button"
            className="btn btn-secondary"
            data-testid="stop"
            title="Stop the session"
            onClick={handleClick}
            >
                <span className="oi oi-media-stop" />
            </button>
        );
    } else {
        return (
            <button
            type="button"
            className="btn btn-secondary"
            data-testid="stop"
            title="Stop the session"
            onClick={handleClick}
            disabled={true}
            >
                <span className="oi oi-media-stop" />
            </button>
        );
    }
}

export default StopButtonHandler;