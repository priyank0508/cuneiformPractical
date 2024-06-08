import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";

function Register() {
    const initialValue = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const registerValidation = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email address").required("Email address is Required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string().required("Confirm password is required"),
    })
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: registerValidation,
        onSubmit: async (values) => {
          const payload = {
            ...values,
          }
          const user = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, payload)
          if(!user?.data?.status){
            toast.error(user?.data?.message)
          }else {
            toast.success(user?.data?.message)
          }
        },
      });
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '400px', backgroundColor: '#f8f8f8' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Register</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group m-2">
                            <label className='mb-2'>First Name</label>
                            <input 
                            type='text'
                            className="form-control"
                            id="firstName"
                            name="firstName"    
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            placeholder="Enter first name" 
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <span className="text-danger">{formik.errors.firstName}</span>
                            ) : null}
                        </div>
                        <div className="form-group m-2">
                            <label className='mb-2' >Last Name</label>
                            <input 
                            type='text'
                            className="form-control"
                            id="lastName"
                            name="lastName"    
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            placeholder="Enter last name" 
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <span className="text-danger">{formik.errors.lastName}</span>
                            ) : null}
                        </div>
                        <div className="form-group m-2">
                            <label className='mb-2' >Email address</label>
                            <input 
                            type='text'
                            className="form-control"
                            id="email"
                            name="email"    
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Enter email" 
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <span className="text-danger">{formik.errors.email}</span>
                            ) : null}
                        </div>
                        <div className="form-group m-2">
                            <label className='mb-2'>Password</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            id="password"
                            name="password" 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Password" 
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <span className="text-danger">{formik.errors.password}</span>
                            ) : null}
                        </div>
                        <div className="form-group m-2">
                            <label className='mb-2'>Confirm Password</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            id="confirmPassword"
                            name="confirmPassword" 
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            placeholder="Confirm Password" 
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <span className="text-danger">{formik.errors.confirmPassword}</span>
                            ) : null}
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </div>
                        <p className='m-2'>Already have account <Link to='/login'>Login</Link></p>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Register