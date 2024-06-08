import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";

function AddArticle() {
    const location = useLocation();
    const title = location.state.title;

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const config = { headers: {"Authorization" : `Bearer ${token}`} }
    

    const initialValue = {
        title: "",
        category: "",
        slug: "",
        description: "",
    };

    const validation = Yup.object({
        title: Yup.string().required("Title is required"),
        category: Yup.string().required("Category is required"),
        slug: Yup.string().required("Slug is required"),
        description: Yup.string().required("Description is required"),
    });

    const formik = useFormik({
        initialValues: initialValue,
        validationSchema: validation,
        onSubmit: async (values) => {
            const payload = { ...values };
            const article = await axios.post(`${process.env.REACT_APP_API_URL}/article/add-article`, payload, config);
            if (!article?.data?.status) {
                toast.error(article?.data?.message);
            } else {
                toast.success(article?.data?.message);
                navigate('/articles')
            }
        },
    });

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '800px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">{title}</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group m-2">
                            <label className='mb-2'>Title</label>
                            <input
                                type='text'
                                className="form-control"
                                id="title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                placeholder="Enter title"
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <span className="text-danger">{formik.errors.title}</span>
                            ) : null}
                        </div>
                        <div className="form-group m-2 position-relative">
                            <label className='mb-2'>Category</label>
                            <input
                                type='text'
                                className="form-control"
                                id="category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                placeholder="category"
                            />
                            {formik.touched.category && formik.errors.category ? (
                                <span className="text-danger">{formik.errors.category}</span>
                            ) : null}
                        </div>
                        <div className="form-group m-2 position-relative">
                            <label className='mb-2'>Slug</label>
                            <input
                                type='text'
                                className="form-control"
                                id="slug"
                                name="slug"
                                value={formik.values.slug}
                                onChange={formik.handleChange}
                                placeholder="slug"
                            />
                            {formik.touched.slug && formik.errors.slug ? (
                                <span className="text-danger">{formik.errors.slug}</span>
                            ) : null}
                        </div>
                        <div className="form-group m-2 position-relative">
                            <label className='mb-2'>Description</label>
                            <textarea
                                // type='textarea'
                                className="form-control"
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                placeholder="description"
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <span className="text-danger">{formik.errors.description}</span>
                            ) : null}
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddArticle;

