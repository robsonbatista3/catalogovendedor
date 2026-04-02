export function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-800 rounded flex items-center justify-center font-black text-lg">
                CV
              </div>
              <span className="font-black text-xl tracking-tighter uppercase">
                Catálogo <span className="text-red-600">Vendedor</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Plataforma líder em gestão de catálogos e pedidos para o setor de moda e móveis. 
              Eficiência corporativa com design moderno.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest mb-4 text-red-600">Plataforma</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest mb-4 text-red-600">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Treinamento</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status do Sistema</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest mb-4 text-red-600">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; 2026 Catálogo do Vendedor. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">v1.0.0-stable</span>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Built with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
