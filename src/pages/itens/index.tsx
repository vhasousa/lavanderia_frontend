import Sidebar from '../../components/Sidebar';

const Itens = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Conteúdo da página Itens */}
        <h1>Itens</h1>
      </div>
    </div>
  );
};

export default Itens;
