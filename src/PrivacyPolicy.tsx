import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <>
      <div className="bg-glow-1"></div>

      {/* Navbar Minimalista */}
      <nav className="nav-container nav-scrolled glass">
        <div className="container nav-content">
          <div className="logo">
            <Link to="/" className="logo-text" style={{ textDecoration: 'none', color: 'inherit' }}>
              Infinity<span className="text-gradient">OnDemand</span>
            </Link>
          </div>
          <Link to="/" className="btn btn-outline sm-btn">
            <ArrowLeft size={16} /> Voltar para o início
          </Link>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '150px', paddingBottom: '100px', maxWidth: '800px' }}>
        <h1 className="hero-title" style={{ marginBottom: '40px' }}>Política de Privacidade</h1>

        <div className="policy-content" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          <br />

          <p>
            A <strong>Infinity on Demand</strong> (CNPJ: 53.316.174/0001-24), agência focada em marketing digital de alta performance, respeita a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos os seus dados pessoais ao visitar nosso site e interagir com nossos serviços.
          </p>

          <h3 style={{ color: 'var(--text-main)', marginTop: '40px', marginBottom: '16px', fontSize: '1.5rem' }}>1. Coleta de Informações Pessoais</h3>
          <p>Coletamos informações pessoais que você nos fornece voluntariamente durante a interação com o site (por exemplo, ao preencher o formulário para agendar uma consultoria). Isso pode incluir:</p>
          <ul style={{ marginLeft: '24px', marginBottom: '24px', listStyleType: 'disc' }}>
            <li>Nome completo</li>
            <li>Endereço de e-mail corporativo</li>
            <li>Número de telefone/WhatsApp</li>
          </ul>
          <p>Também utilizamos tecnologias de rastreamento (como pixels do Facebook/Meta e Google Analytics) para entender o comportamento de navegação no site de forma anônima, garantindo as melhores estratégias de tráfego pago.</p>

          <h3 style={{ color: 'var(--text-main)', marginTop: '40px', marginBottom: '16px', fontSize: '1.5rem' }}>2. Como Utilizamos Suas Informações</h3>
          <p>As informações coletadas são usadas exclusivamente para os seguintes propósitos:</p>
          <ul style={{ marginLeft: '24px', marginBottom: '24px', listStyleType: 'disc' }}>
            <li>Entrar em contato via WhatsApp ou e-mail para agendamento de reuniões comerciais;</li>
            <li>Melhorar os nossos serviços, estratégias de anúncios em Google Ads e Meta Ads;</li>
            <li>Enviar comunicações sobre soluções focadas no crescimento do seu negócio (caso autorizado);</li>
            <li>Cumprir com as obrigações legais impostas e resolver eventuais conflitos.</li>
          </ul>

          <h3 style={{ color: 'var(--text-main)', marginTop: '40px', marginBottom: '16px', fontSize: '1.5rem' }}>3. Compartilhamento de Dados</h3>
          <p>A Infinity on Demand <strong>não vende, aluga ou compartilha</strong> comercialmente suas informações com terceiros que não tenham relação direta com os nossos serviços e operações (ex: ferramentas de disparo de e-mail e CRM de agendamento, como Calendly). Tomamos todas as precauções para que fornecedores respeitem as Leis de Proteção de Dados vigentes (LGPD).</p>

          <h3 style={{ color: 'var(--text-main)', marginTop: '40px', marginBottom: '16px', fontSize: '1.5rem' }}>4. Uso de Cookies e Pixel de Rastreamento</h3>
          <p>Nosso site utiliza <em>cookies</em>, que são pequenos arquivos transferidos para o seu computador ou dispositivo móvel que permitem reconhecer o seu navegador. Além disso, utilizamos tags de rastreamento de anúncios (Google Tag Manager, Meta Pixel) para mensurar as conversões e entregar a melhor publicidade possível. Você poderá desativar a gravação de cookies a qualquer momento, acessando as configurações do seu próprio navegador.</p>

          <h3 style={{ color: 'var(--text-main)', marginTop: '40px', marginBottom: '16px', fontSize: '1.5rem' }}>5. Segurança dos Dados</h3>
          <p>Possuímos certificados de segurança e utilizamos tecnologias Secure Socket Layer (SSL) com criptografia 256 bits para preservar o sigilo das informações trocadas, blindando contra roubos. O nosso servidor está em um ambiente altamente restrito e verificado.</p>

          <h3 style={{ color: 'var(--text-main)', marginTop: '40px', marginBottom: '16px', fontSize: '1.5rem' }}>6. Direitos do Titular (LGPD)</h3>
          <p>Garantimos a você todos os direitos previstos na Lei Geral de Proteção de Dados. Você pode solicitar a correção de dados incompletos ou a exclusão dos seus dados do nosso banco quando já não houver necessidade legal para retê-los.</p>

          <h3 style={{ color: 'var(--text-main)', marginTop: '40px', marginBottom: '16px', fontSize: '1.5rem' }}>7. Contato</h3>
          <p>Para dúvidas a respeito desta Política de Privacidade ou para acionar os seus direitos sobre dados pessoais, entre em contato através de:</p>
          <p><strong>E-mail: </strong>contato@infinityondemand.com.br</p>
          <p><strong>CNPJ: </strong>53.316.174/0001-24</p>
          <br />
          <p>Ao utilizar o site da <strong>Infinity on Demand</strong>, você concorda com os termos dispostos nesta Política de Privacidade.</p>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
            <p>&copy; {new Date().getFullYear()} Infinity on Demand. Todos os direitos reservados. | CNPJ: 53.316.174/0001-24</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PrivacyPolicy;
