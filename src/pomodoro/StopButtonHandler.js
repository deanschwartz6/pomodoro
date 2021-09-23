import React from "react";

function StopButtonHandler ({isTimerRunning, setIsTimerRunning, setFocusDuration, setBreakDuration, setSession}) {
    const handleClick = () => {
        setIsTimerRunning(false);
        setFocusDuration(25);
        setBreakDuration(5);
    };

    if (isTimerRunning === true){
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