'use client'
import { useState } from 'react'
import { Screen } from '@/app/page'
import TopBar from './TopBar'

interface Props { navigate: (s: Screen) => void }

type Filter = 'Todos' | 'Em estoque' | 'Maior Estoque' | 'Baixo Estoque'

interface Product {
  id: number
  name: string
  category: string
  qty: number
  price: number
}

const initialProducts: Product[] = [
  { id: 1, name: 'Paracetamol', category: 'Analgésico', qty: 150, price: 17.99 },
  { id: 2, name: 'amoxicilina', category: 'Antibióticos', qty: 322, price: 11.99 },
]

export default function EstoqueScreen({ navigate }: Props) {
  const [filter, setFilter] = useState<Filter>('Todos')
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Product>>({})
  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', category: '', qty: '', price: '' })

  const applyFilter = (p: Product) => {
    if (filter === 'Em estoque') return p.qty > 0
    if (filter === 'Maior Estoque') return p.qty > 200
    if (filter === 'Baixo Estoque') return p.qty < 50
    return true
  }

  const filtered = products.filter(p =>
    applyFilter(p) && p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (p: Product) => {
    setEditingId(p.id)
    setEditForm({ ...p })
  }

  const handleSave = () => {
    setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } as Product : p))
    setEditingId(null)
  }

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const handleAdd = () => {
    if (!newProduct.name) return
    const id = Math.max(...products.map(p => p.id), 0) + 1
    setProducts(prev => [...prev, {
      id,
      name: newProduct.name,
      category: newProduct.category,
      qty: parseInt(newProduct.qty) || 0,
      price: parseFloat(newProduct.price) || 0
    }])
    setNewProduct({ name: '', category: '', qty: '', price: '' })
    setShowAdd(false)
  }

  const inputStyle = {
    border: '1px solid #ddd', borderRadius: 6, padding: '4px 8px',
    fontSize: '0.9rem', width: '100%', outline: 'none'
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 55%, #C8102E 100%)' }}>
      <TopBar navigate={navigate} showLogo userName="Rafaela" />

      <button onClick={() => navigate('home')} style={{ position: 'absolute', top: 84, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#555' }}>✕</button>

      <div style={{ flex: 1, padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0f0f0', borderRadius: 999, padding: '8px 16px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '0.9rem', width: 120 }} />
          </div>
          {(['Todos', 'Em estoque', 'Maior Estoque', 'Baixo Estoque'] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              borderRadius: 999, padding: '8px 20px', fontWeight: 700, fontSize: '0.9rem',
              cursor: 'pointer', border: 'none',
              background: filter === f ? '#222' : '#ddd',
              color: filter === f ? 'white' : '#444',
              transition: 'all 0.15s'
            }}>{f}</button>
          ))}
          <button
            onClick={() => setShowAdd(true)}
            style={{
              marginLeft: 'auto', background: '#C8102E', color: 'white', border: 'none',
              borderRadius: 999, padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem'
            }}
          >+ Adicionar</button>
        </div>

        {/* Table */}
        <div style={{ border: '2px solid #ddd', borderRadius: 16, overflow: 'hidden', background: 'white', flex: 1 }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', background: '#f8f8f8', padding: '14px 20px', borderBottom: '2px solid #ddd' }}>
            {['Produto', 'Categoria', 'Quantidade', 'Preço', 'Ações'].map(h => (
              <span key={h} style={{ fontWeight: 700, color: '#555', fontSize: '0.95rem' }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {filtered.map(p => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '16px 20px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              {editingId === p.id ? (
                <>
                  <input value={editForm.name || ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
                  <input value={editForm.category || ''} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))} style={inputStyle} />
                  <input type="number" value={editForm.qty || ''} onChange={e => setEditForm(f => ({ ...f, qty: parseInt(e.target.value) }))} style={inputStyle} />
                  <input type="number" step="0.01" value={editForm.price || ''} onChange={e => setEditForm(f => ({ ...f, price: parseFloat(e.target.value) }))} style={inputStyle} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={handleSave} style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontWeight: 700 }}>✓</button>
                    <button onClick={() => setEditingId(null)} style={{ background: '#ddd', color: '#555', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer' }}>✕</button>
                  </div>
                </>
              ) : (
                <>
                  <span style={{ fontWeight: 500 }}>{p.name}</span>
                  <span style={{ color: '#666' }}>{p.category}</span>
                  <span style={{ color: p.qty < 50 ? '#dc2626' : '#222', fontWeight: p.qty < 50 ? 700 : 400 }}>{p.qty} Uni</span>
                  <span>R$ {p.price.toFixed(2)}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(p)} style={{ background: '#f0f0f0', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      Editar ✏️
                    </button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: '#f0f0f0', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      Apagar 🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Empty rows */}
          {Array.from({ length: Math.max(0, 4 - filtered.length) }).map((_, i) => (
            <div key={`e-${i}`} style={{ height: 56, borderBottom: '1px solid #eee' }} />
          ))}
        </div>

        {/* Add product modal */}
        {showAdd && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
          }}>
            <div style={{ background: 'white', borderRadius: 20, padding: 32, width: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: 20 }}>Novo Produto</h2>
              {[
                { label: 'Nome', key: 'name' },
                { label: 'Categoria', key: 'category' },
                { label: 'Quantidade', key: 'qty', type: 'number' },
                { label: 'Preço (R$)', key: 'price', type: 'number' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: 4 }}>{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    value={(newProduct as any)[f.key]}
                    onChange={e => setNewProduct(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ ...inputStyle, padding: '10px 14px', borderRadius: 10 }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button onClick={handleAdd} style={{ flex: 1, background: '#C8102E', color: 'white', border: 'none', borderRadius: 12, padding: '12px', fontWeight: 700, cursor: 'pointer' }}>Adicionar</button>
                <button onClick={() => setShowAdd(false)} style={{ flex: 1, background: '#ddd', border: 'none', borderRadius: 12, padding: '12px', fontWeight: 700, cursor: 'pointer' }}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
