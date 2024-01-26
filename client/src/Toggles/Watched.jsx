import * as React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ToggleButton from '@mui/material/ToggleButton';
import { useState } from 'react';
export default function Watched({ addWatched, isSelected })
{

  const [selected, setSelected] = useState(false);
  

  return (
    <ToggleButton
      value="check"
      selected={isSelected}
      onChange={() =>
      {
        setSelected(!selected);
        addWatched();
        
      }}
      style={{
        backgroundColor: isSelected ? 'khaki' : '',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <RemoveRedEyeIcon />
    </ToggleButton>
  );
}