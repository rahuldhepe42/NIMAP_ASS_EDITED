import React from "react";
import "../App.css";

const Card = (movie) => {
    console.log(movie.info);
    let img_path = "https://image.tmdb.org/t/p/w500";
    return (


        <>

            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#myModal">




                <div className="movie">
                    <img src={img_path + movie.info.poster_path} className="poster"></img>
                    <div className="movie-details">
                        <div className="Box">
                            <h6 className="Title text-white"> {movie.info.title}</h6>
                            <p className="rating text-white">{movie.info.vote_average}</p>
                        </div>

                        <div className="overview">
                            <h1>Overview</h1>
                            {movie.info.overview}
                        </div>
                    </div>

                </div>

            </button>


            <div class="modal fade" id="myModal" tabindex="-1">
                <div class="modal-dialog modal-fullscreen " id="modal">
                    <div class="modal-content ">
                        <div class="modal-header">

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body ">

                            <h4>movie details</h4>

                        </div>

                    </div>

                </div>

            </div >


        </>


    )
}
export default Card;