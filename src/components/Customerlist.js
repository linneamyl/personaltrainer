import React, { useState, useEffect } from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';


    export default function Customerlist() {
        const [customers, setCustomers] = useState([]);
        const [open, setOpen] = useState(false);
        const [msg, setMsg] = useState('');
    
        useEffect(() => {
        getCustomers()
        }, [])
    
        const getCustomers = () => {
            fetch("https://customerrest.herokuapp.com/api/customers")
                .then(response => response.json())
                .then(data => setCustomers(data.content));
        };

        const handleClose = () => {
            setOpen(false);
        }

        function deleteCustomer(link) {
            console.log(link)
    
            if (window.confirm('Are you sure?')) {
                fetch(link, {method: 'DELETE'})
                    .then(_ => getCustomers())
                    .catch(err => console.error(err))
    
            }
        }


    
        const columns = [
         
            {
                Header: "First name",
                accessor: "firstname"
            },
            {
                Header: "Last name",
                accessor: "lastname"
            },
            {
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Phone",
                accessor: "phone"
            },
            {
                Header: "Address",
                accessor: "streetaddress"
            },
            {
                Header: "Postcode",
                accessor: "postcode"
            },
            {
                Header: "City",
                accessor: "city"
            },
            {
                filterable: false,
                sortable: false,
                width: 100,
                Cell: row => (<Button color="secondary" size="small"
                                      onClick={() => deleteCustomer(row.row._original.links[1].href)}>Delete</Button>)
            }
        ];
    
        return (
            <div>
              <ReactTable defaultPageSize={10} filterable={true} data={customers} columns={columns} sortable={true}/>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            />
            </div>
        );
        }
