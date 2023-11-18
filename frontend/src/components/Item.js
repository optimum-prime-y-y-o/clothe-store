import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react';
import {API_URL_LIST} from '../config';

export default function Items(props) {
    const {id} = useParams();

    const [item_data, setItems] = useState([]); // товары магазина
    const [value, setValue] = useState('');
    const [itemSize, setSize] = useState('');
    const [item_buy, setCartItem] = useState([]);

    useEffect(() => {
        fetch(API_URL_LIST + 'catalog/' + id)
            .then(response => response.json())
            .then(data => {
                var keys = ['id', 'name', 'price', 'quantity'];
                var item_to_cart = {}
                for (var i = 0; i < keys.length; i++) {
                    var текущийКлюч = keys[i];
                    if (data.hasOwnProperty(текущийКлюч)) {
                        item_to_cart[текущийКлюч] = data[текущийКлюч];
                    }
                }
                data && setItems(data);
                setCartItem(item_to_cart);
                setValue(1);
                setSize('M');
            });
    }, []);

    const [cart, setCart] = useState([]);
        
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartData);
      }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const appendToCart = (product) => {
        const existingItemIndex = cart.findIndex((item) => (item.id === product.id) && (item.size === itemSize));
    
        if (existingItemIndex !== -1) {
          const newCart = [...cart];
          newCart[existingItemIndex].quantity += Number(value);
          newCart[existingItemIndex].size = String(itemSize);

          setCart(newCart);
        } else {
          setCart([...cart, { ...product, quantity: Number(value), size: String(itemSize)}]);
        }
        
      };

    return (
        <div className="SingleItem">
            <div className="leftSide">            
                <div className="img-good">
                    <center>
                    <img width="400" height="400" src={item_data.image} alt="" />
                    </center>
                </div>
            </div>
            <div className="rightSide">
            <center>
            <div>
                <h2>{item_data.name}</h2>
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                    <p className="descript">{item_data.description}</p>
                </span>
                <p>Цена: {item_data.price} руб.</p>
            </div>
            <div className='sizeAndCount'>
                <label>Размер: </label>
                {/* <select className="lok" value={value} onChange={chengeSelect(e)}> */}
                <select className="lok" value={itemSize} onChange={(s) => setSize(s.target.value)}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
                <label>Количество: </label>
                <select className="lok" value={value} onChange={(e) => setValue(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <br></br>
            <div className="card-action">
                <button className="btn-small" onClick={() => appendToCart(item_buy, 1)}>
                    Купить
                </button>
            </div>
            <br></br>
            </center>
            </div>
        </div>
    );
}