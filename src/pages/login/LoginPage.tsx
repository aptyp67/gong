import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../features/auth/authSlice'
import { useAuth } from '../../features/auth/useAuth'
import { useAppDispatch } from '../../store/hooks'
import './LoginPage.css'

const DEMO_EMAIL = 'anthony.xiouping@xtreet.tvl'
const DEMO_PASSWORD = 'mllv9n0x'

export function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, status, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/hierarchy', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(login({ email, password }))
  }

  const isSubmitting = status === 'loading'

  return (
    <section className="login-page">
      <h1 className="login-title">Please login</h1>
      <button
        className="login-demo"
        type="button"
        onClick={() => {
          setEmail(DEMO_EMAIL)
          setPassword(DEMO_PASSWORD)
          if (error) {
            clearError()
          }
        }}
      >
        Use demo account
      </button>
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-field">
          <label htmlFor="login-email">email address:</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              if (error) {
                clearError()
              }
              setEmail(event.target.value)
            }}
            required
          />
        </div>

        <div className="login-field">
          <label htmlFor="login-password">password:</label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => {
              if (error) {
                clearError()
              }
              setPassword(event.target.value)
            }}
            required
          />
        </div>

        {error ? <p className="login-error">{error}</p> : null}

        <div className="login-actions">
          <button
            className="login-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging...' : 'Login'}
          </button>
        </div>
      </form>
    </section>
  )
}
