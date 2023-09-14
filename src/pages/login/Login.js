import React, { useState } from 'react';
import { useFormik } from 'formik';
import validations from './Validations';
import { Redirect } from 'react-router-dom';
import { useQuery } from '../../hooks/';
import { config, config2 } from '../../config';

const Login = () => {
    const query = useQuery();
    const next = query.get('next');
    console.log(next);
    const [first, setfirst] = useState(0);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            const loginData = {
                Email: formik.values.email,
                Password: formik.values.password,
            };
            fetch(`${config2.API_URL}/api/Accounts/login`, {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'access-control-allow-origin': '*',
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.data.statusCode === 200) {
                        sessionStorage.setItem('userEmpId', response.data.empId);
                        sessionStorage.setItem('userToken', response.data.token);
                        sessionStorage.setItem('userName', response.data.fullName);
                        sessionStorage.setItem('userTitle', response.data.title);
                        sessionStorage.setItem('userImage', response.data.profileImage);
                        sessionStorage.setItem('userTitleAbb', response.data.titleAbb);
                        setfirst(1);
                    }
                });
        },
        validationSchema: validations,
    });
    return (
        <>
            {first === 1 ? <Redirect to={next ? next : '/'}></Redirect> : null}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
                <button type="submit">Submit</button>
                <code>{JSON.stringify(formik.values)}</code>
            </form>
        </>
    );
};

export default Login;
