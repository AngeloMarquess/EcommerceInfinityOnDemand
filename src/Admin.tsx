import { useEffect, useState } from 'react';
import { Users, Mail, Phone, Calendar, ArrowLeft, Trash2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from './lib/supabase';

interface Lead {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  data_cadastro: string;
}

function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // Login States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('data_cadastro', { ascending: false });
        
      if (error) {
        console.error("Erro do Supabase:", error);
        return;
      }
      
      setLeads(data || []);
    } catch (err) {
      console.error("Exceção ao carregar leads:", err);
    }
  };

  const deleteLead = async (id: string) => {
    if (window.confirm("Você tem certeza que deseja deletar este lead de seu banco de dados?")) {
      try {
        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', id);

        if (error) {
          console.error("Erro ao deletar lead do Supabase:", error);
          alert("Houve um erro ao deletar. Atualize a página e tente novamente.");
          return;
        }

        const filtered = leads.filter(l => l.id !== id);
        setLeads(filtered);
      } catch (err) {
        console.error("Exceção ao deletar lead:", err);
      }
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Green@2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-dark)' }}>
        <div className="bg-glow-1"></div>
        <div className="cta-box glass" style={{ maxWidth: '450px', width: '100%', padding: '40px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div className="service-icon" style={{ backgroundColor: 'rgba(0, 255, 135, 0.1)', color: 'var(--primary)', marginBottom: 0, width: '80px', height: '80px', borderRadius: '50%' }}>
              <Lock size={40} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Acesso Restrito</h2>
          <p className="text-muted" style={{ marginBottom: '32px' }}>Painel Administrativo - Infinity</p>
          
          <form className="cta-form" onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Usuário"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <input
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-success" style={{ color: '#f2295f', fontSize: '0.875rem', marginBottom: '16px', fontWeight: 600 }}>Usuário ou senha incorretos.</p>}
            <button type="submit" className="btn btn-primary btn-lg cta-btn" style={{ width: '100%' }}>
              Entrar
            </button>
          </form>
          
          <div style={{ marginTop: '32px' }}>
            <Link to="/" className="text-muted" style={{ fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <ArrowLeft size={14} /> Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper" style={{ minHeight: '100vh', padding: '40px 24px', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <Link to="/" className="btn btn-outline sm-btn" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <ArrowLeft size={16} /> Voltar para o Site
            </Link>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
              Painel de <span className="text-gradient">Leads Capturados</span>
            </h1>
            <p className="text-muted">Relatório gerencial de agendamentos para a Infinity On Demand.</p>
          </div>
          
          <div className="stat glass" style={{ padding: '20px 32px', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Users size={32} className="text-gradient" />
              <div>
                <h3 style={{ fontSize: '2rem', margin: 0 }}>{leads.length}</h3>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>LEADS TOTAIS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {leads.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Users size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
              <h3>Nenhum lead capturado ainda.</h3>
              <p>Os leads que preencherem o formulário no site ficarão salvos aqui.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Contato</th>
                    <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>E-mail</th>
                    <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>WhatsApp</th>
                    <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Data do Cadastro</th>
                    <th style={{ padding: '20px 24px', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s' }} className="table-row-hover">
                      <td style={{ padding: '20px 24px', fontWeight: 500 }}>{lead.nome}</td>
                      <td style={{ padding: '20px 24px', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail size={14} className="text-gradient" /> {lead.email}
                        </div>
                      </td>
                      <td style={{ padding: '20px 24px', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Phone size={14} className="text-gradient" /> {lead.whatsapp}
                        </div>
                      </td>
                      <td style={{ padding: '20px 24px', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Calendar size={14} /> {formatDate(lead.data_cadastro)}
                        </div>
                      </td>
                      <td style={{ padding: '20px 24px' }}>
                        <button 
                          onClick={() => deleteLead(lead.id)}
                          style={{ background: 'transparent', border: 'none', color: '#f2295f', cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'all 0.2s' }}
                          title="Deletar este lead"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
