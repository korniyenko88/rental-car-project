import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import styles from './CatalogPage.module.css';
import { useNavigate } from 'react-router-dom';
import CarFilterForm from '../../components/CarFilterForm/CarFilterForm';
import sprite from '../../image/sprite.svg';

const CatalogPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [favoriteCar, setFavoriteCar] = useState([]);

  const navigate = useNavigate();

  const handleFilter = newFilter => {
    setCars(newFilter.cars);
    setTotalPages(newFilter.totalPages);
    setPage(newFilter.page);
  };

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = {
          page,
          limit,
        };
        const response = await axios.get(
          `https://car-rental-api.goit.global/cars`,
          { params }
        );
        const newCars = response.data.cars;

        if (page === 1) {
          setCars(newCars);
        } else {
          const uniqueCars = [
            ...new Map(
              [...cars, ...newCars].map(car => [car.id, car])
            ).values(),
          ];

          setCars(uniqueCars);
        }

        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : 'Error fetching cars'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page, limit]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCars')) || [];
    setFavoriteCar(storedFavorites);
  }, []);

  const loadMoreCars = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

    const toggleFavorite = cardId => {
      setFavoriteCar(prevState => {
        const newFavorites = prevState.includes(cardId)
          ? prevState.filter(id => id !== cardId)
          : [...prevState, cardId];

        localStorage.setItem('favoriteCars', JSON.stringify(newFavorites));
        return newFavorites;
      });
    };

  if (loading) {
    return (
      <div className={styles.loaderPosition}>
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
      <div>
        <CarFilterForm onFilter={handleFilter} />
      </div>
      <ul className={styles.carList}>
        {cars.map(car => (
          <li key={car.id} className={styles.carItem}>
            <div className={styles.position}>
              <img
                className={styles.carItemImg}
                src={car.img}
                alt={`${car.brand} ${car.model}`}
              />

              <svg
                className={styles.iconSvg}
                onClick={() => toggleFavorite(car.id)}
                aria-hidden="true"
              >
                <use
                  href={`${
                    favoriteCar.includes(car.id)
                      ? `${sprite}#icon-hart-active`
                      : `${sprite}#icon-hart`
                  }`}
                />
              </svg>
            </div>

            <h2 className={styles.cartTitle}>
              <div>
                {car.brand}{' '}
                <span className={styles.modelName}>{car.model}</span>,{' '}
                {car.year}
              </div>
              <span className={styles.carPrice}>${car.rentalPrice}</span>
            </h2>
            <div className={styles.cartDescription}>
              <p className={styles.cardText}>
                {car.address
                  .split(',')
                  .slice(1)
                  .map(part => part.trim())
                  .join(' ')
                  .trim()}
              </p>
              <svg
                width="2"
                height="16"
                viewBox="0 0 2 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 0V16" stroke="#DADDE1" strokeWidth="1" />
              </svg>
              <p className={styles.cardText}>{car.rentalCompany}</p>
              <svg
                width="2"
                height="16"
                viewBox="0 0 2 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 0V16" stroke="#DADDE1" strokeWidth="1" />
              </svg>
              <span className={styles.infoPosition}>
                <p className={styles.cardText}>{car.type}</p>
                <svg
                  width="2"
                  height="16"
                  viewBox="0 0 2 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 0V16" stroke="#DADDE1" strokeWidth="1" />
                </svg>
                <p className={styles.cardText}>
                  {car.mileage.toLocaleString('ru-RU')} km
                </p>
              </span>
            </div>
            <button
              onClick={() => handleNavigate(car.id)}
              className={styles.btn}
            >
              Read more
            </button>
          </li>
        ))}
      </ul>
      {page < totalPages && (
        <button className={styles.loadMoreBtn} onClick={loadMoreCars}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
