import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import FirstStep from '../components/FirstStep'
import SecondStep from '../components/SecondStep'
import ThirdStep from '../components/ThirdStep'

const AppRouter = () => (
    <BrowserRouter>
        <div className="container">
            <Header />
            <Switch>
                <Route component={FirstStep} path="/" exact={true} />
                <Route component={SecondStep} path="/email" />
                <Route component={ThirdStep} path="/location" />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter