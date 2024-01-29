import { useEffect, useState } from 'react';

type Service = {
  id: string;
  items: {
    id: string;
    name: string;
    observation: string;
    item_quantity: number;
  }[];
  status: string;
  total_price: number;
  is_paid: boolean;
};

const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    const response = await fetch('http://localhost:8080/services');
    const data = await response.json();
    setServices(data.services);
  };

  useEffect(() => {
    fetchServices()
  }, []);

  return (
    <div>
      <h1>Lista de Serviços</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h2>ID: {service.id}</h2>
            <p>Status: {service.status}</p>
            <p>Total Price: {service.total_price}</p>
            <p>Is Paid: {service.is_paid ? 'Sim' : 'Não'}</p>
            <h3>Itens:</h3>
            <ul>
              {service.items.map((item) => (
                <li key={item.id}>
                  <p>Nome: {item.name}</p>
                  <p>Quantidade: {item.item_quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
