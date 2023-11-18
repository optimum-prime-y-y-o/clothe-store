
export default function CartItem(props) {
    const {
        removeFromCart,
    } = props;

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.size}</td>
            <td>{props.quantity}</td>
            <td>{props.price}</td>
            <td>{props.price * props.quantity}</td>
            <td>
                <i
                    className="material-icons cart-item-delete"
                    onClick={() => removeFromCart(props.id, props.size)}
                >
                    close
                </i>
            </td>
        </tr>
    );
}