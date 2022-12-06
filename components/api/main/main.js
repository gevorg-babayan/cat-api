import React, { useEffect, useState } from "react";
import {inst} from "../api";
import "./main.css"

export const Main = () => {
    
    const [categories, setCategories] = useState();
    const [images, setImages] = useState();
    const [page,setPage] = useState();
    const [id,setId] = useState();
  
        const getCategories = () => {
            
            inst
              .get("/categories")
              .then((result) => {
                setCategories(result.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }

  useEffect(getCategories,[categories])

  const getImages = () => {
    
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${id}`
  )
      .then((response) => response.json())
      .then((resp) => setImages(resp))
    }


   useEffect(getImages,[id])

   const loadMore = () => {
    setPage(page+1)
    images &&
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=${id}`
  )
      .then((response) => response.json())
      .then((resp) => setImages(images.concat(resp)))
      
   }


   return (
    <>
    <div className="content">
    <div className="categories">
        {categories && categories.map(el => {
            return <div className = "category-name" onClick={() => setId(el.id)} key={el.id}>{el.name}</div>
        })}
    </div>
    <div className="imgContainer">
      {images && images.map(({url, id}) => (
                        <div className="img-div" key={Math.random()}>
                            <img src={url} alt="cat"/>
                        </div>
                    ))}
    </div>
    </div>
    <button onClick={loadMore}>Load more</button>
    </>
   )
}



