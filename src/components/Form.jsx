import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const Form = ({ selectedUser, setSelectedUser, isVisible, setIsVisible }) => {
  const { addUser, updateUser } = useContext(UserContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    school: "",
  })

  const [errors, setError] = useState({})

  useEffect(() => {
    if (selectedUser) {
      setData(selectedUser)
    }
  }, [selectedUser])

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const validateForm = (data) => {
    const errors = {};
    // eslint-disable-next-line no-useless-escape
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    const pincodeRegex = /^[1-9][0-9]{5}$/;

    if (!data.firstName.trim()) {
      errors.firstName = 'Username is required';
    } else if (data.firstName.length < 4) {
      errors.firstName = 'Username must be at least 4 characters long';
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'LastName is required';
    } else if (data.lastName.length < 4) {
      errors.lastName = 'LastName must be at least 4 characters long';
    }

    if (!data.age.trim()) {
      errors.age = 'Age is required';
    } else if (data.age.length < 0 || data.age.length > 150) {
      errors.age = 'Age is invalid';
    }

    if (!data.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!phoneRegex.test(data.phone)) {
      errors.phone = 'Phone is not valid';
    }

    if (!data.city.trim()) {
      errors.city = 'City is required !!';
    } else if (data.city.length < 3) {
      errors.city = ' city must be 3 characters long';
    }

    if (!data.state.trim()) {
      errors.state = 'State is required';
    } else if (data.state.length < 3) {
      errors.state = 'State must be a 3 characters long';
    }

    if (!data.country.trim()) {
      errors.country = 'Country is required'
    } else if (data.country.length < 3) {
      errors.country = 'Country must be a 3 characters long';
    }

    if (!data.pincode.trim()) {
      errors.pincode = 'pincode is required';
    } else if (!pincodeRegex.test(data.pincode)){
      errors.pincode = 'Pincode is not valid'
    }

    if (!data.school.trim()) {
      errors.school = 'School is required';
    } else if (data.school.length < 3) {
      errors.school = 'School must be a 3 characters long';
    }
    return errors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateForm(data);
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (selectedUser && isVisible) {
        updateUser(selectedUser.id, data, isVisible)
        setSelectedUser(null);
        setIsVisible(null)
        alert('Data Updated SuccessFully !!')
      }
      else {
        addUser(data);
        alert('Data Submitted SuccessFully !!')
      } 
      setData({
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        school: "",
      }) 
    } else {
      console.log('Form submission failed due to validation errors.');
    }
  }

  function resetForm () {
    setData({
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      school: "",
    }) 
    setIsVisible(null)
  }

  return (
    <form onSubmit={handleSubmit} className='px-20 py-7'>
      <h1 className="text-3xl font-bold mt-1 mb-5 text-center text-blue-500">Application Form</h1>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-black-900 dark:text-blue-500">Enter FirstName</label>
          <input id='text' name='firstName' value={data.firstName} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.firstName && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.firstName}
            </span>
          )}
        </div>
        <div>
          <label htmlFor='lastName' className="block mb-2 text-sm font-medium text-white-900 dark:text-blue-500">Enter LastName</label>
          <input id='text' name='lastName' value={data.lastName} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.lastName && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.lastName}
            </span>
          )}
        </div>
        <div>
          <label htmlFor='age' className="block mb-2 text-sm font-medium text-white-900 dark:text-blue-500">Enter Age</label>
          <input id='number' name='age' value={data.age} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.age && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.age}
            </span>
          )}
        </div>
        <div>
          <label htmlFor='phone' className="block mb-2 text-sm font-medium text-white-900 dark:text-blue-500">Enter Phone</label>
          <input id='text' name='phone' value={data.phone} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.phone && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.phone}
            </span>
          )}
        </div>
        <div>
          <label htmlFor='city' className="block mb-2 text-sm font-medium text-white-900 dark:text-blue-500">Enter City</label>
          <input id='text' name='city' value={data.city} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.city && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.city}
            </span>
          )}
        </div>
        <div>
          <label htmlFor='state' className="block mb-2 text-sm font-medium text-white-900 dark:text-blue-500">Enter State</label>
          <input id='text' name='state' value={data.state} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.state && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.state}
            </span>
          )}
        </div>
        <div>
          <label htmlFor='country' className="block mb-2 text-sm font-medium text-white-900 dark:text-blue-500">Enter Country</label>
          <input id='text' name='country' value={data.country} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.country && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.country}
            </span>
          )}
        </div>
        <div>
          <label htmlFor='pincode' className="block mb-2 text-sm font-medium text-white-900 dark:text-blue-500">Enter Pincode</label>
          <input id='text' name='pincode' value={data.pincode} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.pincode && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.pincode}
            </span>
          )}
        </div>
        <div>
          <label htmlFor='school' className="block mb-2 text-sm font-medium text-white-900 dark:text-blue-500">Enter School</label>
          <input id='text' name='school' value={data.school} onChange={handleChange} className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          {errors.school && (
            <span className="error-message" style={{ color: "red" }}>
              {errors.school}
            </span>
          )}
        </div>
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Submit</button>
      <button type="button" onClick={resetForm} className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full lg:ml-2 md:ml-2 sm:ml-2 sm:w-auto px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset</button>
      </form>
  )
}