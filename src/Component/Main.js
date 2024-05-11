import React, { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import "../App.css";
import Card from "./Card";

const API_key = "&api_key=7b71ae6a31166f96347f9ed964916122";
const base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Top Rated", "Upcoming"];

const Main = () => {
    const [movieData, setMovData] = useState([]);
    const [urlSet, setUrl] = useState(url);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotPages] = useState(1);

    useEffect(() => {
        fetch(urlSet)
            .then((res) => res.json())
            .then((data) => {
                setMovData(data.results);
                setTotPages(data.total_pages);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [urlSet]);

    const getData = (movieType) => {
        let newUrl = url;
        if (movieType === "Popular") {
            newUrl = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
        } else if (movieType === "Top Rated") {
            newUrl = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
        } else if (movieType === "Upcoming") {
            newUrl = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1" + API_key;
        }
        setUrl(newUrl);
    };


    // const searchMovie = (evt) => {

    //     if (evt.key == "Enter") {
    //         let newUrl = base_url + "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" + search;
    //         setUrl(newUrl);
    //         setSearch(" ");
    //     }

    // };

    // const SearchMovie = () => {
    //     
    //     let newUrl = base_url + "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" + search;
    //     setUrl(newUrl);
    //     setSearch(" ");

    // };

    const searchMovie = () => {
        if (search.trim() !== "") {
            let newUrl = base_url + "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" + search;
            setUrl(newUrl);
            setSearch("");
        }
    };


    const handlePagination = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            let newUrl = urlSet.includes("&page=") ? urlSet.replace(/&page=\d+/, `&page=${newPage}`) : `${urlSet}&page=${newPage}`;
            setUrl(newUrl);
        }
    };

    return (
        <div>
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
                    <div className="container" id="Navbar">
                        <a className="navbar-brand text-white" href="#">MovieDb</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon "></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                {arr.map((value, pos) => (
                                    <li key={pos}><a className="nav-link text-white" href="#" name={value} onClick={(e) => { getData(e.target.name) }}>{value}</a></li>
                                ))}
                            </ul>
                            {/* 
                            <form className="d-flex"    >
                                <input className="form-control me-2" type="search" placeholder="Movie Name" aria-label="Search" onChange={(e) => {setSearch(e.target.value); }}
                                 value={search}/>
                                <button className="btn btn-secondary" onClick={SearchMovie} type="submit">Search</button>
                            </form> */}


                            <form className="d-flex" onSubmit={(e) => { e.preventDefault(); searchMovie(); }}>
                                <input className="form-control me-2" type="search" placeholder="Movie Name" aria-label="Search" onChange={(e) => { setSearch(e.target.value) }} value={search} />
                                <button className="btn btn-secondary" type="submit">Search</button>
                            </form>

                        </div>
                    </div>
                </nav>
            </div>
            <div className="container mt-5">
                {movieData.length === 0 ? (
                    <p className="Not Found text-white mt-5">Not Found. Please try with a different network.</p>) : (movieData.map((res, pos) => <Card info={res} key={pos} />)
                )}
            </div>

            <div className="pagination">
                <button className="pagination-btn" onClick={() => handlePagination(page - 1)} disabled={page === 1}>
                    <MdKeyboardDoubleArrowLeft />
                </button>
                <span className="pagination-text">{page}</span>
                <button className="pagination-btn" onClick={() => handlePagination(page + 1)} disabled={page === totalPages}>
                    <MdKeyboardDoubleArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Main;
