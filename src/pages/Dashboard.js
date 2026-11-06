import React from 'react'

function Dashboard({customers}) {

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(customer=> customer.status === 'Active').length;

  const inactiveCustomers = customers.filter(customer=> customer.status === 'Inactive').length;
  return (
    <section className='dashboard-content'>
          <h3>Welcome Back!</h3>
          <p>Here what happening with your customers.</p>

          <div className='row mt-4'>

            <div className='col-md-4 mb-3'>
              <div className='stat-card'>
                <h6>Total customers</h6>
                <h2>{totalCustomers}</h2>
              </div>
            </div>

            <div className='col-md-4 mb-3'>
              <div className='stat-card'>
                <h6>Active customers</h6>
                <h2>{activeCustomers}</h2>
              </div>
            </div>

            <div className='col-md-4 mb-3'>
              <div className='stat-card'>
                <h6>Inactive customers</h6>
                <h2>{inactiveCustomers}</h2>
              </div>
            </div>

            <div className='col-md-4 mb-3'>
              <div className='stat-card'>
                <h6>recently added customer</h6>
                <h2>25</h2>
              </div>
            </div>

          </div>
        </section>
  )
}

export default Dashboard