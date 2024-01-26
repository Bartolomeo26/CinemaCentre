import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SearchResultsList from './SearchResultsList';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '30ch'
        },
    },
}));

export default function SearchBar()
{
    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);

    const getData = async (value) =>
    {

        const productions = [];
        await axios.get("http://localhost:3000/movies")
            .then((response) =>
            {
                const results = response.data.filter((movie) =>
                {
                    return (
                        value &&
                        movie &&
                        movie.title &&
                        (movie.title.includes(value) || movie.title.toLowerCase().includes(value))
                    );
                });
                productions[0] = results;
            });
        await axios.get("http://localhost:3000/actors")
            .then((response) =>
            {
                const results = response.data.filter((actor) =>
                {
                    const fullName = actor.name + " " + actor.surname;
                    return (
                        value &&
                        actor &&
                        actor.name && actor.surname &&
                        (fullName.includes(value) || fullName.toLowerCase().includes(value))
                    );
                });

                productions[1] = results;
            });
        await axios.get("http://localhost:3000/series")
            .then((response) =>
            {
                const results = response.data.filter((serie) =>
                {
                    return (
                        value &&
                        serie &&
                        serie.title &&
                        (serie.title.includes(value) || serie.title.toLowerCase().includes(value))
                    );
                });

                productions[2] = results;
            });
            for(let i=0; i<productions.length; i++)
            {productions[i] = productions[i].slice(0,5);
            }
            
        console.log(productions)
        setResults(productions);
    };

    const handleChange = (value) =>
    {
        setInput(value);
        getData(value);
    };

    const clearInput = () =>
    {
        setInput("");
        setResults([]);

    }

    return (
        <>
        
            <Search className='SearchBar' >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search movies, series or actors"
                    inputProps={{ 'aria-label': 'search' }}
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </Search>
            {results ? <div className='position-absolute'>
                {results && results.length > 0 && <SearchResultsList results={results} clearInput={clearInput} />}
            </div> : ''}
            
        </>

    );
}
