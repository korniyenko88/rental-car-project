import React, { useEffect, useState } from 'react';
import { FilterValidationSchema } from '../../utils/validation';
import { FilterInitialValues } from '../../utils/validation';
import styles from './CarFilterForm.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Loader from '../Loader/Loader';
import sprite from '../../image/sprite.svg';

const CarFilterForm = ({ onFilter }) => {
  const [brands, setBrands] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([_, value]) => value !== '' && value !== null
        )
      );

      if (Object.keys(filteredValues).length === 0) {
        toast.warning('All fields are empty! The request will not be sent!');
        return;
      }

      const params = {
        ...(filteredValues.brand && { brand: String(filteredValues.brand) }),
        ...(filteredValues.minMileage && {
          minMileage: String(filteredValues.minMileage),
        }),
        ...(filteredValues.maxMileage && {
          maxMileage: String(filteredValues.maxMileage),
        }),
        ...(filteredValues.rentalPrice && {
          rentalPrice: String(filteredValues.rentalPrice),
        }),
      };

      const response = await axios.get(
        `https://car-rental-api.goit.global/cars`,
        { params }
      );
      if (response.data.cars.length === 0) {
        toast.error('Cars not found!');
      } else {
        onFilter(response.data);
        resetForm();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `https://car-rental-api.goit.global/brands`
      );
      setBrands(response.data);
    } catch (error) {
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
    return <Loader />;
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
            <div
              className={styles.selectWrapper}
              onClick={() => setIsOpenBrand(!isOpenBrand)}
            >
              <Field
                className={styles.formSelect}
                as="select"
                name="brand"
                placeholder="Choose a brand"
                onBlur={() => setIsOpenBrand(false)}
              >
                <option value="" label="Choose a brand" />
                {brands.map(brand => (
                  <option key={brand} value={brand} label={brand} />
                ))}
              </Field>
              <div className={styles.icon}>
                <svg aria-hidden="true">
                  <use
                    href={`${sprite}#${
                      isOpenBrand ? 'icon-arow-up' : 'icon-arow-doun'
                    }`}
                  />
                </svg>
              </div>
            </div>
            <ErrorMessage
              name="brand"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Price/ 1 hour</label>
            <div
              className={styles.selectWrapper}
              onClick={() => setIsOpenPrice(!isOpenPrice)}
            >
              <Field
                className={styles.formSelect}
                as="select"
                name="rentalPrice"
                onBlur={() => setIsOpenPrice(false)}
              >
                <option value="" label="Choose a price" />
                {prices.map(price => (
                  <option key={price} value={price} label={`$${price}`} />
                ))}
              </Field>
              <div className={styles.icon}>
                <svg aria-hidden="true">
                  <use
                    href={`${sprite}#${
                      isOpenPrice ? 'icon-arow-up' : 'icon-arow-doun'
                    }`}
                  />
                </svg>
              </div>
            </div>
            <ErrorMessage
              name="rentalPrice"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="minMileage">Car Mileage / km</label>
            <div>
              <Field
                className={styles.formInput}
                name="minMileage"
                type="text"
                placeholder="From"
                onInput={e => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
              />
              <Field
                className={styles.formInputSecond}
                name="maxMileage"
                type="text"
                placeholder="To"
                onInput={e => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
              />
            </div>
            <ErrorMessage
              name="minMileage"
              component="div"
              className={styles.errorMessage}
            />
            <ErrorMessage
              name="maxMileage"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.positionBtn}>
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
