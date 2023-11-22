import { CoinPrice } from "@/app/dashboard/coins/[coinId]/page";

export default function Balance({ user, data }) {
  let balance = 0;

  /*   data?.slice(0, 10).forEach((item) => {
    const price = CoinPrice({ params: item.id, type: 'only' });
    balance += user[item.id]?.count * price;
  }); 
  balance += user[cash];
  */

  const gain = (balance - user.balance) / user.balance;

  const updatedUser = { ...user, balance: gain };
  return (
    <div>
      hi {user}! your current balance is __{balance}__, having __gain__
      percentages
    </div>
  );
}
