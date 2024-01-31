// Exemplo para pages/clientes/index.tsx

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

// Define TypeScript interfaces for your data
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
}

interface ServicesResponse {
  services: Service[];
}

const ServicesTable = () => {
  const [services, setServices] = useState<Service[]>([]);

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
    <table>
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Status</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => (
          <tr key={service.id}>
            {/* Assuming 'Client Name' can be derived from the items' names */}
            <td>{service.items.map(item => item.name).join(', ')}</td>
            <td>{service.status}</td>
            <td>${service.total_price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServicesTable;

