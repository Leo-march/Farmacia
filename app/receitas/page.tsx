"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'

interface Receita {
  id: number
  name: string
  data: string
  validade: string
  status: 'Ativo' | 'Vencido'
  paciente?: string
  medicamento?: string
  medico?: string
}

const initialReceitas: Receita[] = [
  { id: 1, name: 'Receita Amoxilína', data: '02/06/2026', validade: '10/02/2027', status: 'Ativo', paciente: 'João Silva', medicamento: 'Amoxilína 500mg', medico: 'Dr. Carlos' },
  { id: 2, name: 'Receita Tadalafila', data: '12/06/2026', validade: '10/02/2026', status: 'Vencido', paciente: 'Pedro Santos', medicamento: 'Tadalafila 20mg', medico: 'Dr. Marcos' },
  { id: 3, name: 'Receita Paracetamol', data: '14/06/2026', validade: '01/01/2025', status: 'Vencido', paciente: 'Ana Lima', medicamento: 'Paracetamol 750mg', medico: 'Dra. Fernanda' },
]

type Filter = 'Todos' | 'Ativos' | 'Vencidos'

interface FormData {
  name: string
  data: string
  validade: string
  status: 'Ativo' | 'Vencido'
  paciente: string
  medicamento: string
  medico: string
}

const emptyForm: FormData = {
  name: '', data: '', validade: '', status: 'Ativo',
  paciente: '', medicamento: '', medico: ''
}

const formFields: { label: string; key: keyof FormData }[] = [
  { label: 'Nome da Receita', key: 'name' },
  { label: 'Paciente', key: 'paciente' },
  { label: 'Medicamento', key: 'medicamento' },
  { label: 'Médico', key: 'medico' },
  { label: 'Data (dd/mm/aaaa)', key: 'data' },
  { label: 'Validade (dd/mm/aaaa)', key: 'validade' },
]

// ── Defined OUTSIDE Page so it is never recreated on re-render ──
interface ModalProps {
  title: string
  form: FormData
  errors: Record<string, string>
  onChange: (key: keyof FormData, value: string) => void
  onSave: () => void
  onClose: () => void
}

function ReceitaModal({ title, form, errors, onChange, onSave, onClose }: ModalProps) {
  const inp = (field: string): React.CSSProperties => ({
    width: '100%', padding: '10px 14px',
    border: errors[field] ? '1.5px solid #dc2626' : '1.5px solid #ddd',
    borderRadius: 10, fontSize: '0.95rem', outline: 'none',
    background: '#fafafa', color: '#222', boxSizing: 'border-box'
  })

  return (
<<<<<<< HEAD
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 50%, #C8102E 100%)' }}>

      <button onClick={() => router.push('/')} style={{ position: 'absolute', top: 84, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#555' }}>✕</button>

      <div style={{ flex: 1, padding: '24px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Search + Filters */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0f0f0', borderRadius: 999, padding: '10px 18px', flex: '0 0 280px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '1rem', color: '#333' }} />
=======
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'white', borderRadius: 22, padding: 36, width: 480, boxShadow: '0 24px 70px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: 24, color: '#111' }}>{title}</h2>
        {formFields.map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#555', marginBottom: 4 }}>{f.label}</label>
            <input
              value={form[f.key] as string}
              onChange={e => onChange(f.key, e.target.value)}
              style={inp(f.key)}
            />
            {errors[f.key] && <span style={{ color: '#dc2626', fontSize: '0.78rem' }}>{errors[f.key]}</span>}
>>>>>>> 8c9dc4d7712ae7274451c79812d1cf4745d45338
          </div>
        ))}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#555', marginBottom: 4 }}>Status</label>
          <select
            value={form.status}
            onChange={e => onChange('status', e.target.value)}
            style={{ ...inp('status'), cursor: 'pointer' }}
          >
            <option value="Ativo">Ativo</option>
            <option value="Vencido">Vencido</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button onClick={onSave} style={{ flex: 1, background: '#C8102E', color: 'white', border: 'none', borderRadius: 12, padding: '13px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Salvar
          </button>
          <button onClick={onClose} style={{ flex: 1, background: '#eee', border: 'none', borderRadius: 12, padding: '13px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', color: '#555' }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>('Todos')
  const [search, setSearch] = useState('')
  const [receitas, setReceitas] = useState<Receita[]>(initialReceitas)
  const [showCadastrar, setShowCadastrar] = useState(false)
  const [showEditar, setShowEditar] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [form, setForm] = useState<FormData>({ ...emptyForm })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const filtered = receitas.filter(r => {
    const matchFilter = filter === 'Todos' || (filter === 'Ativos' && r.status === 'Ativo') || (filter === 'Vencidos' && r.status === 'Vencido')
    return matchFilter && r.name.toLowerCase().includes(search.toLowerCase())
  })

  const validate = (f: FormData) => {
    const e: Record<string, string> = {}
    if (!f.name.trim()) e.name = 'Nome obrigatório'
    if (!f.data.trim()) e.data = 'Data obrigatória'
    if (!f.validade.trim()) e.validade = 'Validade obrigatória'
    if (!f.paciente.trim()) e.paciente = 'Paciente obrigatório'
    if (!f.medicamento.trim()) e.medicamento = 'Medicamento obrigatório'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const openCadastrar = () => { setForm({ ...emptyForm }); setErrors({}); setShowCadastrar(true) }

  const openEditar = () => {
    if (selectedId === null) return
    const r = receitas.find(x => x.id === selectedId)
    if (!r) return
    setForm({ name: r.name, data: r.data, validade: r.validade, status: r.status, paciente: r.paciente || '', medicamento: r.medicamento || '', medico: r.medico || '' })
    setErrors({})
    setShowEditar(true)
  }

  const handleCadastrar = () => {
    if (!validate(form)) return
    const id = Math.max(...receitas.map(r => r.id), 0) + 1
    setReceitas(prev => [...prev, { id, ...form }])
    setShowCadastrar(false)
  }

  const handleEditar = () => {
    if (!validate(form)) return
    setReceitas(prev => prev.map(r => r.id === selectedId ? { ...r, ...form } : r))
    setShowEditar(false)
  }

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, white 50%, #C8102E 100%)' }}>
      <TopBar showLogo userName="Rafaela" />
      <button onClick={() => router.push('/')} style={{ position: 'absolute', top: 84, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', color: '#555' }}>✕</button>

      <div style={{ flex: 1, padding: '24px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f0f0f0', borderRadius: 999, padding: '10px 18px', flex: '0 0 280px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '1rem', color: '#333' }} />
          </div>
          {(['Todos', 'Ativos', 'Vencidos'] as Filter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ borderRadius: 999, padding: '10px 28px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', border: 'none', background: filter === f ? '#222' : '#ddd', color: filter === f ? 'white' : '#444', transition: 'all 0.15s' }}>{f}</button>
          ))}
        </div>

        <div style={{ background: '#f0f0f0', borderRadius: 20, padding: 12, display: 'flex', flexDirection: 'column', gap: 10, flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 && <div style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>Nenhuma receita encontrada.</div>}
          {filtered.map(r => (
            <div key={r.id} onClick={() => setSelectedId(r.id === selectedId ? null : r.id)} style={{ background: 'white', borderRadius: 14, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', cursor: 'pointer', border: selectedId === r.id ? '2px solid #C8102E' : '2px solid transparent', transition: 'all 0.15s' }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#222', minWidth: 220 }}>{r.name}</span>
              <span style={{ color: '#555' }}>Receita: {r.data}</span>
              <span style={{ color: '#555' }}>Validade: {r.validade}</span>
              <span>Status: <b style={{ color: r.status === 'Ativo' ? '#16a34a' : '#dc2626' }}>{r.status}</b></span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', paddingBottom: 16 }}>
          {[
            { label: 'Cadastrar', icon: '📋', onClick: openCadastrar, disabled: false },
            { label: 'Editar', icon: '✏️', onClick: openEditar, disabled: selectedId === null },
            { label: 'Histórico', icon: '🕐', onClick: () => router.push('/historico'), disabled: false },
          ].map(btn => (
            <button key={btn.label} onClick={btn.onClick} disabled={btn.disabled} style={{ background: btn.disabled ? '#f0f0f0' : '#e0e0e0', border: 'none', borderRadius: 999, padding: '14px 32px', fontSize: '1rem', fontWeight: 600, cursor: btn.disabled ? 'not-allowed' : 'pointer', color: btn.disabled ? '#bbb' : '#333', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 8, opacity: btn.disabled ? 0.6 : 1 }}
              onMouseEnter={e => { if (!btn.disabled) (e.currentTarget.style.background = '#ccc') }}
              onMouseLeave={e => { if (!btn.disabled) (e.currentTarget.style.background = '#e0e0e0') }}
            >
              {btn.label} <span>{btn.icon}</span>
            </button>
          ))}
        </div>
      </div>

      {showCadastrar && <ReceitaModal title="Cadastrar Receita" form={form} errors={errors} onChange={handleChange} onSave={handleCadastrar} onClose={() => setShowCadastrar(false)} />}
      {showEditar && <ReceitaModal title="Editar Receita" form={form} errors={errors} onChange={handleChange} onSave={handleEditar} onClose={() => setShowEditar(false)} />}
    </div>
  )
}