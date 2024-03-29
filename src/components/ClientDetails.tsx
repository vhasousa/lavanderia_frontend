import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'react-feather'

import styles from './ClientDetails.module.css'
import UpdateClientModal from './UpdateClientModal';
import { toast } from 'react-toastify';


interface Client {
    id: string;
    first_name: string
    last_name: string
    phone: string
    address_id: string
    street: string
    city: string
    state: string
    postal_code: string
    number: string
    is_monthly: boolean;
    monthly_date?: {
        Time: string;
        Valid: boolean;
    };
}

interface ClientsDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    clientId: string;
    onClientUpdate: () => void;
}

const ClientsTable: React.FC<ClientsDetailsProps> = ({ isOpen, onClose, clientId, onClientUpdate }) => {
    const [updateTrigger, setUpdateTrigger] = useState(0); // Initial value is 0
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [isRenewConfirmationOpen, setIsRenewConfirmationOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [client, setClient] = useState<Client>(
        {
            id: "",
            first_name: "",
            last_name: "",
            address_id: "",
            city: "",
            number: "",
            phone: "",
            postal_code: "",
            state: "",
            street: "",
            is_monthly: false,
            monthly_date: {
                Time: "",
                Valid: true
            }
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

    const handleClientDelete = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
            ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
            : process.env.NEXT_PUBLIC_APP_URL;

        const response = await fetch(`${baseUrl}/clients/${clientId}`, {
            method: 'DELETE',
            credentials: 'include', // Include credentials to ensure cookies are sent
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    }

    const handleConfirmDelete = async () => {
        try {
            await handleClientDelete(); // Call your existing delete function
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
        onClientUpdate();
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        
        const parts = dateString.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
        const day = parseInt(parts[2], 10);
    
        const date = new Date(year, month, day);
    
        return date.toLocaleDateString('pt-BR', options);
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

    const handleRenew = async () => {
        if (client.monthly_date) {
            const currentDate = new Date(client.monthly_date.Time);
            const newDate = new Date(currentDate.setDate(currentDate.getDate() + 30));
            const renewData = {
                renewal_date: newDate
            }

            const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
                ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
                : process.env.NEXT_PUBLIC_APP_URL;

            try {
                const response = await fetch(`${baseUrl}/clients/${clientId}/renew`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(renewData),
                  });

                if (!response.ok) {
                    toast.error("Erro ao renovar mensalidade");
                } else {
                    toast.success("Assinatura atualizada com sucesso!");
                    setClient({ ...client, monthly_date: { ...client.monthly_date, Time: newDate.toISOString() } });
                    setIsRenewConfirmationOpen(false); // Fecha o pop-up após a renovação
                }
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        }
    };


    useEffect(() => {
        if (isOpen) {
            const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
                ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
                : process.env.NEXT_PUBLIC_APP_URL;

            const fetchClient = async () => {
                try {
                    const response = await fetch(`${baseUrl}/clients/${clientId}`, {
                        credentials: 'include', // Include credentials to ensure cookies are sent
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setClient(data);
                } catch (error) {
                    console.error('There was a problem with your fetch operation:', error);
                }
            };
            setIsClosing(false);
            fetchClient()
        }
    }, [isOpen, clientId, updateTrigger]);

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
                    {client && (
                        <div>
                            <div>
                                <h1>Cliente: {`${client.first_name} ${client.last_name}`}</h1>
                                <p>Contato: {formatarTelefone(client.phone)}</p>
                                <p>Endereço: {`${client.street}, ${client.number}`}</p>
                                {client.is_monthly && client.monthly_date && client.monthly_date.Valid && (
                                    <p>Vencimento mensalidade: {formatDate(client.monthly_date.Time)}</p>
                                )}
                                {client.is_monthly && (
                                    <button className={styles.renewButton} onClick={() => setIsRenewConfirmationOpen(true)}>Renovar</button>
                                )}

                                {isRenewConfirmationOpen && (
                                    <div className={styles.confirmationModal}>
                                        <div className={styles.confirmationModalContent}>
                                            <p>Confirma a renovação da assinatura por mais 30 dias?</p>
                                            <button className={styles.confirmationButton} onClick={handleRenew}>Confirmar</button>
                                            <button className={styles.cancelButton} onClick={() => setIsRenewConfirmationOpen(false)}>Cancelar</button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isEditModalOpen && (
                <UpdateClientModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    clientId={clientId}
                    onClientUpdate={() => setUpdateTrigger(prev => prev + 1)}
                />
            )}
        </>
    );
};

export default ClientsTable;
