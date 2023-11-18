import {Link} from 'react-router-dom';

export default function Header(props) {
    return (
        <header>
            <nav>
                <div className="header">
                <Link className="LinkR" to="/">Магазин одежды</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">

                        <li><Link className="LinkR" to="/buy">Корзина</Link></li>
                        
                    </ul>
                </div>
            </nav>
        </header>
    );
}