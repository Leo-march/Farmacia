"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'

const medicines = [
  { id: 1, name: 'Tadalafila', qty: '20mg', maker: 'Neo química', expiry: '20/02', stock: 94, lot: 334, img: '/tadalafila.png' },
  { id: 2, name: 'Dipirona', qty: '20mg', maker: 'Prati Donaduzzi', expiry: '30/05', stock: 49, lot: 794, img: '/dipirona.png' },
  { id: 3, name: 'Cloridrato de fluoxetina', qty: '20mg', maker: 'Sandoz', expiry: '30/08', stock: 31, lot: 891, img: '/fluoxetina.png' },
  { id: 4, name: 'Paracetamol', qty: '750mg', maker: 'Tylenol', expiry: '17/10', stock: 19, lot: 875, img: '/paracetamol.png' },
]

export default function Page() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [basket, setBasket] = useState<typeof medicines>([])
  const [dragging, setDragging] = useState<number | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (dragging !== null) {
      const med = medicines.find(m => m.id === dragging)
      if (med && !basket.find(b => b.id === med.id)) {
        setBasket(prev => [...prev, med])
      }
      setDragging(null)
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 50%, #C8102E 100%)' }}>
      <TopBar showLogo userName="Rafaela" />

      <div style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>
        {/* Main content */}
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f0f0f0', borderRadius: 12, padding: '10px 16px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Pesquisar"
              style={{ flex: 1, background: 'none', border: 'none', fontSize: '1.1rem', color: '#333', outline: 'none' }}
            />
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1 }}>
            {filtered.map(med => (
              <div
                key={med.id}
                draggable
                onDragStart={() => setDragging(med.id)}
                onDragEnd={() => setDragging(null)}
                style={{
                  background: '#f8f8f8',
                  borderRadius: 16,
                  padding: 16,
                  display: 'flex',
                  gap: 14,
                  cursor: 'grab',
                  border: dragging === med.id ? '2px dashed #C8102E' : '2px solid transparent',
                  transition: 'all 0.15s',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                }}
              >
                {/* Real product image */}
                <div style={{
                  width: 90, height: 110, borderRadius: 10,
                  background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, overflow: 'hidden'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="transparent-img product-img" src={med.img} alt={med.name} style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ fontSize: '0.82rem', color: '#333', lineHeight: 1.7 }}>
                  <div><b>Nome:</b> {med.name}</div>
                  <div><b>Quantidade:</b> {med.qty}</div>
                  <div><b>Fabricante:</b> {med.maker}</div>
                  <div><b>Validade:</b> {med.expiry}</div>
                  <div><b>Quantidade estoque:</b> {med.stock}</div>
                  <div><b>Lote:</b> {med.lot}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basket area */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            width: 220,
            background: dragOver ? '#fff0f0' : 'white',
            borderLeft: '2px solid',
            borderColor: dragOver ? '#C8102E' : '#ddd',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            transition: 'all 0.2s',
            padding: 16
          }}
        >
          {basket.length === 0 ? (
            <>
              <p style={{ textAlign: 'center', color: '#888', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Arraste algum remédio aqui para colocá-lo na receita
              </p>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </>
          ) : (
            <div style={{ width: '100%' }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 12, color: '#333' }}>Na receita:</p>
              {basket.map(b => (
                <div key={b.id} style={{
                  background: '#f8f8f8', borderRadius: 8, padding: '8px 10px',
                  marginBottom: 8, fontSize: '0.8rem', color: '#333', fontWeight: 500
                }}>
                  {b.name} {b.qty}
                  <button
                    onClick={() => setBasket(prev => prev.filter(x => x.id !== b.id))}
                    style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: '#C8102E', fontWeight: 700 }}
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => router.push('/')}
          style={{
            position: 'absolute', top: 80, right: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.8rem', color: '#555', fontWeight: 300
          }}
        >✕</button>
      </div>
    </div>
  )
}

