import { ChangeEventHandler, useEffect, useState } from 'react';
import { AlertTriangle, X } from 'react-feather'
import Switch from 'react-switch';

import styles from './ServiceDetails.module.css'
import UpdateServiceForm from './UpdateServiceForm';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_APP_PORT = process.env.NEXT_PUBLIC_APP_PORT;

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
    completed_at: Date | null | string;
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
    onUpdateStatus: (updatedServiceId: string, newStatus: string) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ isOpen, onClose, serviceId, onUpdateStatus }) => {
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
            completed_at: null,
        }
    );
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const statusOptions = ['Separado', 'Lavando', 'Secando', 'Passando', 'Finalizado'];

    const getFilledWidth = (currentStatus: string) => {
        const numberOfSteps = statusOptions.length;
        const currentStatusIndex = statusOptions.findIndex(status => status === currentStatus);
        // Calculate the width as a percentage of the progress bar
        const width = (currentStatusIndex / (numberOfSteps - 1)) * 100 + '%';
        return width;
    };


    const isStatusFilled = (currentStatus: string, statusOption: string) => {
        const currentStatusIndex = statusOptions.indexOf(currentStatus);
        const statusOptionIndex = statusOptions.indexOf(statusOption);
        return currentStatusIndex >= statusOptionIndex;
    };

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
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            console.error('No token found, please login first');
            return;
        }

        const response = await fetch(`${NEXT_PUBLIC_APP_URL}:${NEXT_PUBLIC_APP_PORT}/services/${serviceId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
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

    const handleStatusChange = async (newStatus: string) => {
        const updatedServiceData = {
            ...service,
            status: newStatus,
            completed_at: newStatus === 'Finalizado' ? new Date().toISOString() : null,
        };

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            console.error('No token found, please login first');
            return;
        }

        try {
            const response = await fetch(`${NEXT_PUBLIC_APP_URL}:${NEXT_PUBLIC_APP_PORT}/services/${service.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedServiceData),
            });

            if (!response.ok) {
                throw new Error('Failed to update the service status');
            }

            // Update the local state to reflect the new status and completed_at date
            setService(updatedServiceData);
            onUpdateStatus(serviceId, newStatus); // Assuming you have some logic to handle UI update
        } catch (error) {
            console.error('Error updating service status:', error);
        }
    };


    const handleTogglePaidStatus = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedServiceData = {
            ...service,
            is_paid: event.target.checked,
        };

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            console.error('No token found, please login first');
            return;
        }

        try {
            const response = await fetch(`${NEXT_PUBLIC_APP_URL}:${NEXT_PUBLIC_APP_PORT}/services/${service.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedServiceData),
            });

            if (!response.ok) {
                throw new Error('Failed to update payment status');
            }

            // Update local state to reflect the new payment status
            setService(updatedServiceData);
            // Optionally: Show a success message or update the service list
        } catch (error) {
            console.error('Error updating payment status:', error);
            // Optionally: Show an error message
        }
    };

    useEffect(() => {
        if (isOpen) {
            const fetchService = async () => {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                if (!token) {
                    console.error('No token found, please login first');
                    return;
                }

                try {
                    const response = await fetch(`${NEXT_PUBLIC_APP_URL}:${NEXT_PUBLIC_APP_PORT}/services/${serviceId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
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
                                <div className={styles.paymentToggleContainer}>
                                    <span>Pagamento: </span>
                                    <input
                                        type="checkbox"
                                        id="paidStatusCheckbox"
                                        checked={service.is_paid}
                                        onChange={handleTogglePaidStatus}
                                        className={styles.customCheckbox}
                                    />
                                    <label htmlFor="paidStatusCheckbox" className={styles.checkboxLabel}></label>
                                </div>


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
                            <div className={styles.statusProgress}>
                                <div className={styles.statusProgressFilled} style={{ width: getFilledWidth(service.status) }}></div>
                                {statusOptions.map((statusOption, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.statusButton} ${service.status === statusOption ? styles.activeStatus : ''} ${isStatusFilled(service.status, statusOption) ? styles.filledStatus : ''}`}
                                        onClick={() => handleStatusChange(statusOption)}
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

export default ServiceDetail;
