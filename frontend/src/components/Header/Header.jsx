import React from 'react';
import front from '../../assets/front.jpg'; 
import { assets } from '../../assets/assets'; 


const tiulip = front; 

const Header = () => {
    return (
        <div className="relative flex justify-center w-full min-h-[70vh] py-8 md:py-16 lg:py-24 font-sans"> 
            
            <div 
                className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
                style={{ 
                    backgroundImage: `url(${front})`, 
                }}
            >
                <div className="absolute inset-0 bg-gray-100 opacity-10"></div> 
            </div>
            
            <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-start justify-between min-h-full z-10"> 

                <div className="lg:w-1/2 pt-10 pb-10 lg:pb-0 relative"> 
                    
                    <h1 className='text-6xl md:text-7xl font-serif font-extrabold text-gray-800 leading-tight mb-6'>
                        Bloom Bliss: Fresh Flowers, Thoughtful Gifts<br/>
                    </h1>
                    
                    <p className='text-lg text-gray-600 mb-10 max-w-md'>
                     Explore our wide selection of exquisite flower arrangements to ensure your next occasion is truly memorable.
                    </p>

                    <img 
                        src={assets.blue || tiulip} 
                        alt="Background Accent Image" 
                       
                        className="absolute w-[200px] h-[200px] object-cover rounded-full z-[-10] opacity-30 top-1/4 left-1/3"
                    />

 <div className='p-2 bg-white rounded-lg shadow-xl border border-gray-200 max-w-sm relative z-10'>
<p className='text-sm text-gray-500 font-semibold mb-2 ml-1'>Find your desired gifts</p> 
 
                            <button className='px-6 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition'>
                               Shop Now
                            </button>
                        </div>
                    
                </div>

<div className="lg:w-1/2 h-full relative flex justify-center items-center py-10"> 
    
    <div className="relative w-[200px] h-[250px] lg:w-[300px] lg:h-[400px]">
        
        <img 
            src={assets.pur || pur} 
            alt="3D Flower Item 1" 
            className="absolute w-full h-full object-cover rounded-2xl shadow-2xl -rotate-6 top-0 right-20  z-10 transition duration-500 hover:rotate-0"
        />
        
        <img 
            src={assets.tiulip || tiulipblue} 
            alt="3D Flower Item 2" 
            className="absolute w-full h-full object-cover rounded-2xl shadow-2xl rotate-3 top-5 left-10 z-20 transition duration-500 hover:rotate-0"
        />
        
        <img 
            src={assets.tiulipblue || front} 
            alt="3D Flower Item 3" 
            className="absolute w-full h-full object-cover rounded-lg shadow-xl rotate-3 top-10 left-40 z-20 transition duration-500 hover:rotate-0"/>

    </div>

</div>

           
            </div>
        </div>
    );
};

export default Header;