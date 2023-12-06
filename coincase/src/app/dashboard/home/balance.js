import { useAuth } from "@/app/Auth/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import Wallet from "../wallet/page";

export default function Balance({ user, data }) {
  const { authUser } = useAuth();

  const [pageState, setPageState] = useState({
    isLoading: false,
    firstName: "",
    lastName: "",
    balance: 0,
  });

  useEffect(() => {
    // need scan name and last updated for now...
    fetchFromDB();
  }, []);

  const fetchFromDB = async () => {
    const docRef = doc(db, "users", authUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setPageState((prevState) => ({
        ...prevState,
        firstName: data.first_name,
        lastName: data.last_name,
        balance: data.balance,
      }));
    } else {
      //console.log("No such document!");
    }
  };

  /*   data?.slice(0, 10).forEach((item) => {
    const price = CoinPrice({ params: item.id, type: 'only' });
    balance += user[item.id]?.count * price;
  }); 
  balance += user[cash];
  */

  //const gain = (balance - user.balance) / user.balance;

  //const updatedUser = { ...user, balance: gain };

  let balance = pageState.balance;
  console.log(balance, 1);
  let coinBalance = Wallet({ type: "price" });
  console.log(coinBalance, 2);
  let totalBalance = parseInt(balance, 10) + parseInt(coinBalance, 10);
  console.log(totalBalance, 3);
  let gain = (((totalBalance - 1000) / 1000) * 100).toFixed(2); // compare to the money that the user initially had

  return (
    <div style={{ fontSize: "20px" }}>
      Hi {pageState.firstName}! Your total balance is ${totalBalance.toFixed(2)}
      , having total gain of {gain}% {gain >= 0 ? "increase" : "decrease"}.
      Also, you have ${balance.toFixed(2)} in your wallet. Spend wisely!
    </div>
  );
}
