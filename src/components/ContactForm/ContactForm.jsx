import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast from 'react-hot-toast';

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
    .unwrap()
			.then((result) => {
				toast.success(`Contact ${values.name} Successfully added!`);
				console.log('result: ', result);

				actions.setSubmitting(false);
				actions.resetForm();
			})
			.catch((error) => {
				toast.error('Failed to add contact');

				actions.setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Number is required"),
  });

  const initialValues = {
    name: "",
    number: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
      <Form className={css.form}>
        <label>
          Name
          <div>
            <Field className={css.field} type="text" name="name" placeholder='Enter First Name and Last Name' />
            <ErrorMessage
              name="name"
              component="div"

            />
          </div>
        </label>
        <label>
          Number
          <div>
            <Field
              className={css.field}
              type="tel"
              inputMode="tel"
              name="number"
              placeholder='Phone format: XXX-XXX-XXXX'
            />
            <ErrorMessage
              name="number"
              component="div"
              style={{ color: "tomato" }}
            />
          </div>
        </label>
        <button type="submit" disabled={isSubmitting}>Add contact</button>
      </Form>
      )}
    </Formik>
);
      }

      export default ContactForm;