import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const initialValue = {
        email: "",
        password: "",
    };

    const registerValidation = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email address is Required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: registerValidation,
        onSubmit: async (values) => {
            const payload = { ...values };
            const user = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, payload);
            if (!user?.data?.status) {
                toast.error(user?.data?.message);
            } else {
                toast.success(user?.data?.message);
                localStorage.setItem('token', user?.data?.data[0].token)
                navigate('/articles')
            }
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '400px', backgroundColor: '#f8f8f8' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group m-2">
                            <label className='mb-2'>Email address</label>
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
                        <div className="form-group m-2 position-relative">
                            <label className='mb-2'>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="Password"
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="position-absolute top-50 end-0 me-2"
                                style={{ cursor: 'pointer' }}
                            >
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                            {formik.touched.password && formik.errors.password ? (
                                <span className="text-danger">{formik.errors.password}</span>
                            ) : null}
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </div>
                        <p className='m-2'>Don't have an account? <Link to='/'>Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

