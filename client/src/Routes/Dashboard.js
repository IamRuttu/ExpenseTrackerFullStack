import React, { useEffect,useState } from 'react'
import Header from '../Components/Header'
import { useNavigate } from "react-router-dom";
import Misc from '../Components/Misc';
import Analytics1 from '../Components/Analytics1';
import Analytics2 from '../Components/Analytics2';
import Transactions from '../Components/Transactions';
import axios from 'axios';
import config from '../config';

function Dashboard() {
  const navigate = useNavigate();
  const [user,setUser]=useState({});
  const [transactions, setTransactions] = useState([]);
  const getTransactions = () => {
    axios.get(config.backendUrl + `/expense/${user.email}`)
      .then(res => {
        if (res.data.status === "success") {
            let temp=res.data.data;
            temp.sort((a, b) => new Date(b.date) - new Date(a.date));
          setTransactions(temp);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(!user){
        return;
    }

    getTransactions();

  }, [user]);
  
  useEffect(()=>{
    if(!localStorage.getItem('expense-tracker-token')){
      navigate('/', { replace: true });

    }
    let token = localStorage.getItem('expense-tracker-token');
    //dwst verify token
    if(token){
      setUser(JSON.parse(token));

    }

  },[])

  useEffect(()=>{
    if(!user){
      return;
    }

  },[user])

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center",height:"100%",width:"95%"}}>
        <Header user={user}/>
        <div id='dashboard'>
          <div className='innerdiv row-20'>
            <Misc user={user} transactions={transactions}/>
          </div>
          <div className='innerdiv row-50'>
            <Analytics1 user={user} transactions={transactions}/>
          </div>
          <div className='innerdiv row-20'>
          <Transactions user={user} transactions={transactions}/>
          </div>
        </div>
    </div>
  )
}

export default Dashboard