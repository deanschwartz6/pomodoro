import React from "react";

function ButtonHandler({dataTestId, spanClass, className, type, focusDuration, setFocusDuration, breakDuration, setBreakDuration, sessionActive}) {
    const handleClick = () => {
        if (dataTestId.includes("increase-focus")){
            if (focusDuration > 59){
                //do nothing
            } else {
                setFocusDuration(focusDuration + 5);
                console.log("focus duration + 5");
            }
        } else if (dataTestId.includes("decrease-focus")){
            if (focusDuration < 6){
                //do nothing
            } else {
                setFocusDuration(focusDuration - 5);
                console.log("focus duration - 5");
            }
        } else if (dataTestId.includes("increase-break")){
            if (breakDuration > 14){
                //do nothing
            } else {
                setBreakDuration(breakDuration + 1);
                console.log("break duration + 1");
            }
        } else if (dataTestId.includes("decrease-break")){
            if (breakDuration < 2){
                //do nothing
            } else {
                setBreakDuration(breakDuration - 1);
                console.log("break duration - 1");
            }
        }
    };
    if (sessionActive === false){
        return (
            <button
            type={type}
            className={className}
            data-testid={dataTestId}
            onClick={handleClick}
            >
                <span className={spanClass} />
            </button>
        );
    } else {
        return (
            <button
            type={type}
            className={className}
            data-testid={dataTestId}
            onClick={handleClick}
            disabled={true}
            >
                <span className={spanClass} />
            </button>
        );
    }
};

export default ButtonHandler;