import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bookingDate: Yup.date().required('Booking date is required'),
  comment: Yup.string().max(500, 'Comment must be less than 500 characters'),
});

export default validationSchema;
