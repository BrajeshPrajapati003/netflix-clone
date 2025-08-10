import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGY5MDc3NzFmYTgyNGFmMWNiYzlhOWJiNmRlNjQxOSIsIm5iZiI6MTc1NDY0NDM5My4zMTgsInN1YiI6IjY4OTViZmE5OTY1OWMyMjM2YWEzMzBlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gZ6Prx_Yw3d2nTgGDPOJqsgsVFUfU-Pb5mwjUbkN8-I'
      }
    };

    
    const handleWheel = (event) =>{
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results || []))
    .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => currentRef.removeEventListener('wheel', handleWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"} </h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) =>{
          return <div className="card" key={index}>

            <img src={
              card.backdrop_path ? `https://image.tmdb.org/t/p/w500`+card.backdrop_path : 'assets/fallback.png' } alt = {card.original_title}
            />

            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  );
};

export default TitleCards
