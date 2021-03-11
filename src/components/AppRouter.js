import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import FirstStep from '../components/FirstStep'
import SecondStep from './SecondStep'

const AppRouter = () => (
    <BrowserRouter>
        <div className="container">
            <Header />
            <Switch>
                <Route component={FirstStep} path="/" exact={true} />
                <Route component={SecondStep} path="/email" />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter