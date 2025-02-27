import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from '../../utils/validation';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ name: '', email: '', bookingDate: '', comment: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log('Форма відправлена:', values);
          resetForm();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className={styles.formLabel}>
              <h2 className={styles.formTitle}>Book your car now</h2>
              <p className={styles.formText}>
                Stay connected! We are always ready to help you.
              </p>
            </div>
            <div className={styles.formInputs}>
              <div>
                <Field
                  className={styles.input}
                  name="name"
                  type="text"
                  placeholder="Name*"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div>
                <Field
                  className={styles.input}
                  name="email"
                  type="email"
                  placeholder="Email*"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputWrapper}>
                <Field
                  name="bookingDate"
                  render={({ field }) => (
                    <input
                      {...field}
                      type={values.bookingDate ? 'date' : 'text'}
                      className={styles.input}
                      placeholder="Booking date"
                      onFocus={event => (event.target.type = 'date')}
                      onBlur={event => {
                        if (!event.target.value) {
                          event.target.type = 'text';
                        }
                      }}
                      onChange={event =>
                        setFieldValue('bookingDate', event.target.value)
                      }
                    />
                  )}
                />
                <ErrorMessage
                  name="bookingDate"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  className={styles.inputComent}
                  name="comment"
                  placeholder="Comment"
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className={styles.error}
                />
              </div>
              <button className={styles.formBtn} type="submit">
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;

// import React, { useState } from 'react';
// import styles from './Form.module.css';

// const Form = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [bookingDate, setBookingDate] = useState('');
//   const [comment, setComment] = useState('');

//   const handleSubmit = event => {
//     event.preventDefault();
//     console.log(`Форма відправлена:
//       Ім'я: ${name}
//       Email: ${email}
//       Дата бронювання: ${bookingDate}
//       Коментар: ${comment}
//     `);
//   };

//   return (
//     <div className={styles.form}>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formLabel}>
//           <h2 className={styles.formTitle}>Book your car now</h2>
//           <p className={styles.formText}>
//             Stay connected! We are always ready to help you.
//           </p>
//         </div>
//         <div className={styles.formInputs}>
//           <div>
//             <input
//               className={styles.input}
//               placeholder="Name*"
//               type="text"
//               value={name}
//               onChange={event => setName(event.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               className={styles.input}
//               placeholder="Email*"
//               type="email"
//               value={email}
//               onChange={event => setEmail(event.target.value)}
//             />
//           </div>

//           <div className={styles.inputWrapper}>
//             <label htmlFor="bookingDate" className={styles.label}>
//               Booking date
//             </label>
//             <input
//               name="bookingDate"
//               className={styles.input}
//               type="date"
//               value={bookingDate}
//               onChange={event => setBookingDate(event.target.value)}
//             />
//           </div>

//           <div>
//             <textarea
//               className={styles.inputComent}
//               placeholder="Comment"
//               value={comment}
//               onChange={event => setComment(event.target.value)}
//             />
//           </div>
//           <button className={styles.formBtn} type="submit">
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Form;
