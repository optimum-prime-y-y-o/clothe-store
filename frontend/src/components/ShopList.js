import {useState, useEffect} from 'react';
import {API_URL_LIST} from '../config';
import Preloader from './Preloader';
import ShopCard from './ShopCard';
import Filter from './Filter';

export default function ShopList(props) {
    const [items, setItems] = useState([]); // товары магазина
    const [loading, setLoading] = useState(true); // идет загрузка? для товаров
    const [loading2, setLoading2] = useState(true); // идет загрузка? для категорий
    const [categories, setCats] = useState();

    useEffect(() => {
        fetch(API_URL_LIST + "catalog/get_categories/")
            .then(response => response.json())
            .then(data => {
                data && setCats(data.slice(0, 24));
                setLoading2(false);
            });
    }, []);

    const [selectedCategory, setSelectedCategory] = useState('');
    const filteredItems = selectedCategory
      ? items.filter((item) => item.category_id == selectedCategory)
      : items;

    useEffect(() => {
        fetch(API_URL_LIST + "catalog")
            .then(response => response.json())
            .then(data => {
                data && setItems(data.slice(0, 24));
                setLoading(false);
            });
    }, []);

    return (
        <div className="mainWindows">
            <div className='category'>
                {loading2 ? (<Preloader />) 
                : categories.length ? (<Filter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(e) => setSelectedCategory(e.target.value)}
                />
                ) : (<p>Не удалось загрузить список категорий</p>)}
            </div>
            <div className="items">
                {loading ? (
                    <Preloader />
                ) : filteredItems.length ? (
                    filteredItems.map(item => (
                        <ShopCard key={item.id} {...item} appendToCart={props.appendToCart} />
                    ))
                ) : (
                    <p>Не удалось загрузить список товаров</p>
                )}
            </div>
        </div>
    )
}