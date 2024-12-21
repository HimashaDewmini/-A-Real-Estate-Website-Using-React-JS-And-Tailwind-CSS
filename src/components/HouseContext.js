import React, { useState, useEffect, createContext } from 'react';
import { houseData } from '../data'; // Correct export name

// Create context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(houseData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);

  // Populate unique countries
  useEffect(() => {
    const allCountries = houseData.map((house) => house.country);
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);

  // Populate unique properties
  useEffect(() => {
    const allProperties = houseData.map((house) => house.type);
    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);

    const isDefault = (value) => value.includes('(any)');

    const minPrice = price.includes('(any)') ? 0 : parseInt(price.split(' ')[0]);
    const maxPrice = price.includes('(any)') ? Infinity : parseInt(price.split(' ')[2]);

    const filteredHouses = houseData.filter((house) => {
      const housePrice = parseInt(house.price);

      // Check if all filters are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return true;
      }

      // Check specific conditions
      const matchesCountry = isDefault(country) || house.country === country;
      const matchesProperty = isDefault(property) || house.type === property;
      const matchesPrice = housePrice >= minPrice && housePrice <= maxPrice;

      return matchesCountry && matchesProperty && matchesPrice;
    });

    setHouses(filteredHouses);
    setLoading(false);
    
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
