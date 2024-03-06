import { useEffect, useState } from 'react';

import ServiceDetails from './ServiceDetails'
import { ArrowLeft, ArrowRight } from 'react-feather'

import styles from './ServicesTable.module.css'

interface Item {
  id: string;
  name: string;
  observation: string;
  item_quantity: number;
}

interface Service {
  id: string;
  items: Item[];
  status: string;
  total_price: number;
  is_paid: boolean;
  estimated_completion_date: string
  client_first_name: string
  client_last_name: string
}

interface ServicesResponse {
  services: Service[];
  page: number;
  total_pages: number;
}

interface ServicesTableProps {
  updateTrigger: number;
  searchTerm: string;
  statusFilter: string;
}


const ServicesTable: React.FC<ServicesTableProps> = ({ updateTrigger, searchTerm, statusFilter }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageInput, setPageInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const openModal = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    // Parse the date string and convert to local time
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options).replace(',', '');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  useEffect(() => {
    // Function to fetch services data
    const fetchClient = async () => {
      try {
        const response = await fetch(`http://localhost:8080/services?page=${currentPage}&searchTerm=${searchTerm}&status=${statusFilter}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ServicesResponse = await response.json();
        setServices(data.services || []);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchClient();
  }, [updateTrigger, currentPage, searchTerm, statusFilter]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value); // Update pageInput as user types
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

  const updateServiceStatus = (updatedServiceId: string, newStatus: string) => {
    setServices(services.map(service => {
      if (service.id === updatedServiceId) {
        return { ...service, status: newStatus };
      }
      return service;
    }));
  };

  return (
    <>
      <table className={styles.serviceTable}>
        <thead>
          <tr>
            <th>Nome do cliente</th>
            <th>Status</th>
            <th>Data de entrega estimada</th>
            <th>Preço total</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.id}>
                <td data-label="Nome do cliente" onClick={() => openModal(service.id)}>
                  {`${service.client_first_name} ${service.client_last_name}`}
                </td>
                <td data-label="Status">{service.status}</td>
                <td data-label="Data de entrega estimada">{formatDate(service.estimated_completion_date)}</td>
                <td data-label="Preço total">{formatPrice(service.total_price)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>Nenhum cliente cadastrado</td>
            </tr>
          )
          }
        </tbody>
      </table>

      <div className={styles.cardContainer}>
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className={styles.card} onClick={() => openModal(service.id)}>
              <div className={styles.cardHeader}>
                {`${service.client_first_name} ${service.client_last_name}`}
              </div>
              <div className={styles.cardContent}>
                Status: {service.status}
              </div>
              <div className={styles.cardContent}>
                Data de Entrega Estimada: {formatDate(service.estimated_completion_date)}
              </div>
              <div className={styles.cardContent}>
                Preço Total: {formatPrice(service.total_price)}
              </div>
            </div>
          ))
        ) : (
          <div>Nenhum cliente cadastrado</div>
        )}
      </div>

      <div className={styles.paginationContainer}>
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <ArrowLeft className={styles.arrowLeftIcon} />
          </button>
          <span>{currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ArrowRight />
          </button>
        </div>
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
      </div>

      {isModalOpen && (
        <ServiceDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          serviceId={selectedServiceId}
          onUpdateStatus={updateServiceStatus}
        />
      )}
    </>
  );
};

export default ServicesTable;
