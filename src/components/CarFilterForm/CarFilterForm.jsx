import React, { useEffect, useState } from 'react';
import { FilterValidationSchema } from '../../utils/validation';
import { FilterInitialValues } from '../../utils/validation';
import styles from './CarFilterForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const CarFilterForm = ({ onFilter }) => {
  const [brands, setBrands] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async values => {
    try {
      const response = await axios.get('/api/vehicles', { params: values });
      onFilter(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `https://car-rental-api.goit.global/brands`
      );
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
    const generatedPrices = [];
    for (let price = 30; price <= 100; price += 10) {
      generatedPrices.push(price.toString());
    }
    setPrices(generatedPrices);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={FilterInitialValues}
      validationSchema={FilterValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="brand">Car Brand</label>
            <Field
              className={styles.formSelect}
              as="select"
              name="brand"
              placeholder="Choose a brand"
            >
              <option value="" label="Choose a brand" />
              {brands.map(brand => (
                <option key={brand} value={brand} label={brand} />
              ))}
            </Field>
            <ErrorMessage
              name="brand"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price/ 1 hour</label>
            <Field className={styles.formSelect} as="select" name="price">
              <option value="" label="Choose a price" />
              {prices.map(price => (
                <option key={price} value={price} label={`$${price}`} />
              ))}
            </Field>
            <ErrorMessage
              name="price"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mileageFrom">Car Mileage / km</label>
            <div className={styles.mileageFields}>
              <Field
                className={styles.formInput}
                name="mileageFrom"
                type="number"
                placeholder="From"
              />
              <Field
                className={styles.formInputSecond}
                name="mileageTo"
                type="number"
                placeholder="To"
              />
            </div>
            <ErrorMessage
              name="mileageFrom"
              component="div"
              className={styles.errorMessage}
            />
            <ErrorMessage
              name="mileageTo"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.positionBtn}>
            {' '}
            <button className={styles.filterBtn} type="submit">
              Search
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CarFilterForm;
