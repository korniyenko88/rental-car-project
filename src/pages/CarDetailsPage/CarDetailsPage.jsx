import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sprite from '../../image/sprite.svg';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
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
    <div className={styles.container}>
      {car && (
        <>
          <img
            className={styles.img}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
          />
          <div className={styles.carDescription}>
            <h1>
              {car.brand} {car.model}, {car.year}{' '}
              <span>id: {car.id.slice(0, 4)}</span>
            </h1>
            <p>
              <svg className={styles.iconSvg} aria-hidden="true">
                <use href={`${sprite}#icon-Location`} />
              </svg>
              {car.address.split(',').slice(1).join(',').trim()}
              <span>Mileage: {car.mileage} km</span>
            </p>

            <p>{car.rentalPrice}$</p>
            <p>{car.description}</p>

            <p>
              <h3>Rental Conditions:</h3>
              <ul>
                {car.rentalConditions.map((condition, index) => (
                  <li key={index}>
                    <svg className={styles.iconSvg} aria-hidden="true">
                      <use href={`${sprite}#icon-check-circle`} />
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>
            </p>

            <h3>Car Specifications:</h3>
            <ul>
              <li>
                <svg className={styles.iconSvg} aria-hidden="true">
                  <use href={`${sprite}#icon-calendar`} />
                </svg>
                Year: {car.year}
              </li>
              <li>
                <svg className={styles.iconSvg} aria-hidden="true">
                  <use href={`${sprite}#icon-car`} />
                </svg>
                Type: {car.type}
              </li>
              <li>
                <svg className={styles.iconSvg} aria-hidden="true">
                  <use href={`${sprite}#icon-fuel-pump`} />
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li>
                <svg className={styles.iconSvg} aria-hidden="true">
                  <use href={`${sprite}#icon-gear`} />
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
            <h3>Accessories and Functionalities:</h3>
            <ul>
              {car.accessories
                .concat(car.functionalities)
                .map((item, index) => (
                  <li key={index}>
                    <svg className={styles.iconSvg} aria-hidden="true">
                      <use href={`${sprite}#icon-check-circle`} />
                    </svg>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetailsPage;
