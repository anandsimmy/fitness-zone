import { useState, useEffect } from 'react';
import './AddNew.css';

const AddNew = () => {
  // for calculating end date
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  const [formData, setFormData] = useState({
    customer_name: '',
    age: '',
    email: '',
    planType: '1',
    startDate: new Date().toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    comment: '',
  });

  useEffect(() => {
    // for calculating end date
    const endDate = new Date(formData.startDate);
    endDate.setMonth(endDate.getMonth() + parseInt(formData.planType));
    setFormData((formData) => ({
      ...formData,
      endDate: endDate.toISOString().split('T')[0],
    }));
  }, [formData.planType, formData.startDate]);

  const onChangeHandler = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/addNewCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2IyNTdkMjgyZmE3MTlhN2U3YTExNWIiLCJ1c2VyRW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY3NDA5ODc4MywiZXhwIjoxNjc0MTg1MTgzfQ.wnIkdYGe7Sgp2Bds0GPHmhIp6xnkrBhMyjxpwz5go94',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          console.log('Successfully added', data);
          return;
        }
        // throwing error
        throw data;
      })
      .catch((error) => {
        console.log('Sorry, Please try again.', error.message, error);
      });
  };

  return (
    <div className='mainContainer'>
      <form className='formContainer' onSubmit={onSubmitHandler}>
        <label className='labelContainer'>
          <span className='labelWrapper'>Name</span>
          <input
            name='customer_name'
            type='text'
            placeholder='Enter Name'
            className='inputWrapper'
            value={formData.customer_name}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label className='labelContainer'>
          <span className='labelWrapper'>Age</span>
          <input
            name='age'
            type='number'
            placeholder='Enter Age'
            className='inputWrapper'
            value={formData.age}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label className='labelContainer'>
          <span className='labelWrapper'>Email</span>
          <input
            type='text'
            name='email'
            placeholder='Enter Email'
            className='inputWrapper'
            value={formData.email}
            onChange={onChangeHandler}
          />
        </label>
        <label className='labelContainer'>
          <span className='labelWrapper'>Plan</span>
          <div className='planWrapper'>
            <span className='inputTypeWrapper'>
              <input
                type='radio'
                value={1}
                name='planType'
                required
                onChange={onChangeHandler}
                defaultChecked
              />{' '}
              1 month
            </span>
            <span className='inputTypeWrapper'>
              <input
                type='radio'
                value={3}
                name='planType'
                required
                onChange={onChangeHandler}
              />{' '}
              3 month
            </span>
            <span className='inputTypeWrapper'>
              <input
                type='radio'
                value={6}
                name='planType'
                required
                onChange={onChangeHandler}
              />{' '}
              6 month
            </span>
            <span className='inputTypeWrapper'>
              <input
                type='radio'
                value={12}
                name='planType'
                required
                onChange={onChangeHandler}
              />
              12 month
            </span>
          </div>
        </label>
        <label className='labelContainer'>
          <span className='labelWrapper'>Start Date</span>
          <input
            type='date'
            name='startDate'
            placeholder='Enter Start Date'
            className='inputWrapper dateWrapper'
            value={formData.startDate}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label className='labelContainer'>
          <span className='labelWrapper'>End Date</span>
          <input
            type='date'
            name='endDate'
            placeholder='Enter End Date'
            className='inputWrapper dateWrapper'
            value={formData.endDate}
            onChange={onChangeHandler}
          />
        </label>
        <label className='labelContainer'>
          <span className='labelWrapper'>Comments</span>
          <input
            type='textarea'
            name='comment'
            placeholder='Special Offers?'
            className='inputWrapper commentsContainer'
            value={formData.comments}
            onChange={onChangeHandler}
          />
        </label>
        <div className='submitContainer'>
          <input className='submitButton' type='submit' value='ADD' />
        </div>
      </form>
    </div>
  );
};

export default AddNew;
