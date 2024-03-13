import { useEffect, useState } from 'react';

import styles from './ServiceDetails.module.css';

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
    address_id: string
    street: string
    city: string
    state: string
    postal_code: string
    number: string
    phone: string
}

interface ServiceDetailProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string;
}

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_APP_PORT = process.env.NEXT_PUBLIC_APP_PORT;

const ClientServiceDetail: React.FC<ServiceDetailProps> = ({ isOpen, onClose, serviceId }) => {
    const [service, setService] = useState<Service>({
        id: "",
        items: [],
        status: "",
        total_price: 0,
        is_paid: false,
        estimated_completion_date: "",
        client_first_name: "",
        client_last_name: "",
        address_id: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        number: "",
        phone: "",
    });

    const statusOptions = ['Separado', 'Lavando', 'Secando', 'Passando', 'Finalizado'];

    const getFilledWidth = (currentStatus: string) => {
        const numberOfSteps = statusOptions.length;
        const currentStatusIndex = statusOptions.findIndex(status => status === currentStatus);
        const width = (currentStatusIndex / (numberOfSteps - 1)) * 100 + '%';
        return width;
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options).replace(',', '');
    };

    const formatarTelefone = (numero: string): string => {
        const numeros = numero.replace(/\D/g, '');
        if (numeros.length === 11) {
            return numeros.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2$3-$4');
        } else if (numeros.length === 10) {
            return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return numero;
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    };

    const isStatusFilled = (currentStatus: string, statusOption: string) => {
        const currentStatusIndex = statusOptions.indexOf(currentStatus);
        const statusOptionIndex = statusOptions.indexOf(statusOption);
        return currentStatusIndex >= statusOptionIndex;
    };

    useEffect(() => {
        if (isOpen) {
            const fetchService = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found, please login first');
                    return;
                }
                try {
                    const response = await fetch(`${NEXT_PUBLIC_APP_URL}:${NEXT_PUBLIC_APP_PORT}/services/${serviceId}`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setService(data.service);
                } catch (error) {
                    console.error('There was a problem with your fetch operation:', error);
                }
            };
            fetchService();
        }
    }, [isOpen, serviceId]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`${styles.serviceCardContainer}`} onClick={onClose}>
            <div className={styles.serviceCardContent} onClick={e => e.stopPropagation()}>
                {service && (
                    <div>
                        <div>
                            <h1>Cliente: {`${service?.client_first_name} ${service?.client_last_name}`}</h1>
                            <p>Contato: {formatarTelefone(service.phone)}</p>
                            <p>Endereço: {`${service.street}, ${service.number}`}</p>
                            <p>Pagamento: {service.is_paid ? 'Realizado' : 'Pendente'}</p>
                        </div>
                        <div className={styles.serviceItems}>
                            {service.items.map((item) => (
                                <div key={item.id}>
                                    <h2>{item.name}</h2>
                                    <p>x{item.item_quantity}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.price}>
                            <h2>Total</h2>
                            <p>{formatPrice(service.total_price)}</p>
                        </div>
                        <div className={styles.statusProgress}>
                                <div className={styles.statusProgressFilled} style={{ width: getFilledWidth(service.status) }}></div>
                                {statusOptions.map((statusOption, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.statusButton} ${service.status === statusOption ? styles.activeStatus : ''} ${isStatusFilled(service.status, statusOption) ? styles.filledStatus : ''}`}
                                        data-status={statusOption}
                                    >
                                        <span className={styles.statusIndicator}></span>
                                    </button>
                                ))}
                            </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientServiceDetail;
