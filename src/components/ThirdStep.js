import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import csc from 'country-state-city'

const ThirdStep = (props) => {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await csc.getAllCountries()
        console.log(result)
      } catch (error) {}
    }

    getCountries()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  return (
    <Form className='input-form' onSubmit={handleSubmit}>
      <div className='col-md-6 offset-md-3'></div>
    </Form>
  )
}

export default ThirdStep
