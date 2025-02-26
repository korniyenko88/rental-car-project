import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
              {car.brand} {car.model}
            </h1>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Rental Price:</strong> {car.rentalPrice}$
            </p>
            <p>
              <strong>Rental Company:</strong> {car.rentalCompany}
            </p>
            <p>
              <strong>Address:</strong> {car.address}
            </p>
            <p>
              <strong>Type:</strong> {car.type}
            </p>
            <p>
              <strong>Mileage:</strong> {car.mileage} km
            </p>
            <p>
              <strong>Description:</strong> {car.description}
            </p>
            <p>
              <strong>Fuel Consumption:</strong> {car.fuelConsumption} L/100km
            </p>
            <p>
              <strong>Engine Size:</strong> {car.engineSize}
            </p>

            <h3>Accessories:</h3>
            <ul>
              {car.accessories.map((accessory, index) => (
                <li key={index}>{accessory}</li>
              ))}
            </ul>

            <h3>Functionalities:</h3>
            <ul>
              {car.functionalities.map((functionality, index) => (
                <li key={index}>{functionality}</li>
              ))}
            </ul>

            <h3>Rental Conditions:</h3>
            <ul>
              {car.rentalConditions.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetailsPage;
