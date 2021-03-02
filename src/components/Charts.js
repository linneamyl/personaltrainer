import React from "react";
import lodash from 'lodash';
import {
    BarChart, Bar, XAxis, YAxis
} from 'recharts';

export default function TrainingDurationChart() {
    const [list, setList] = React.useState([]);


    function fetchData() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                setList(lodash(responseData)
                    .groupBy(list => list.activity)
                    .map((value, key) => (
                        {activity: key, totalamount: lodash.sumBy(value, 'duration')}
                    ))
                    .value());
            })
    }


    React.useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="App">
            <BarChart width={1000} height={400} data={list}>
                <XAxis dataKey="activity"/>
                <YAxis label={{value: 'Kesto minuuteissa', angle: 90, position: 'insideLeft'}}/>
                <Bar dataKey="totalamount" fill="#49d157"/>
            </BarChart>
        </div>
    )
}