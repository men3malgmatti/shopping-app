import moment from 'moment';


class Order {
    constructor(id, items, amount, time) {
        this.id = id;
        this.items = items;
        this.amount = amount;
        this.time = time;
    }
 
  get orderTime(){
      return moment(this.time).format(" MMMM Do YYYY, h:mm");
  } 
    
}



export default Order;