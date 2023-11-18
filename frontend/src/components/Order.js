import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CartItem from './CartItemBuy';
import {API_URL_LIST} from '../config';

export default function Order() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    const [phone_number, setPNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [cart, setData] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    
    const cost = cartData.reduce((acc, item) => {return acc + item.price * item.quantity}, 0);
    

    useEffect (() => {
        const savedData = JSON.parse(localStorage.getItem('cart'));
        if (savedData) {
            setData(savedData);
        }
    }, []);

    const buyCart = (cartData) => {
        console.log(cartData);

        const data = {'phoneNumber': phone_number,
                'email': email,
                'address': address,
                'order_data': cartData};

        if (cart.length > 0) {
            fetch(API_URL_LIST + "cart/buy", {
                // Метод, если не указывать, будет использоваться GET
                method: 'POST',
            // Заголовок запроса
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            localStorage.setItem('cart', JSON.stringify([]));
        } else {
            alert("Корзина пуста");
            
        }
    };

    const removeFromCart = (index, item_size) => {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        const newCart = cartData.filter((item) => !(item.id === index && item.size === item_size));
        localStorage.setItem('cart', JSON.stringify(newCart));
        setData(newCart);
    };
    
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g,'');
        setPNumber(value);
    };
    
    const handleEmailChange = (e) => {
        // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const value = e.target.value;
        // Проверка на ввод только разрешенных символов
        const allowedCharacters = /^[A-Za-z0-9@._-]+$/;
        console.log(value)

        if (value.length > 0 && value.length <= 50){
            if (!allowedCharacters.test(value)) {
                return;
              }
            setEmail(value);
        }
        else if (value.length == 0) {
            setEmail(value);
        }
    };

    return (
        <div className="order">
            {cart ? (
                <div>
                    <h5>Введите данные для заказа</h5>
                    <label>Телефон:</label><input type="text" value={phone_number} name="phone_number" maxLength="11" onChange={handlePhoneNumberChange} required></input>
                    {/* {isPhoneNumberValid(phone_number) ? null : <p>Некорректный номер телефона</p>} */}
                    <label>Емайл:</label><input type="email" value={email} name="e-mail" onChange={handleEmailChange} required></input>
                    {/* {!isEmailValid(phone_number) && email.length > 0 && (<p>Некорректный адрес электронной почты</p>)} */}
                    <label>Адрес:</label><input type="text" value={address} name="address" onChange={(event) => setAddress(event.target.value)} required></input>
                    <h5 className="red-text text-lighten-1">Ваша корзина</h5>
                    <table className="striped">
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Размер</th>
                                <th>Количество</th>
                                <th>Цена</th>
                                <th>Сумма</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item =>
                                <CartItem key={item.id} {...item} removeFromCart={removeFromCart}/>
                            )}
                            <tr>
                                <th colSpan="4">Итого</th>
                                <th>{cost}</th>
                                <th>руб.</th>
                            </tr>
                            <tr></tr>
                            <tr>
                                <th colSpan="6">
                                    <center>
                                        <div><Link to={"/"} onClick={() => buyCart(cartData)} className='button1'>Купить</Link></div>
                                    </center>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </div>
    );
}