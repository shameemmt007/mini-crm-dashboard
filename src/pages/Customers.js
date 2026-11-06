import React, { useEffect, useState } from 'react'

import { Modal, Button } from 'react-bootstrap';
import { FaPlus,FaEdit, FaTrash } from 'react-icons/fa';

function Customers({customers, setCustomers}) {

    

    const [search , setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All')

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        company:'',
        status:'Active'
    })

    

    const handleChange = (e)=>{
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('edit id diring submit', editId)

        if (editId){
            const updatedCustomer = customers.map((customer)=>
                customer.id === editId ? {...customer, ...formData}:customer
            )
            setCustomers(updatedCustomer)
        }else { 
                const newCustomer = {
                id: Date.now(),
                ...formData,
                date: new Date().toISOString().split('T')[0]
            };
            setCustomers([...customers, newCustomer]);
            
        }

        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            status: 'Active'
        });

        setShowModal(false);
        setEditId(null);
    };

    useEffect(()=>{
        localStorage.setItem('customers', JSON.stringify(customers))
    },[customers]);

    const filteredCustomers = customers.filter((customer)=>{
        const matchsearch = customer.name.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;

        return matchsearch && matchesStatus
    });


    // edit

    const [editId, setEditId] = useState(null)

    const handleEdit = (customer)=>{
        setEditId(customer.id)

        setFormData({
            name:customer.name,
            email:customer.email,
            phone:customer.phone,
            company:customer.company,
            status:customer.status
        })
        setShowModal(true);
    }

    // delete

    const handleDelete = (id)=>{
        const conformDelete = window.confirm('are you want to delete this customer')

        if (conformDelete){
            const updatedCustomer = customers.filter((customer)=>
                customer.id !== id
            )
            setCustomers(updatedCustomer);
        };
    };

  return (
    <div>
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h3>Customer Management</h3>
                <p>Manage your customers here</p>
            </div>

            <Button variant="primary" onClick={() => setShowModal(true)} >
                <FaPlus className="me-2" />Add Customer
            </Button>
        </div>

        <div className='row mt-4 mb-3'>
            <div className='col-md-6 mb-2'>
                <input type='text' className='form-control' 
                placeholder='serch customers by name...'
                value={search}

                onChange={(e)=> setSearch(e.target.value)}
                />
            </div>

            <div className='col-md-3 mb-2'>
                <select className='form-select'
                value={statusFilter}
                onChange={(e)=> setStatusFilter(e.target.value)}
                >
                    <option value='All'>All Customerse</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                </select>
            </div>
        </div>





        <div className='table-responsive mt-4'>
            <table className='table table-hover bg-white'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Date added</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredCustomers.map((customer)=>(
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.company}</td>
                            <td>{customer.status}</td>
                            <td>{customer.date}</td>
                            <td> 
                                <Button variant='outline-primary'
                                size='sm' className='me-2' onClick={()=>handleEdit(customer)}> <FaEdit /> </Button>

                                <Button variant='outline-danger' size='sm' onClick={()=>handleDelete(customer.id)}> <FaTrash/> </Button>


                             </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{editId !== null ? 'Edit customer':'Add New Customer'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div className="d-flex justify-content-end gap-2">

                <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setShowModal(false)}
                >
                    Cancel
                </Button>

                <Button variant="primary" type="submit">
                    {editId ? 'Edit' : 'Save customer'}
                </Button>

            </div>

        </form>

    </Modal.Body>
</Modal>

    </div>
  )
}

export default Customers