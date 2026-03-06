import { useEffect, useState } from 'react';
import { Users, Mail, Phone, Calendar, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lead {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  data_cadastro: string;
}

function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const data = localStorage.getItem('infinity_leads');
    if (data) {
      setLeads(JSON.parse(data).reverse()); // Apresenta o mais recente por cima
    }
  };

  const deleteLead = (id: string) => {
    if (window.confirm("Você tem certeza que deseja deletar este lead de seu banco de dados?")) {
      const filtered = leads.filter(l => l.id !== id);
      localStorage.setItem('infinity_leads', JSON.stringify(filtered));
      setLeads(filtered);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

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
