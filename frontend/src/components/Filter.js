import React from 'react';

const Filter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div>
      <select value={selectedCategory} onChange={onCategoryChange}>
        <option value="">Все категории</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
