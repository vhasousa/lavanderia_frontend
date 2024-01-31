import { useEffect, useState } from 'react';

import ServiceDetails from './ServiceDetails'

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
}

const ServicesTable = () => {
  const [services, setServices] = useState<Service[]>([]);
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
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ServicesResponse = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchServices();
  }, []);

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
          {services.map((service) => (
            <tr key={service.id}>
              <td onClick={() => openModal(service.id)}>
                {`${service.client_first_name} ${service.client_last_name}`}
              </td>
              <td>{service.status}</td>
              <td>{formatDate(service.estimated_completion_date)}</td>
              <td>{formatPrice(service.total_price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ServiceDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          serviceId={selectedServiceId}
        />
      )}
    </>
  );
};

export default ServicesTable;
