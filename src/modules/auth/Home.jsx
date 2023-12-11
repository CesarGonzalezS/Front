//here is where im putting the table
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import CustomModal from '../auth/';

import CustomHomeContent from '../pages/CustomHomeContent';

export default function CustomHome() {


    const [modalShow, setModalShow] = useState(false);

    const [products, setProducts] = useState([]); //here i start teh axios
    //axios
    useEffect(()=>{
        loadProducts();

    },[]);

    //axios

    const loadProducts=async()=>{
        const result= await axios.get("http://localhost:8080/api-sysstock/equipos/")
        //console.log(result)
        //chance the las for: 
        setProducts(result.data)
    } 

    return (
        <>
        <CustomNavbar />
       <CustomModal /> 

            <Table striped bordered hover className='shadow'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        products.map((product, index) => (
                            <tr>
                                <th scope='row' key={index}>
                                    {index + 1}</th>
                                <td>{product.ProfilePhoto}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.fecha}</td>
                                <td>{product.status}</td>
                                <td>{product.categoria.name}</td>
                            </tr>

                        ))
                    }     */}
                </tbody>
            </Table>
        </>
    )
}
