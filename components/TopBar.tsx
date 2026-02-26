'use client'
import { useRouter } from 'next/navigation'

interface TopBarProps {
  showLogo?: boolean
  userName?: string
}

export function RaiaLogo({ size = 60 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="raia-logo fade-in" src="/logo-raia.png" alt="Droga Raia" style={{ height: size, width: 'auto', objectFit: 'contain' }} />
  )
}

export function UserIcon() {
  return (
    <div className="user-icon float" style={{
      width: 48, height: 48, borderRadius: '50%',
      border: '2px solid #333',
      background: '#f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer'
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
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

export default function TopBar({ showLogo = true, userName = 'Rafaela' }: TopBarProps) {
  const router = useRouter()

  return (
    <div style={{
      height: 72,
      background: '#e8e8e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      borderBottom: '1px solid #ccc',
      flexShrink: 0
    }}>
      <ClockBar />
      {showLogo ? (
          <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
            <RaiaLogo size={54} />
        </div>
      ) : <div />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {userName && <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>{userName}</span>}
        <UserIcon />
      </div>
    </div>
  )
}
