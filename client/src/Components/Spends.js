import React, { useEffect, useState } from "react";
import { Statistic } from "antd";
import CountUp from "react-countup";
import { PieChart } from '@mui/x-charts';

const formatter = (value) => <CountUp end={value} separator="," />;
const Spends = ({ user, transactions }) => {
    const colors = [
        "#FF5733", // Red
        "#33FF57", // Green
        "#3357FF", // Blue
        "#FF33A1", // Pink
        "#FFB533", // Orange
        "#33FFF0", // Cyan
        "#D433FF", // Purple
        "#A1FF33", // Lime
        "#FF5733", // Red-Orange
        "#5733FF", // Indigo
        "#33FFBD", // Mint
        "#FFD133", // Yellow
        "#33A1FF", // Sky Blue
        "#FF3380", // Magenta
        "#33FF99"  // Light Green
      ];
  const [dailySpend, setDailySpend] = useState(0);
  const [weeklySpend, setWeeklySpend] = useState(0);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [catInfo,setCatInfo]=useState([]);
  useEffect(() => {
    //daily spends
    let dailySpends = 0;
    transactions.forEach((transaction) => {
      if (
        new Date(transaction.date).toDateString() === new Date().toDateString()
      ) {
        dailySpends += transaction.price;
      }
    });
    setDailySpend(dailySpends);

    //weekly spends
    let weeklySpends = 0;
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      const transactionWeek = new Date(
        transactionDate.getFullYear(),
        transactionDate.getMonth(),
        transactionDate.getDate() - transactionDate.getDay()
      );
      const todayWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
      );
      if (transactionWeek.getTime() === todayWeek.getTime()) {
        weeklySpends += transaction.price;
      }
    });
    setWeeklySpend(weeklySpends);

    //monthly spends
    let monthlySpends = 0;
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getFullYear() === new Date().getFullYear() &&
        transactionDate.getMonth() === new Date().getMonth()
      ) {
        monthlySpends += transaction.price;
      }
    });
    setMonthlySpend(monthlySpends);
    
    let catergories={

    }
    transactions.forEach((transaction) => {
        catergories[transaction.category]=(catergories[transaction.category]||0)+transaction.price
    });
    //set categories objs format [{id,value:categories obj val,label:category obj key}]
    setCatInfo(Object.entries(catergories).map(([id,value],index) => ({id:index, value, label:id})))


  }, [transactions]);

  useEffect(() => {
    console.log(catInfo)

  },[catInfo])
  return (
    <div id="spends">
    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"95%"}}>
      <div span={7}>
        <Statistic
          title="Today"
          value={dailySpend}
          formatter={formatter}
        />
      </div>
      <div>
        <Statistic
          title="This Week"
          value={weeklySpend}
          formatter={formatter}
        />
      </div>
      <div span={9}>
        <Statistic
          title="This Month"
          value={monthlySpend}
          formatter={formatter}
        />
      </div>
    </div>
    <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <PieChart
    colors={colors}
    series={[
        {
        data: catInfo,
        highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
    ]}
    width={800}
    height={250}
    
    />
    </div>
    </div>
  );
};
export default Spends;
