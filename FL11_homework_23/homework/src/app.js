class User {
  constructor(userName = 'user') {
    const name = userName;
    let orderTotalPrice = 0;
    let weekendDiscount = 0;
    let nightDiscount = 0;
    let bonus = 0;

    /* There might be the following error:
    Assignment to property of function parameter 'userObj'.eslint(no-param-reassign).
    Therefore, I use getters and setters. */

    this.getName = () => name;
    this.getOrderTotalPrice = () => orderTotalPrice;
    this.getWeekendDiscount = () => weekendDiscount;
    this.getNightDiscount = () => nightDiscount;
    this.getBonus = () => bonus;

    this.setOrderTotalPrice = (newOrderTotalPrice) => {
      orderTotalPrice = newOrderTotalPrice;
    };
    this.setWeekendDiscount = (newWeekendDiscount) => {
      weekendDiscount = newWeekendDiscount;
    };
    this.setNightDiscount = (newNightDiscount) => {
      nightDiscount = newNightDiscount;
    };
    this.setBonus = (newBonus) => {
      bonus = newBonus;
    };
  }

  makeOrder() {
    return `${this.getName()}, price after discount and including bonuses is ${
      this.getOrderTotalPrice() - this.getNightDiscount() - this.getWeekendDiscount() - this.getBonus()}`;
  }

  addItem(price) {
    const prevPrice = this.getOrderTotalPrice();
    const newPrice = prevPrice + price;
    this.setOrderTotalPrice(newPrice);
  }
}

const getDiscount = (userObj) => {
  const date = new Date();
  const hour = date.getHours();
  const day = date.getDay();
  const isNight = (hour >= 23 || hour < 6);
  const isWeekend = (day === 6 || day === 0);
  const nightDiscount = 0.05;
  const weekendDiscount = 0.1;

  const totalNightDiscount = (isNight) ? userObj.getOrderTotalPrice() * nightDiscount : 0;
  const totalWeekendDiscount = (isWeekend) ? userObj.getOrderTotalPrice() * weekendDiscount : 0;

  userObj.setNightDiscount(totalNightDiscount);
  userObj.setWeekendDiscount(totalWeekendDiscount);
};

const setBonus = (userObj) => {
  const orderSum = userObj.getOrderTotalPrice();
  let bonus = 0;

  function addBonus(sum) {
    if (sum < 100) {
      bonus += 0;
    } else {
      const newSum = sum - 100;
      bonus += 5;
      addBonus(newSum);
    }
  }

  addBonus(orderSum);

  userObj.setBonus(bonus);
};

/* When You envoke obj.makeOrder(), You will not see the message,
because console.log() triggers a warning.
So, You will have to use console.log(obj.makeOrder()) or browser console */
const vic = new User('Victoria');

vic.addItem(100);
vic.addItem(250);
// console.log(vic.makeOrder());

getDiscount(vic);
// console.log(vic.makeOrder());

setBonus(vic);
// console.log(vic.makeOrder());
