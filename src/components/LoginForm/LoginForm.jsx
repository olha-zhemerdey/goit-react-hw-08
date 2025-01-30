// import { ErrorMessage, Field, Formik, Form } from "formik";
// import { useDispatch } from "react-redux";
// import * as Yup from "yup";
// import css from "./LoginForm.module.css";
// import { logIn } from "../../redux/auth/operations";

// export default function LoginForm() {
//   const dispatch = useDispatch();

//   const handleSubmit = (values, actions) => {
//     dispatch(logIn(values));
//     actions.resetForm();
//   };

//  const validationSchema = Yup.object().shape({
//      email: Yup.string()
//        .min(5, "Too Short!")
//        .max(50, "Too Long!")
//        .required("Email is required"),
//      password: Yup.string()
//        .min(8, "Too Short!")
//        .max(50, "Too Long!")
//        .required("Password is required"),
//    });

  
//    const initialValues = {
//     email: "",
//     password: "",
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={validationSchema}
//     >
//       <Form className={css.form}>
//         <label>
//         Email
//         <div className={css.wrpap}>
//           <Field
//             className={css.input}
//             type="email"
//             name="email"
//             placeholder=""
//           />
//  <ErrorMessage
//               ame="email" component="span"
//               style={{ color: "tomato" }}
//             />
//           </div>
//         </label>
//         <label>
//         Password
//         <div className={css.wrpap}>
//           <Field
//             className={css.input}
//             type="password"
//             name="password"
//             placeholder=""
//           />
//             <ErrorMessage
//             className={css.error}
//             name="password"
//             component="span"
//           />
//           </div>
//           </label>
//         <button type="submit">Log in</button>
//       </Form>
//     </Formik>
//   );
// }


import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CiLogin } from 'react-icons/ci';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

import css from './LoginForm.module.css';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const RegistrationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Please enter a valid email!')
		.required('Email is required!'),
	password: Yup.string()
		.matches(passwordRules, 'Please enter a valid password!')
		.required('Password is required!'),
});

const initialValues = {
	email: '',
	password: '',
};

const LoginForm = () => {

	const dispatch = useDispatch();

	const handleSubmit = (values, actions) => {
		dispatch(login(values));
		actions.setSubmitting(false);
		actions.resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={RegistrationSchema}
		>
			{({ isSubmitting }) => (
				<Form className={css.formContact}>
					<label className={css.formLabel} >
					Email
					<div className={css.formInputWrapper}>
						<Field
							className={css.formInput}
							type='email'
							inputMode='email'
							name='email'
							
						/>
						<ErrorMessage
							className={css.formErrorMessage}
							name='email'
							component='div'
						/>
					</div>
					</label>
					<label className={css.formLabel}>
					Password
					<div className={css.formInputWrapper}>
						<Field
							className={css.formInput}
							type='password'
							inputMode='text'
							name='password'
						
						/>
						<ErrorMessage
							className={css.formErrorMessage}
							name='password'
							component='div'
						/>
					</div>
					</label>
					<button
						className={css.formButton}
						type='submit'
						disabled={isSubmitting}
					>
						<CiLogin /> <span>LogIn</span>
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;