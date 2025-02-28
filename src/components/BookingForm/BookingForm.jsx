import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {validationSchema} from '../../utils/validation';
import styles from './BookingForm.module.css';

const BookingForm = () => {
  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ name: '', email: '', bookingDate: '', comment: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
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
