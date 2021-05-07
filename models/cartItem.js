class CartItem {

    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.sum = this.price * this.quantity
    }
}


export default CartItem