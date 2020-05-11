import React, { useState, useEffect } from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment/moment';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');


    function fetchData() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData);
            })
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const columns = [
         
        {
            Header: "Date",
            accessor: "date",
            Cell: row => moment(row.value).format('DD/MM/YY, hh:mm')
        },
        {
            Header: "Duration",
            accessor: "duration"
        },
        {
            Header: "Activity",
            accessor: "activity"
        },
        {
            Header: 'Firstname',
            accessor: 'customer.firstname'
        }, 
        {
            Header: 'Lastname',
            accessor: 'customer.lastname'
        },
    ];

    return (
        <div>
          <ReactTable defaultPageSize={10} filterable={true} sortable={true} data={trainings} columns={columns}  />
       
        </div>
    );
}
