import React, { useState } from 'react';
import { useFormik } from 'formik';
import validations from './Validations';
import { Redirect, useHistory } from 'react-router-dom';
import { useQuery } from '../../hooks/';
import { APICore } from '../../helpers/api/apiCore';
import { useSelector, useDispatch } from 'react-redux';
import { resetAuth, loginUser } from '../../redux/actions';
import { config, config2 } from '../../config';
const Login = () => {
    let history = useHistory();
    const api = new APICore();
    const dispatch = useDispatch();
    const query = useQuery();
    const next = query.get('next');

    const [first, setfirst] = useState(0);
    const [loginUserData, setLoginUserData] = useState();

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));
    console.log(loading, userLoggedIn, user, error);

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
                    setLoginUserData(response);
                    const token = response.data.token;
                    if (response.data.statusCode === 200) {
                        const user = { loginData, token };
                        console.log(user);
                        api.setLoggedInUser(user);
                        dispatch(loginUser(loginData.Email, loginData.Password, token));
                        localStorage.setItem('userEmpId', response.data.empId);
                        localStorage.setItem('userToken', response.data.token);
                        localStorage.setItem('userName', response.data.fullName);
                        localStorage.setItem('userTitle', response.data.title);
                        localStorage.setItem('userImage', response.data.profileImage);
                        localStorage.setItem('userTitleAbb', response.data.titleAbb);
                        setfirst(1);
                        // history.push('/apps/calendar')
                    }
                });
        },
        validationSchema: validations,
    });
    return (
        <>
            {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null}
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
