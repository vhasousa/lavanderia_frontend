// Exemplo para pages/clientes/index.tsx
import Sidebar from '../../components/Sidebar';

const Clientes = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Conteúdo da página Clientes */}
        <h1>Clientes</h1>
      </div>
    </div>
  );
};

export default Clientes;
