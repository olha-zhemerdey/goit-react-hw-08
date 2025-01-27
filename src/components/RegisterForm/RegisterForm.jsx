// import { ErrorMessage, Field, Formik, Form } from "formik";

// import { useDispatch } from "react-redux";
// import * as Yup from "yup";
// import css from "./RegisterForm.module.css";
// import { register } from "../../redux/auth/operations";

// export default function RegisterForm() {

//   const dispatch = useDispatch();

//   const handleSubmit = (values, actions) => {
//     dispatch(register(values));
//     actions.resetForm();
//   };

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .min(3, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Name is required"),
//     email: Yup.string()
//       .min(5, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(8, "Too Short!")
//       .max(50, "Too Long!")
//       .required("Password is required"),
//   });

  
//      const initialValues = {
//       name: "",
//       email: "",
//       password: "",
//     };
  
//     return (
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className={css.form}>
//         <label>
//           Name
//           <div>
//             <Field className={css.field} type="text" name="name" />
//             <ErrorMessage
//               name="name"
//               component="span"

//             />
//           </div>
//         </label>
//           <label>
//           Email
//           <div className={css.wrpap}>
//             <Field
//               className={css.input}
//               type="email"
//               name="email"
//               placeholder=""
//             />
//    <ErrorMessage
//                 ame="email" component="span"
//               />
//             </div>
//           </label>
//           <label>
//           Password
//           <div className={css.wrpap}>
//             <Field
//               className={css.input}
//               type="password"
//               name="password"
//               placeholder=""
//             />
//               <ErrorMessage
//               className={css.error}
//               name="password"
//               component="span"
//             />
//             </div>
//             </label>
//           <button type="submit">Register</button>
//         </Form>
//       </Formik>
//     );
//   }

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useId } from 'react';

import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

import css from './RegisterForm.module.css';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const RegistrationSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, 'Name is too Short!')
		.max(50, 'Name is too Long!')
		.required('Name is Required field!'),
	email: Yup.string()
		.email('Please enter a valid email')
		.required('Email is required field!'),
	password: Yup.string()
		.matches(passwordRules, 'Please create a stronger password!')
		.required('Password is required field!'),
});

const initialValues = {
	name: '',
	email: '',
	password: '',
};

const RegistrationForm = () => {
	const nameFieldId = useId();
	const emailFieldId = useId();
	const passwordFieldId = useId();

	const dispatch = useDispatch();

	const handleSubmit = (values, actions) => {
		dispatch(register(values));
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
					<label className={css.formLabel} htmlFor={nameFieldId}>
						Name
					</label>
					<div className={css.formInputWrapper}>
						<Field
							className={css.formInput}
							type='text'
							name='name'
							id={nameFieldId}
						/>
						<ErrorMessage
							className={css.formErrorMessage}
							name='name'
							component='div'
						/>
					</div>

					<label className={css.formLabel} htmlFor={emailFieldId}>
						Email
					</label>
					<div className={css.formInputWrapper}>
						<Field
							className={css.formInput}
							type='email'
							inputMode='email'
							name='email'
							id={emailFieldId}
						/>
						<ErrorMessage
							className={css.formErrorMessage}
							name='email'
							component='div'
						/>
					</div>

					<label className={css.formLabel} htmlFor={passwordFieldId}>
						Password
					</label>
					<div className={css.formInputWrapper}>
						<Field
							className={css.formInput}
							type='password'
							inputMode='text'
							name='password'
							id={passwordFieldId}
						/>
						<ErrorMessage
							className={css.formErrorMessage}
							name='password'
							component='div'
						/>
					</div>

					<button
						className={css.formButton}
						type='submit'
						disabled={isSubmitting}
					>
						Register
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default RegistrationForm;