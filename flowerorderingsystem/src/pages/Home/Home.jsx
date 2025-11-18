import React from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/Exploremenu';
import  { useState } from 'react';
import BoquetDisplay from '../../components/BoquetDisplay/BoquetDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';




const Home = () =>
 {

    const [ category, setCategory] = useState("All");
    return (
        <div>
            <Header/>
         <ExploreMenu category={category} setCategory={setCategory}/>
         <BoquetDisplay category={category}/>
         <AppDownload/>
        </div>
    )
    
}

export default  Home
    
    

