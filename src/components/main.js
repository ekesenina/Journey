import React from "react";
import { Routes, Route } from "react-router-dom";

import HystModal from "hystmodal";
import '../../node_modules/hystmodal/dist/hystmodal.min.css'


import TownTemplate from "./townTemplate";
import placesTumen from './arrays/placesTumen';
import placesEkb from './arrays/placesEkb';

import Home from "./home";
import Template from "./townTemplate";
import Tumen from "./tumen";


class Main extends React.Component{
    render(){
        return(
                <div className="main">
                    <Routes>
                        <Route  path={"/"} exact element={<Home/>}/>
                        <Route  path={"/tumen"} element={<TownTemplate city="Tumen" />}/>
                        <Route  path={"/ekb"} element={<TownTemplate city="Ekb" />}/>
                    </Routes>
                </div>
        );
    }
}


export default Main; 
