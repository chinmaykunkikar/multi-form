import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'

const FirstStep = (props) => {
  const { user } = props
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    props.updateUser(data)
    props.history.push('/email')
  }

  return (
    <Form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='col-md-6 offset-md-3'>
        <Form.Group controlId='first_name'>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type='text'
            name='first_name'
            placeholder='Enter your name'
            autoComplete='off'
            ref={register({
              required: 'First name is required.',
            })}
            className={`${errors.first_name ? 'input-error' : ''}`}
          />
        </Form.Group>
        <Form.Group controlId='last_name'>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='text'
            name='last_name'
            placeholder='Enter your last name'
            autoComplete='off'
            ref={register({
              required: 'Last name is required.',
            })}
            className={`${errors.last_name ? 'input-error' : ''}`}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Next
        </Button>
      </div>
    </Form>
  )
}

export default FirstStep
