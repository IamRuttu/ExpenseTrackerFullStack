import React from 'react'

function Header({user}) {
  return (
    <div id='header'>
      <div className='maxWidth rowFlex'>
        <p>Expense Tracker</p>
        <p>Hi {user?user.firstName:null}</p>
      </div>
      
    </div>
  )
}

export default Header