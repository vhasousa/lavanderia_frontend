import { useEffect, useState } from 'react';

import ClientDetails from './ClientDetails'
import { ArrowLeft, ArrowRight } from 'react-feather'

import styles from './ClientsTable.module.css'

interface Client {
  id: string;
  first_name: string
  last_name: string
  phone: string
}

interface ClientsResponse {
  clients: Client[];
  page: number;
  total_pages: number;
}

interface ClientsTableProps {
  updateTrigger: number; // This prop will be used to trigger updates in the table
}


const ClientsTable: React.FC<ClientsTableProps> = ({ updateTrigger }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageInput, setPageInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");

  const openModal = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsModalOpen(true);
  };

  const formatarTelefone = (numero: string): string => {
    // Remove caracteres não numéricos
    const numeros = numero.replace(/\D/g, '');

    // Verifica se o número tem o DDD + 9 dígitos para celular ou 8 dígitos para fixo
    if (numeros.length === 11) {
        // Formato de celular com 9 dígitos
        return numeros.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4');
    } else if (numeros.length === 10) {
        // Formato de telefone fixo
        return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    // Retorna o número sem formatação se não atender aos critérios acima
    return numero;
}

  useEffect(() => {
    // Function to fetch services data
    const fetchServices = async () => {
      try {
        const response = await fetch(`http://localhost:8080/clients?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ClientsResponse = await response.json();
        setClients(data.clients ?? []);
        setTotalPages(data.total_pages)
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchServices();
  }, [updateTrigger, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const jumpToPage = () => {
    const pageNumber = parseInt(pageInput, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
      setPageInput(''); // Reset the input if the value is invalid
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      jumpToPage(); // Call jumpToPage when user presses Enter
    }
  };

  return (
    <>
      <table className={styles.clientTable}>
        <thead>
          <tr>
            <th>Nome do cliente</th>
            <th>Contato</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id}>
                <td onClick={() => openModal(client.id)}>
                  {`${client.first_name} ${client.last_name}`}
                </td>
                <td>{formatarTelefone(client.phone)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>Nenhum cliente cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>
  
      <div className={styles.paginationContainer}>
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1 || clients.length === 0}>
            <ArrowLeft className={styles.arrowLeftIcon} />
          </button>
          <span>{currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages || clients.length === 0}>
            <ArrowRight />
          </button>
        </div>
        {clients.length > 0 && (
          <div className={styles.paginationSearch}>
            <input
              type="text"
              value={pageInput}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              placeholder="Ir para"
            />
            <button onClick={jumpToPage}>Ir</button>
          </div>
        )}
      </div>
  
      {isModalOpen && (
        <ClientDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          clientId={selectedClientId}
        />
      )}
    </>
  );
  
};

export default ClientsTable;
