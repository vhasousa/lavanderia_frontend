import { useEffect, useState } from 'react';

import styles from './ServiceDetails.module.css'
import { serialize } from 'v8';

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

interface ServicesTableProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string;
  }

const ServicesTable: React.FC<ServicesTableProps> = ({ isOpen, onClose, serviceId }) => {
    const [service, setService] = useState<Service>(
        {
            id: "",
            items: [{
                id: "",
                name: "",
                observation: "",
                item_quantity: 0,
            }],
            status: "",
            total_price: 0,
            is_paid: false,
            estimated_completion_date: "",
            client_first_name: "",
            client_last_name: ""
        }
    );

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
        if (isOpen) {
            const fetchService = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/services/${serviceId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setService(data.service);
                } catch (error) {
                    console.error('There was a problem with your fetch operation:', error);
                }
            };
            fetchService()
        }
    }, [isOpen, serviceId]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.serviceCardContainer}>
            <button onClick={onClose}>Close</button>
            {service && (
                <div>
                    <div>
                        <h1>Cliente: {`${service?.client_first_name} ${service?.client_last_name}`}</h1>
                        <p>Contato: (24) 99854-8386</p>
                        <p>Endereço: Avenida Nilo Peçanha, 1010</p>
                    </div>
                    <div className={styles.serviceItems}>
                        {
                            service.items.map((item) => (
                                <div key={item.id}>
                                    <h2>{item.name}</h2>
                                    <p>x{item.item_quantity}</p>
                                </div>
                            ))
                        }


                    </div>

                    <div className={styles.price}>
                        <h2>Total</h2>
                        <p>{formatPrice(service.total_price)}</p>
                    </div>

                    <div className={styles.serviceButtons}>
                        <button className={styles.editButton}>EDITAR</button>
                        <button className={styles.deleteButton}>EXCLUIR</button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ServicesTable;
