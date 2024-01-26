import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleButton from '@mui/material/ToggleButton';
import { useState } from 'react';
export default function Favourite({ addFavourite, isSelected })
{

    const [selected, setSelected] = useState(false);


    return (
        <ToggleButton
            value="check"
            selected={isSelected}
            onChange={() =>
            {
                addFavourite();
                setSelected(!selected);

            }}
            style={{
                backgroundColor: isSelected ? 'pink' : '',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer',
              }}
        >
            <FavoriteIcon style={{ color: '#d50000' }} />
        </ToggleButton>
    );
}