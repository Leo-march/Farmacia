'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export function RaiaLogo({ size = 60 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="raia-logo fade-in" src="/logo-raia.png" alt="Droga Raia" style={{ height: size, width: 'auto', objectFit: 'contain' }} />
  )
}

export function UserIcon() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      border: '2px solid #333',
      background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    </div>
  )
}

export function ClockBar() {
  const { useState, useEffect } = require('react')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(id)
  }, [])

  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')

  return (
    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', fontVariantNumeric: 'tabular-nums' }}>
      {dd}/{mm} &nbsp; {hh}:{min}
    </div>
  )
}

interface TopBarProps {
  showLogo?: boolean
}

export default function TopBar({ showLogo = true }: TopBarProps) {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/auth')
  }

  return (
    <div style={{
      height: 72,
      background: '#e8e8e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      borderBottom: '1px solid #ccc',
      flexShrink: 0,
    }}>
      <ClockBar />

      {showLogo ? (
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <RaiaLogo size={54} />
        </div>
      ) : <div />}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {user && (
          <span style={{ fontWeight: 600, fontSize: '1rem', color: '#333' }}>
            {user.name}
          </span>
        )}
        <UserIcon />
        {user && (
          <button
            onClick={handleLogout}
            title="Sair"
            style={{
              background: 'none', border: '1.5px solid #ccc',
              borderRadius: 8, padding: '5px 10px',
              cursor: 'pointer', color: '#666', fontSize: '0.8rem',
              fontWeight: 600, transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#C8102E'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.borderColor = '#C8102E'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.color = '#666'
              e.currentTarget.style.borderColor = '#ccc'
            }}
          >
            Sair
          </button>
        )}
      </div>
    </div>
  )
}