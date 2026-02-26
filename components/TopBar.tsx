'use client'
import { Screen } from '@/app/page'

interface TopBarProps {
  navigate: (s: Screen) => void
  showLogo?: boolean
  userName?: string
}

export function RaiaLogo({ size = 40 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-raia.png" alt="Droga Raia" style={{ height: size, width: 'auto', objectFit: 'contain' }} />
  )
}

export function UserIcon() {
  return (
    <div style={{
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
  return (
    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', fontVariantNumeric: 'tabular-nums' }}>
      12/02 &nbsp; 13:43
    </div>
  )
}

export default function TopBar({ navigate, showLogo = true, userName }: TopBarProps) {
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
        <div onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
          <RaiaLogo size={36} />
        </div>
      ) : <div />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {userName && <span style={{ fontWeight: 600, fontSize: '1.1rem', color: '#333' }}>{userName}</span>}
        <UserIcon />
      </div>
    </div>
  )
}
