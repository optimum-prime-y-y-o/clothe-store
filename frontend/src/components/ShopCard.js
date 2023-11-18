import {Link} from 'react-router-dom';

export default function ShopCard(props) {
    const {
        id,
        name,
        price,
        image,
        // appendToCart,
    } = props;
    
    return (
        <div id={"product-" + id} className="card">
            <div className="card-image waves-effect waves-block waves-light">
                <img width="400" height="300" className="activator" src={image} alt="" />
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                    {name}
                </span>
                <p>Цена: {price} руб.</p>
            </div>
            <div className="card-action">
                <Link to={"/item/" + id} className='moreButton'>Подробнее</Link>
            </div>
        </div>
    );
}

