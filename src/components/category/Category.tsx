import React from 'react';
import style from 'src/components/category/Category.module.scss';

interface CategoryComponentProps {
  onCategoryClick: (category: string) => void;
  selectedCategory: string;
}

const categories = [
  { name: 'Decor', isSubcategory: false },
  { name: 'Wall Decor', isSubcategory: true },
  { name: 'X-mas', isSubcategory: true },
  { name: 'Toys', isSubcategory: false },
  { name: 'Food', isSubcategory: false },
  { name: 'Jar', isSubcategory: true },
  { name: 'All category', isSubcategory: false },
];

export const CategoryComponent: React.FC<CategoryComponentProps> = ({
  onCategoryClick,
  selectedCategory,
}) => (
  <div className={style.category_container}>
    <h3>Category:</h3>
    <div className={style.category_parent}>
      {categories.map((category) => (
        <div
          key={category.name}
          className={category.isSubcategory ? style.subcategory : style.category}
          onClick={() => {
            onCategoryClick(category.name);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onCategoryClick(category.name);
          }}
        >
          {selectedCategory === category.name && '● '}
          {category.name}
        </div>
      ))}
    </div>
  </div>
);
