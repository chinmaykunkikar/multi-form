import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import csc from 'country-state-city'
import { motion } from 'framer-motion'
import axios from 'axios'
import Swal from 'sweetalert2'

import { BASE_API_URL } from '../utils/constants'

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
        setIsLoading(true)
        const result = await csc.getAllCountries()
        let allCountries = []

        // we're using the array map method to filter out unnecessary properties
        // and keeping only isoCode and name
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }))

        // We're destructuring the isoCode property from the first object of the
        // allCountries array of objects and renaming the isoCode property to firstCountry
        // just to identify that it's the first country from the list.
        // Then we're updating the selectedCountry state value to the firstCountry value
        const [{ isoCode: firstCountry } = {}] = allCountries
        setCountries(allCountries)
        setSelectedCountry(firstCountry)
        setIsLoading(false)
      } catch (error) {
        setCountries([])
        setIsLoading(false)
      }
    }

    getCountries()
  }, [])

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await csc.getStatesOfCountry(selectedCountry)
        let allStates = []
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }))
        const [{ isoCode: firstState = '' } = {}] = allStates

        //All the country, state and city dropdowns are inter-related.
        // If we're changing the country, we should update the state also.
        setCities([])
        setSelectedCity('')
        setStates(allStates)
        setSelectedState(firstState)
      } catch (error) {
        setStates([])
        setCities([])
        setSelectedCity('')
      }
    }
    getStates()
  }, [selectedCountry]) // this effect will only run when the selectedCountry state changes

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await csc.getCitiesOfState(
          selectedCountry,
          selectedState
        )
        let allCities = []
        allCities = result?.map(({ name }) => ({
          name,
        }))
        const [{ name: firstCity = '' } = {}] = allCities
        setCities(allCities)
        setSelectedCity(firstCity)
      } catch (error) {
        setCities([])
      }
    }

    getCities()
  }, [selectedCountry, selectedState])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = props
      const updatedData = {
        country: countries.find(
          (country) => country.isoCode === selectedCountry
        )?.name,
        state:
          states.find((state) => state.isoCode === selectedState)?.name || '',
        city: selectedCity,
      }

      await axios.post(`${BASE_API_URL}/register`, {
        ...user,
        ...updatedData,
      })
      Swal.fire('Awesome!', 'Successfully registered', 'success').then(
        (result) => {
          if (result.isConfirmed || result.isDismissed) {
            props.resetUser()
            props.history.push('/')
          }
        }
      )
    } catch (error) {
      console.log(`Error: ${error.response.data}`)
      Swal.fire({
        icon: 'error',
        title: 'Oops.',
        text: error.response.data,
      })
    }
  }

  return (
    <Form className='input-form' onSubmit={handleSubmit}>
      <motion.div
        className='col-md-6 offset-md-3'
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}>
        <Form.Group controlId='country'>
          {isLoading && <p className='loading'>Loading counties...</p>}
          <Form.Label>Country</Form.Label>
          <Form.Control
            as='select'
            name='country'
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}>
            {countries.map(({ isoCode, name }) => (
              <option key={isoCode} value={isoCode}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='state'>
          <Form.Label>State</Form.Label>
          <Form.Control
            as='select'
            name='state'
            value={selectedState}
            onChange={(event) => setSelectedState(event.target.value)}>
            {states.length > 0 ? (
              states.map(({ isoCode, name }) => (
                <option key={isoCode} value={isoCode}>
                  {name}
                </option>
              ))
            ) : (
              <option value='' key=''>
                No state found
              </option>
            )}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            as='select'
            name='city'
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}>
            {cities.length > 0 ? (
              cities.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))
            ) : (
              <option value=''>No city found</option>
            )}
          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Register
        </Button>
      </motion.div>
    </Form>
  )
}

export default ThirdStep
