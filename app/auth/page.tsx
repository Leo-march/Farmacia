'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

type Mode = 'login' | 'register'

// Simple in-memory user store (replace with real DB/API)
const userStore: { name: string; email: string; password: string }[] = []

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [animating, setAnimating] = useState(false)

  const switchMode = (m: Mode) => {
    setAnimating(true)
    setTimeout(() => {
      setMode(m)
      setError('')
      setName('')
      setEmail('')
      setPassword('')
      setAnimating(false)
    }, 250)
  }

  const handleSubmit = () => {
    setError('')
    if (!email || !password) { setError('Preencha todos os campos.'); return }

    if (mode === 'register') {
      if (!name.trim()) { setError('Informe seu nome.'); return }
      if (userStore.find(u => u.email === email)) { setError('E-mail já cadastrado.'); return }
      userStore.push({ name: name.trim(), email, password })
      login({ name: name.trim(), email })
      router.push('/')
    } else {
      const found = userStore.find(u => u.email === email && u.password === password)
      if (!found) { setError('E-mail ou senha incorretos.'); return }
      login({ name: found.name, email: found.email })
      router.push('/')
    }
  }

  const inp: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    border: '1.5px solid #ddd',
    borderRadius: 12,
    fontSize: '0.95rem',
    outline: 'none',
    background: '#fafafa',
    color: '#222',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(to bottom, white 45%, #C8102E 100%)',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 32, animation: 'fadeDown 0.5s ease both' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-raia.png" alt="Droga Raia" style={{ height: 80, objectFit: 'contain' }} />
      </div>

      {/* Card */}
      <div style={{
        background: 'white',
        borderRadius: 24,
        padding: '36px 40px',
        width: 420,
        boxShadow: '0 24px 70px rgba(0,0,0,0.14)',
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(8px)' : 'translateY(0)',
        transition: 'opacity 0.25s, transform 0.25s',
        animation: 'popIn 0.4s cubic-bezier(0.2,0.9,0.2,1) both',
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 28, background: '#f0f0f0', borderRadius: 12, padding: 4 }}>
          {(['login', 'register'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1, padding: '10px 0',
                borderRadius: 10, border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: '0.95rem',
                background: mode === m ? 'white' : 'transparent',
                color: mode === m ? '#C8102E' : '#888',
                boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {m === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          ))}
        </div>

        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', color: '#111', marginBottom: 22 }}>
          {mode === 'login' ? 'Bem-vindo de volta 👋' : 'Criar conta'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#555', marginBottom: 5 }}>Nome</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Seu nome completo"
                style={inp}
                onFocus={e => (e.currentTarget.style.borderColor = '#C8102E')}
                onBlur={e => (e.currentTarget.style.borderColor = '#ddd')}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#555', marginBottom: 5 }}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={inp}
              onFocus={e => (e.currentTarget.style.borderColor = '#C8102E')}
              onBlur={e => (e.currentTarget.style.borderColor = '#ddd')}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#555', marginBottom: 5 }}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inp}
              onFocus={e => (e.currentTarget.style.borderColor = '#C8102E')}
              onBlur={e => (e.currentTarget.style.borderColor = '#ddd')}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>

        {error && (
          <div style={{
            marginTop: 12, padding: '10px 14px',
            background: '#fff0f0', border: '1.5px solid #fca5a5',
            borderRadius: 10, color: '#dc2626', fontSize: '0.85rem', fontWeight: 500
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: 22, width: '100%',
            background: '#C8102E', color: 'white',
            border: 'none', borderRadius: 12,
            padding: '14px', fontWeight: 700,
            fontSize: '1rem', cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#9B0B22')}
          onMouseLeave={e => (e.currentTarget.style.background = '#C8102E')}
        >
          {mode === 'login' ? 'Entrar' : 'Criar conta'}
        </button>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}