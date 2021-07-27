import React, { useState, useEffect } from 'react';

export const Home = () => {
  const [search, setSearch] = useState(null);

  useEffect(() => {
    setSearch('yoss');
  }, []);

  return (
    <>
      {search}
      <form>
        <label>
          Book:
          <input type='text' name='bookName' />
        </label>
        <input type='submit' value='Search' />
      </form>
      {search}
    </>
  );
};
