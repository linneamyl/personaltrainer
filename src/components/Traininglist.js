import React, { useState, useEffect } from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import moment from 'moment/moment';
import Button from "@material-ui/core/Button";

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

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

    function deleteCustomer(link) {
        console.log(link)

        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + link, {method:'DELETE'})
                .then(_ => fetchData())
                .catch(err => console.error(err))

        }
    }

    const columns = [
         
        {
            Header: "Date",
            accessor: "date",
            Cell: row => moment(row.value).format('DD/MM/YY, hh:mm')
        },
        {
            Header: "Duration (minutes)",
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
        {
        filterable: false,
        sortable: false,
        width: 100,
        Cell: row => (<Button color="secondary" size="small"
                              onClick={() => deleteCustomer(row.row._original.id)}>Delete</Button>)
         } ];

    return (
        <div>
          <ReactTable defaultPageSize={10} filterable={true} sortable={true} data={trainings} columns={columns}  />
       
        </div>
    );
}
