import React from "react";

export const Form = ({inputValue, handleFieldValue}) => {
    return (
        <form>
            find countries{" "}
            <input type="text" value={inputValue} onChange={handleFieldValue} />
        </form>
    );
};
