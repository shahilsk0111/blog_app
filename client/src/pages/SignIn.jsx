import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { signInStart , signInFailure , signInSuccess } from '../redux/user/userSlice'

export default function SignIn() {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.value]: e.target.value.trim() })
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if ( !formData.password || !formData.email) {
      return setErrorMessage('All fields are required')

    }
    try {
     dispatch(signInStart())

      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      
      }
      setLoading(false)

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }

    } catch (error) {
       dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className='text-4xl font-bold dark:text-white'>
            <div className='px-2 py-1 bg-blue-800 rounded-lg text-white'>BlogMania</div>
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email and password or with google
          </p>
        </div>
        <div className="flex-1">
          <form className='flex-col gap-4' onSubmit={handleSubmit}>
           
            <div >
              <Label value='your email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} className='mt-4' />
            </div>
            <div >
              <Label value='your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} className='mt-4' />
            </div>
            <Button className='bg-blue-800 text-white px-40  mt-5 ' type='submit' disabled={loading} >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span>Loading... </span>
                </>
              ) : "SignIn"}
            </Button>
          </form >
          <div className='text-sm mt-5 flex gap-2'>
            <span>Don't have an account?</span>
            <Link to="/sign-up" className='text-blue-600'>sign up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5 ' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
