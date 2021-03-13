import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import FirstStep from '../components/FirstStep'
import SecondStep from '../components/SecondStep'
import ThirdStep from '../components/ThirdStep'
import Login from '../components/Login'

const AppRouter = () => {
  const [user, setUser] = useState({})

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }))
  }

  const resetUser = () => {
    setUser({})
  }
  return (
    <BrowserRouter>
      <div className='container'>
        <Header />
        <Switch>
          <Route
            render={(props) => (
              <FirstStep {...props} user={user} updateUser={updateUser} />
            )}
            path='/'
            exact={true}
          />
          <Route
            render={(props) => (
              <SecondStep {...props} user={user} updateUser={updateUser} />
            )}
            path='/email'
          />
          <Route
            render={(props) => (
              <ThirdStep
                {...props}
                user={user}
                updateUser={updateUser}
                resetUser={resetUser}
              />
            )}
            path='/location'
          />
          <Route component={Login} path="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
export default AppRouter
