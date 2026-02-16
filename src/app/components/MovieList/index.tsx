'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';

export interface MovieType {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
}

export default function MovieList() {
    const [movies, setMovies] = useState<MovieType[]>([]);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = () => {
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: '174ac822eacf29a95798c149ea01c241',
                language: 'pt-BR'
            }
        }).then(response => {
            setMovies(response.data.results);
        }).catch(error => {
            console.error("Error fetching movies:", error);
        });
    }

    return (
        <ul className='movie-list'>
            {movies.map((movie) =>
                <li key={movie.id} className='movie-card'>
                    <div className='movie-poster'>
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className='movie-info'>
                        <p className='movie-title'>
                            {movie.title}
                        </p>
                        <p className='description'>
                            {movie.overview}
                        </p>
                        <p className='rating'>
                           Rating: {movie.vote_average}
                        </p>
                    </div>
                </li>
            )}
        </ul>
    )
}
