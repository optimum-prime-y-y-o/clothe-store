import {useState, useEffect} from 'react';
import ShopList from './ShopList';

export default function Content() {
    const [cart, setCart] = useState([])
        
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartData);
        // console.log(cartData)
      }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // добавление в корзину
    const appendToCart = (product) => {
        const existingItemIndex = cart.findIndex((item) => item.id === product.id);

        if (existingItemIndex !== -1) {
          const newCart = [...cart];
          newCart[existingItemIndex].quantity += 1;
          setCart(newCart);
        } else {
          setCart([...cart, { ...product, quantity: 1 }]);
        }
        
      };
    
    return (
        <main className="container">
            <ShopList appendToCart={appendToCart}/>
        </main>
    );
}