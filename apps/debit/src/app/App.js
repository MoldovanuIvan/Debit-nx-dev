import React, {useEffect} from "react";
import Table from "./components/table/table";
import Header from "./components/header/header"
import Charts from "./components/chart/twoCharts";
import instance from "./api/instance";
import './App.css'

function App() {

    return (
        <div className='app'>
            <Header/>
            <Charts/>
            <Table/>
        </div>
    );
}

export default App;
