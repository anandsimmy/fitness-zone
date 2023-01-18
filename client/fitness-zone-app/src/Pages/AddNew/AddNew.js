import { useState } from 'react';
import './AddNew.css';

const AddNew = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    age: '',
    email: '',
    planType: '',
    startDate: '',
    endDate: '',
    comment: '',
  });

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
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2IyNTdkMjgyZmE3MTlhN2U3YTExNWIiLCJ1c2VyRW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY3MzkyMzgzNiwiZXhwIjoxNjc0MDEwMjM2fQ.SwOVg1Ro9Cg8WSBeHonHfSFcufcuYT9CuRdMb9LO7Ig',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          console.log('Successfully added', data);
          return;
        }
        throw new Error(data.message);
      })
      .catch((error) => console.log('Sorry, Please try again', error));
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
          <input
            type='text'
            name='planType'
            placeholder='Enter Plan'
            className='inputWrapper'
            value={formData.plan}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label className='labelContainer'>
          <span className='labelWrapper'>Start Date</span>
          <input
            type='date'
            name='startDate'
            placeholder='Enter Start Date'
            className='inputWrapper'
            value={formData.start_date}
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
            className='inputWrapper'
            value={formData.end_date}
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
