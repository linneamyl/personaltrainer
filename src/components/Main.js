import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Customers from "./Customerlist";
import Trainings from "./Traininglist";
import CalendarComponent from "./Calendar";
import TrainingDurationChart from "./Charts";


const Main  = () => (
    <Switch>
        <Route exact path="/" component={Customers}/>
        <Route path="/customers" component={Customers}/>
        <Route path="/trainings" component={Trainings}/>
        <Route path="/calendar" component={CalendarComponent}/>
        <Route path="/chart" component={TrainingDurationChart}/>
    </Switch>
);

export default Main;