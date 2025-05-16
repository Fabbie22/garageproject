import React from "react";

export default function DateInput({ id, name, value, onChange }) {
    return (
        <div>
            <input
                type="date"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
