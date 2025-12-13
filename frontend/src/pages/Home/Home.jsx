import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import BoquetDisplay from '../../components/BoquetDisplay/BoquetDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';



const Home = () => {
    const [ category, setCategory] = useState("All"); 
    
    return (
        
        <div className='w-full bg-white min-h-screen'>
             
            <Header/> 
            
            <div id="Explore" className='bg-zinc-100 pt-12 pb-8'>
                <div className='max-w-7xl mx-auto px-4 md:px-8'>
                    <ExploreMenu category={category} setCategory={setCategory}/>
                    
                    <h2 className='text-3xl font-serif font-bold text-gray-700 mt-16 mb-8 text-center'>
                        Our Finest Flower Bouquets
                    </h2>
                    <BoquetDisplay category={category}/>
                </div>
            </div>
            
            <AppDownload/>
            
        </div>
    )
}
export default Home;