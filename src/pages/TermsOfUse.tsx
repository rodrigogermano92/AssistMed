import { Link } from 'react-router-dom';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-brand-bg dark:bg-brand-dark pt-32 pb-24 px-6 md:px-12 text-brand-dark dark:text-white">
      <div className="max-w-4xl mx-auto frosted-card p-10 md:p-16 rounded-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-teal font-bold mb-10 transition-colors uppercase tracking-widest text-xs">
          <i className="fa-solid fa-arrow-left"></i> Voltar para Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Termos de Uso - AssistMed</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium mb-10">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="space-y-8 font-serif leading-relaxed text-sm md:text-base text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold font-sans text-brand-dark dark:text-white mb-4">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o AssistMed, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços. Recomendamos a leitura atenta de todas as condições aqui estabelecidas.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-sans text-brand-dark dark:text-white mb-4">2. Descrição dos Serviços</h2>
            <p>O AssistMed é uma plataforma de inteligência artificial desenvolvida para auxiliar profissionais de saúde e estudantes da área médica. Nossos serviços incluem suporte a diagnósticos, informações sobre medicamentos, geração de relatórios médicos e outras funcionalidades voltadas à otimização da rotina clínica, diretamente integrados ao WhatsApp.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-sans text-brand-dark dark:text-white mb-4">3. Responsabilidades do Usuário</h2>
            <p>O usuário é responsável por utilizar a plataforma de forma ética e profissional, garantindo que as informações obtidas sejam utilizadas como suporte à decisão clínica, e não como substituição ao julgamento profissional. O usuário deve manter suas credenciais de acesso em sigilo e não compartilhá-las com terceiros.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-sans text-brand-dark dark:text-white mb-4">4. Privacidade e Proteção de Dados</h2>
            <p>Tratamos a privacidade e a proteção de dados com seriedade absoluta. Todas as informações processadas pela plataforma são protegidas por criptografia e seguem as diretrizes da LGPD (Lei Geral de Proteção de Dados) e do GDPR (General Data Protection Regulation). Para mais informações, consulte nossa Política de Privacidade.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-sans text-brand-dark dark:text-white mb-4">5. Propriedade Intelectual</h2>
            <p>Todo o conteúdo, funcionalidades, design e tecnologia do AssistMed são de propriedade exclusiva da empresa. É proibida a reprodução, distribuição ou modificação de qualquer parte da plataforma sem autorização prévia por escrito.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-sans text-brand-dark dark:text-white mb-4">6. Limitações de Responsabilidade</h2>
            <p>O AssistMed fornece informações com base em fontes médicas confiáveis, porém não substitui a avaliação, o diagnóstico ou o tratamento realizado por profissionais de saúde qualificados. A plataforma não se responsabiliza por decisões clínicas tomadas exclusivamente com base nas informações fornecidas pelo sistema.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-sans text-brand-dark dark:text-white mb-4">7. Modificações dos Termos</h2>
            <p>Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma. O uso continuado dos serviços após as modificações constitui aceitação dos novos termos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-sans text-brand-dark dark:text-white mb-4">8. Contato</h2>
            <p>Para dúvidas, sugestões ou solicitações relacionadas a estes Termos de Uso, entre em contato através do e-mail suporte@assistmed.com.br ou pelo WhatsApp disponível em nossa plataforma.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
