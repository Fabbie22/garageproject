import React, { useState } from 'react';

export default function DateInput() {
  const [dateValue, setDateValue] = useState('');

  return (
    <div>
      <input
        type="date"
        id="date"
        name="date"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
      />

      <p>Selected date: {dateValue}</p>
    </div>
  );
}
