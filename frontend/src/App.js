import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import Item from './components/Item';
import {Route, Routes} from 'react-router-dom';
import Order from './components/Order';

export default function App() {
    return (
        <React.Fragment>
            <Header />
            <Routes>
                <Route path="/item/:id" element={<Item />}/>
                <Route path="/" element={<Content />}/>
                <Route path="/buy" element={<Order/>}/>
            </Routes>
            <Footer />
        </React.Fragment>
    );
}
