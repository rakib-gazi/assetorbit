import React from 'react';
import SwiperSlider from '../Components/SwiperSlider';
import About from '../Components/About';
import Choose from '../Components/Choose';
import Pricing from '../Components/Pricing';
import { Helmet } from 'react-helmet';
import NewsLetter from '../Components/NewsLetter';

const Home = () => {
    return (
        <div>
        
            <Helmet>
                <title>Home | AssetOrbit</title>
            </Helmet>
            <SwiperSlider></SwiperSlider>
            <About></About>
            <Choose></Choose>
            <Pricing></Pricing>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;