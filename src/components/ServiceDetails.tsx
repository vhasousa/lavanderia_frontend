import { useEffect, useState } from 'react';
import { useService } from '../context/ServiceContext';
import { useRouter } from 'next/router';
import { AlertTriangle, X } from 'react-feather'

import styles from './ServiceDetails.module.css'
import UpdateServiceForm from './UpdateServiceForm';

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

interface ServicesTableProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string;
}

const ServicesTable: React.FC<ServicesTableProps> = ({ isOpen, onClose, serviceId }) => {
    const [updateTrigger, setUpdateTrigger] = useState(0); // Initial value is 0
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
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
            client_last_name: "",
            address_id: "",
            city: "",
            number: "",
            phone: "",
            postal_code: "",
            state: "",
            street: "",
        }
    );
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleClose = () => {
        setIsClosing(true); // Trigger the closing animation
        setTimeout(() => onClose(), 300); // Wait for the animation to finish before closing
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = () => {
        setIsDeleteConfirmationOpen(true); // Show confirmation modal on delete button click
    };

    const handleServiceDelete = async () => {
        const response = await fetch(`http://localhost:8080/services/${serviceId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await handleServiceDelete(); // Call your existing delete function
            setIsDeleteConfirmationOpen(false); // Close confirmation modal on successful delete
            onClose(); // Close the service details modal
            location.reload(); // Reload the page
        } catch (error) {
            console.error('Error deleting service:', error);
            setIsDeleteConfirmationOpen(false); // Close confirmation modal on error
        }
    };

    const handleCloseDeleteConfirmation = () => {
        setIsDeleteConfirmationOpen(false); // Close confirmation modal without deleting
    };

    // Include an onClose handler for the edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
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
            setIsClosing(false);
            fetchService()
        }
    }, [isOpen, serviceId, updateTrigger]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className={`${styles.serviceCardContainer} ${isClosing ? styles.closing : ''}`} onClick={handleClose}>
                <div className={styles.serviceCardContent} onClick={e => e.stopPropagation()}>
                    <div className={styles.buttonContainer}>
                        <div className={styles.serviceButtons}>
                            <button className={styles.editButton} onClick={handleEditClick}>EDITAR</button>
                            <button className={styles.deleteButton} onClick={handleDeleteClick}>EXCLUIR</button>
                        </div>
                        {isDeleteConfirmationOpen && (
                            <div className={styles.confirmationModal}>
                                <div className={styles.confirmationModalContent}>
                                    <AlertTriangle className={styles.iconWarning} size={48} /> {/* Warning icon */}
                                    <p>Tem certeza que deseja excluir este serviço?</p>
                                </div>
                                <button className={`${styles.confirmationButton} ${styles.confirmButton}`} onClick={handleConfirmDelete}>SIM</button>
                                <button className={`${styles.confirmationButton} ${styles.cancelButton}`} onClick={handleCloseDeleteConfirmation}>NÃO</button>
                            </div>
                        )}
                        <button onClick={handleClose} className={styles.close}><X /></button>
                    </div>
                    {service && (
                        <div>
                            <div>
                                <h1>Cliente: {`${service?.client_first_name} ${service?.client_last_name}`}</h1>
                                <p>Contato: {formatarTelefone(service.phone)}</p>
                                <p>Endereço: {`${service.street}, ${service.number}`}</p>
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
                        </div>
                    )}
                </div>
            </div>
            {isEditModalOpen && (
                <UpdateServiceForm
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    serviceId={serviceId}
                    onServiceRegistered={() => setUpdateTrigger(prev => prev + 1)}
                />
            )}
        </>
    );
};

export default ServicesTable;
