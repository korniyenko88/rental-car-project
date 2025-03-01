import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sprite from '../../image/sprite.svg';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import styles from './CarDetailsPage.module.css';
import BookingForm from '../../components/BookingForm/BookingForm';

const CarDetailsPage = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `https://car-rental-api.goit.global/cars/${id}`
        );
        setCar(response.data);
      } catch (error) {
        setError(
          error.response
            ? error.response.data.message
            : 'Error fetching car details'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>Error fetching car details: {error}</h2>;
  }

  return (
    <div>
      <div className={styles.container}>
        {car && (
          <>
            <img
              className={styles.img}
              src={car.img}
              alt={`${car.brand} ${car.model}`}
            />
            <div className={styles.carDescription}>
              <div className={styles.firstBlok}>
                <h1 className={styles.title}>
                  {car.brand} {car.model}, {car.year}{' '}
                  <span className={styles.titleId}>
                    id: {car.id.slice(0, 4)}
                  </span>
                </h1>
                <span className={styles.locationMiles}>
                  <p>
                    <svg className={styles.iconSvg} aria-hidden="true">
                      <use href={`${sprite}#icon-Location`} />
                    </svg>
                    {car.address.split(',').slice(1).join(',').trim()}
                    <span className={styles.milesPosition}>
                      {' '}
                      Mileage: {car.mileage.toLocaleString('ru-RU')} km
                    </span>
                  </p>
                </span>
                <p className={styles.carPrice}>${car.rentalPrice}</p>
              </div>

              <p className={styles.decrCar}>{car.description}</p>

              <h3 className={styles.conditionTitle}>Rental Conditions:</h3>
              <ul className={styles.conditionList}>
                {car.rentalConditions.map((condition, index) => (
                  <li className={styles.conditionalItem} key={index}>
                    <svg className={styles.iconSvg} aria-hidden="true">
                      <use href={`${sprite}#icon-check-circle`} />
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>

              <h3 className={styles.conditionTitle}>Car Specifications:</h3>
              <ul className={styles.conditionList}>
                <li className={styles.conditionalItem}>
                  <svg className={styles.iconSvg} aria-hidden="true">
                    <use href={`${sprite}#icon-calendar`} />
                  </svg>
                  Year: {car.year}
                </li>
                <li className={styles.conditionalItem}>
                  <svg className={styles.iconSvg} aria-hidden="true">
                    <use href={`${sprite}#icon-car`} />
                  </svg>
                  Type: {car.type}
                </li>
                <li className={styles.conditionalItem}>
                  <svg className={styles.iconSvg} aria-hidden="true">
                    <use href={`${sprite}#icon-fuel-pump`} />
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={styles.conditionalItem}>
                  <svg className={styles.iconSvg} aria-hidden="true">
                    <use href={`${sprite}#icon-gear`} />
                  </svg>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
              <h3 className={styles.conditionTitle}>
                Accessories and Functionalities:
              </h3>
              <ul className={styles.conditionList}>
                {car.accessories
                  .concat(car.functionalities)
                  .map((item, index) => (
                    <li className={styles.conditionalItem} key={index}>
                      <svg className={styles.iconSvg} aria-hidden="true">
                        <use href={`${sprite}#icon-check-circle`} />
                      </svg>
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            <BookingForm />
          </>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;
