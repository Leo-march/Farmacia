'use client'
import { useState } from 'react'
import { Screen } from '@/app/page'
import TopBar from './TopBar'

interface Props { navigate: (s: Screen) => void }

const receitas = [
  { id: 1, name: 'Receita Amoxilína', data: '02/06/2026', validade: '10/02/2027', status: 'Ativo' },
  { id: 2, name: 'Receita Tadalafila', data: '12/06/2026', validade: '10/02/2026', status: 'Vencido' },
  { id: 3, name: 'Receita Paracetamol', data: '14/06/2026', validade: '01/01/2025', status: 'Vencido' },
]

type Filter = 'Todos' | 'Ativos' | 'Vencidos'

export default function ReceitasScreen({ navigate }: Props) {
  const [filter, setFilter] = useState<Filter>('Todos')
  const [search, setSearch] = useState('')

  const filtered = receitas.filter(r => {
    const matchFilter = filter === 'Todos' || (filter === 'Ativos' && r.status === 'Ativo') || (filter === 'Vencidos' && r.status === 'Vencido')
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 50%, #C8102E 100%)' }}>
      <TopBar navigate={navigate} showLogo userName="Rafaela" />

      <button onClick={() => navigate('home')} style={{ position: 'absolute', top: 84, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#555' }}>✕</button>

      <div style={{ flex: 1, padding: '24px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Search + Filters */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0f0f0', borderRadius: 999, padding: '10px 18px', flex: '0 0 280px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '1rem', color: '#333' }} />
          </div>
          {(['Todos', 'Ativos', 'Vencidos'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                borderRadius: 999, padding: '10px 28px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', border: 'none',
                background: filter === f ? '#222' : '#ddd',
                color: filter === f ? 'white' : '#444',
                transition: 'all 0.15s'
              }}
            >{f}</button>
          ))}
        </div>

        {/* List */}
        <div style={{ background: '#f0f0f0', borderRadius: 20, padding: 12, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {filtered.map(r => (
            <div key={r.id} style={{
              background: 'white', borderRadius: 14, padding: '20px 28px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
            }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#222', minWidth: 220 }}>{r.name}</span>
              <span style={{ color: '#555', fontSize: '1rem' }}>Receita : {r.data}</span>
              <span style={{ color: '#555', fontSize: '1rem' }}>Validade : {r.validade}</span>
              <span style={{ fontSize: '0.95rem' }}>
                Status: <b style={{ color: r.status === 'Ativo' ? '#16a34a' : '#dc2626' }}>{r.status}</b>
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', paddingBottom: 16 }}>
          {[
            { label: 'Cadastrar', icon: '📋' },
            { label: 'Editar', icon: '✏️' },
            { label: 'Histórico', onClick: () => navigate('historico'), icon: '🕐' },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={btn.onClick}
              style={{
                background: '#e0e0e0', border: 'none', borderRadius: 999,
                padding: '14px 32px', fontSize: '1rem', fontWeight: 600,
                cursor: 'pointer', color: '#333', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: 8
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ccc')}
              onMouseLeave={e => (e.currentTarget.style.background = '#e0e0e0')}
            >
              {btn.label} <span>{btn.icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
