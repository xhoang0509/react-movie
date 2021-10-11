import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

export const useHomeFetch = () => {
    const [searchItem, setSearchItem] = useState("");
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page, searchItem = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchItem, page);
            setState((prev) => ({
                ...movies,
                results:
                    page > 1
                        ? [...prev.results, ...movies.results]
                        : [...movies.results],
            }));
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    // Initial render
    useEffect(() => {
        setState();
        fetchMovies(1);
    }, []);

    // Search
    useEffect(() => {
        setState(initialState);
        fetchMovies(1, searchItem);
    }, [searchItem]);

    // Load More
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchMovies(state.page + 1, searchItem);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchItem]);

    return {
        state,
        loading,
        error,
        searchItem,
        setSearchItem,
        setIsLoadingMore,
    };
};
