import React from 'react'
import Spends from './Spends'

function Analytics1({user,transactions}) {
  return (
    <div id='analytics1'>
        <Spends user={user} transactions={transactions} />
    </div>
  )
}

export default Analytics1