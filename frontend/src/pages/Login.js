import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation} from '@apollo/client'
import { Form, Button } from 'semantic-ui-react'

const Register = (props) => {

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})
    const [loginError, setLoginError] = useState({})


    const [values, setValues] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
      update(_, result) {
        console.log(result)
        navigate("/")
      }, 
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions)
        setLoginError(err.graphQLErrors[0])
        console.log("graphql error", err.graphQLErrors[0])
      },
      variables : values
    });

    const handleSubmit = (e) => {
      e.preventDefault()
      registerUser()
        
    }

  return (
    <div className='form-container' >
    <Form className={ loading ? 'loading' : ' '} onSubmit={handleSubmit} noValidate>
      
        <Form.Input
          label='Username'
          placeholder='username'
          name='username'
          value={values.username}
          error={errors.username}
          onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          value={values.email}
          error={errors.email}
          onChange={onChange}
        />
        <Form.Input
          label='password'
          placeholder='password'
          name='password'
          type='password'
          value={values.password}
          error={errors.password}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='confirm password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      
    </Form>
      {console.log("all  x errors", errors)}

      {/* {Object.entries(errors).length > 0 && <div className="ui error message">
        <ul className="list">
          {Object.entries(errors).map(([key, value]) => (
            <li key={key}>{value.toString()}</li>
          ))}
        </ul>
      </div>} */}

    </div>

  )
}

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: {
        username: $username,
        email: $email,
        password: $password,
        confirmPassword: $confirmPassword,
      }
    ) {
      id username email token
    }
  }
`

export default Register;