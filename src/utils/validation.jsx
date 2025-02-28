import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bookingDate: Yup.date().required('Booking date is required'),
  comment: Yup.string().max(500, 'Comment must be less than 500 characters'),
});





 export const FilterValidationSchema = Yup.object({
   brand: Yup.string(),
   price: Yup.string(),
   mileageFrom: Yup.number().optional().min(0, 'Must be at least 0'),
   mileageTo: Yup.number()
     .optional()
     .min(
       Yup.ref('mileageFrom'),
       'Must be greater than or equal to From mileage'
     ),
 });

 export const FilterInitialValues = {
   brand: '',
   price: '',
   mileageFrom: '',
   mileageTo: '',
 };