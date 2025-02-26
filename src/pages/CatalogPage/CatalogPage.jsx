import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import styles from './CatalogPage.module.css';
import { useNavigate } from 'react-router-dom';

const CatalogPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          'https://car-rental-api.goit.global/cars'
        );
        setCars(response.data.cars);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : 'Error fetching cars'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const loadMoreCars = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <h2>Error fetching cars: {error}</h2>;
  }

  
 const handleNavigate = id => {
   navigate(`/catalog/${id}`);
 };

  return (
    <div className={styles.catalogContainer}>
      <h1>Car Catalog</h1>
      <div className={styles.carList}>
        {cars.slice(0, visibleCount).map(car => (
          <div key={car.id} className={styles.carItem}>
            <img
              className={styles.carItemImg}
              src={car.img}
              alt={`${car.brand} ${car.model}`}
            />
            <h2>
              {car.brand} {car.model}, {car.year} {car.rentalPrice}$
            </h2>
            <p>{car.address}</p>
            <p>{car.type}</p>
            <p>{car.mileage} km</p>
            <button
              onClick={() => handleNavigate(car.id)}
              className={styles.btn}
            >
              Read more
            </button>
          </div>
        ))}
      </div>
      {visibleCount < cars.length && (
        <button className={styles.loadMoreBtn} onClick={loadMoreCars}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
