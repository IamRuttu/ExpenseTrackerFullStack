import React, { useState, useEffect } from "react";
import { Button } from 'antd';
import axios from "axios";
import config from "../config";

function Transactions({ user,transactions }) {

  return (
    <div id="transactions">
      <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center"}}>
        <h2>Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{new Date(transaction.date).toDateString()}</td>
                <td>{transaction.category}</td>
                <td>{transaction.price}</td>
              </tr>
            )) : <tr>
                  <td colSpan="3">No Transactions</td>
                </tr>}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">
                <Button type="primary">Add Transaction</Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
