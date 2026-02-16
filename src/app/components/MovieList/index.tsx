'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './index.module.scss';

export interface MovieType {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
}

export default function MovieList() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: {
                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY || '174ac822eacf29a95798c149ea01c241',
                    language: 'pt-BR'
                }
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <div className={styles.loading}>Carregando...</div>;
    }

    return (
        <ul className={styles.movieList}>
            {movies.map((movie) =>
                <li key={movie.id} className={styles.movieCard}>
                    <div className={styles.moviePoster}>
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className={styles.movieInfo}>
                        <p className={styles.movieTitle}>
                            {movie.title}
                        </p>
                        {movie.overview.length > 0 && (
                            <p className={styles.description}>
                                {movie.overview}
                            </p>
                        )}
                        <p className={styles.rating}>
                           Rating: {movie.vote_average}
                        </p>
                    </div>
                </li>
            )}
        </ul>
    )
}
