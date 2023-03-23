import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import EmailField from '../components/form/emailField'
import PasswordField from '../components/form/passwordField'
import {useDispatch, useSelector} from 'react-redux'
import {errorNull, getAuthErrors, getError, login} from '../Store/auth'
import authService from '../services/auth.service'

const Login = () => {
  const loginError = useSelector(getAuthErrors())
  const history = useHistory()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleChange = ({target}) => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
    dispatch(errorNull())
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const payload = await authService.login(data)
      dispatch(login(payload))
      history.push('/notes')

    } catch (error) {
      dispatch(getError(error))
    }
  }

  return (
    <div>
      <div className="login">
        <i className="login__back-arrow" onClick={() => history.push('/')}/>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1 className="login-form__header">Login</h1>
            {loginError && <p className="errors errors-login">{loginError}</p>}
            <EmailField data={data} handleChange={handleChange}/>
            <PasswordField data={data} handleChange={handleChange}/>
            <div className="login-form__block">
              <p className="login-form__block_account">
                Don't have account?
              </p>
              <p
                className="login-form__block_account signup"
                onClick={() => history.push('/signUp')}
              >
                Sign up
              </p>
            </div>
            <button
              className={loginError ? 'login-form__button-disabled' : 'login-form__button'}
              type="submit"
              disabled={!!loginError}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login