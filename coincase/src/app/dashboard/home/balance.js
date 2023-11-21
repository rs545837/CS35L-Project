import { useAuth } from "@/app/Auth/AuthContext";
import { CoinPrice } from "@/app/coins/[coinId]/page";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Balance({ user, data }) {
  const {authUser} = useAuth()

  const [pageState, setPageState] = useState({
    isLoading: false,
    firstName: "",
    lastName: "",
    balance: 0,
  })

  const fetchFromDB = async () => {
    const docRef = doc(db, "users", authUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setPageState(prevState => ({ ...prevState, firstName: data.first_name, lastName: data.last_name, balance: data.balance }))
    } else {
      //console.log("No such document!");
    }
  }

  useEffect(() => {
    // need scan name and last updated for now...
    fetchFromDB()
  }, [])

  /*   data?.slice(0, 10).forEach((item) => {
    const price = CoinPrice({ params: item.id, type: 'only' });
    balance += user[item.id]?.count * price;
  }); 
  balance += user[cash];
  */

  //const gain = (balance - user.balance) / user.balance;

  //const updatedUser = { ...user, balance: gain };
  return (
    <div>
      Hi {pageState.firstName}! your current balance is ${pageState.balance}, having __gain__
      percentages
    </div>
  );
}
