import Select from 'react-select';

import { Client } from '@/models';
import { useState, FormEvent, useEffect } from 'react';

import styles from './UpdateServiceForm.module.css'
import { X } from 'react-feather';
import { toast } from 'react-toastify';

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
    is_weight: boolean;
    weight: number;
    is_piece: boolean;
    estimated_completion_date: string
    client_id: string
    client_first_name: string
    client_last_name: string
    completed_at: string
}

// Assuming the structure of an item used in 'selectedItemsWithOptions'
interface SelectedItemWithOption {
    laundry_item_id: string;
    item_quantity: number;
    selectedOption: SelectOption | null;
    isFromService: boolean;
}

type SelectOption = {
    value: string;
    label: string;
};

interface EditServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string;
    onServiceRegistered: () => void;
}

const UpdateServiceForm: React.FC<EditServiceModalProps> = ({ isOpen, onClose, serviceId, onServiceRegistered }) => {
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
            is_weight: false,
            weight: 0,
            is_piece: false,
            estimated_completion_date: "",
            client_id: "",
            client_first_name: "",
            client_last_name: "",
            completed_at: "",
        }
    );
    const [formData, setFormData] = useState({
        status: service.status,
        client_id: service.client_id,
        items: service.items,
        estimated_completion_date: service.estimated_completion_date,
        is_weight: service.is_weight,
        is_piece: service.is_piece,
        is_paid: service.is_paid,
        completed_at: service.completed_at,
        weight: service.weight,
    });
    const [clients, setClients] = useState<SelectOption[]>([]);
    const [selectedItemsWithOptions, setSelectedItemsWithOptions] = useState<Array<SelectedItemWithOption>>([]);
    const [items, setItems] = useState<Item[]>([]);

    // Função para carregar clientes e converter para o formato esperado por react-select
    const fetchClients = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            console.error('No token found, please login first');
            return;
        }
        const response = await fetch('http://localhost:8080/clients', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json(); // Supondo que `Client` seja o tipo dos seus clientes
        const responseClients: Client[] = data.clients
        const clientOptions: SelectOption[] = responseClients.map(client => ({
            value: client.id.toString(), // Garante que o valor seja uma string
            label: `${client.first_name} ${client.last_name}` // Ajuste conforme necessário
        }));
        setClients(clientOptions);
    };

    const fetchItems = async () => {
        const response = await fetch('http://localhost:8080/items');
        const data = await response.json();
        setItems(data.items);
    };

    const convertDate = (date: string) => {
        // Converte o campo de data e hora de string para um objeto Date
        const localDateTime = new Date(date);

        // Compensa o fuso horário local para obter o tempo UTC
        const utcDateTime = new Date(localDateTime.getTime() + localDateTime.getTimezoneOffset() * 60000);

        // Formata a data e hora para o formato ISO 8601 UTC
        date = utcDateTime.toISOString();

        return date
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const servicePayload = {
            client_id: formData.client_id,
            estimated_completion_date: convertDate(formData.estimated_completion_date),
            is_piece: formData.is_piece,
            is_weight: formData.is_weight,
            weight: formData.weight,
            status: formData.status,
            is_paid: formData.is_paid,
            completed_at: formData.completed_at
        };

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            console.error('No token found, please login first');
            return;
        }

        // Send PATCH request to update service details
        const serviceResponse = await fetch(`http://localhost:8080/services/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servicePayload),
        });

        if (!serviceResponse.ok) {
            // Handle error
            console.log(serviceResponse)
            console.error('Failed to update service details');

            try {
                const errorResponse = await serviceResponse.json();
                if (errorResponse.error === "Validation failed") {
                    toast.error(errorResponse.details.message);
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } else {
            toast.success("Serviço atualizado com sucesso!")
        }

        const newItems = selectedItemsWithOptions
            .filter(item => !item.isFromService) // Filter out items that are from the service
            .map(item => ({
                laundry_item_id: item.laundry_item_id || (item.selectedOption ? item.selectedOption.value : ''), // Fallback to selectedOption if laundry_item_id is empty
                item_quantity: item.item_quantity,
                observation: ""
            }));

        if (newItems.length > 0) {
            const itemsResponse = await fetch(`http://localhost:8080/services/${serviceId}/items`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: newItems }),
            });

            if (!itemsResponse.ok) {
                // Handle error
                console.error('Failed to add new items');
            }
        }

        onServiceRegistered()
    };

    // Função para lidar com a mudança de seleção do cliente
    const handleClientSelectChange = (selectedOption: SelectOption | null) => {
        setFormData(prev => ({
            ...prev,
            client_id: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleSelectedItemSelectChange = (index: number, selectedOption: SelectOption | null) => {
        const newSelectedItemsWithOptions = [...selectedItemsWithOptions];
        newSelectedItemsWithOptions[index] = {
            ...newSelectedItemsWithOptions[index],
            selectedOption,
            laundry_item_id: selectedOption ? selectedOption.value : '', // Ensure this line correctly assigns the ID
        };
        setSelectedItemsWithOptions(newSelectedItemsWithOptions);
    };


    const handleItemQuantityChange = (index: number, value: string) => {
        const newSelectedItemsWithOptions = [...selectedItemsWithOptions];
        const convertedValue = value === '' ? 1 : parseInt(value, 10);
        newSelectedItemsWithOptions[index] = {
            ...newSelectedItemsWithOptions[index],
            item_quantity: isNaN(convertedValue) ? 1 : convertedValue
        };
        setSelectedItemsWithOptions(newSelectedItemsWithOptions);
    };

    const updateItemQuantity = async (serviceId: string, itemId: string, newQuantity: number) => {
        const payload = {
            item_quantity: newQuantity
        };

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            console.error('No token found, please login first');
            return;
        }

        const response = await fetch(`http://localhost:8080/services/${serviceId}/items/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            // If the API call was successful, you might want to update the local state or UI accordingly
            console.log('Item quantity updated successfully');
        } else {
            // Handle API call failure (e.g., show an error message)
            console.error('Failed to update item quantity');
        }
    };


    const removeItem = async (indexToRemove: number, serviceId: string, serviceItemID: string) => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            console.error('No token found, please login first');
            return;
        }

        const response = await fetch(`http://localhost:8080/services/${serviceId}/items/${serviceItemID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // If the API call was successful, remove the item from the UI
            setSelectedItemsWithOptions(prevItems =>
                prevItems.filter((item, index) => index !== indexToRemove)
            );
        } else {
            // Handle API call failure (e.g., show an error message)
            console.error('Failed to remove item');
        }
    };

    const addItem = () => {
        setSelectedItemsWithOptions(prevItems => [
            ...prevItems,
            { laundry_item_id: '', item_quantity: 1, selectedOption: null, isFromService: false }
        ]);
    };

    // Função genérica para lidar com mudanças nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Verifica se o campo alterado é o campo de peso
        if (name === 'weight') {
            // Converte o valor do campo de peso para float e atualiza o formData
            const weightFloat = parseFloat(value);
            setFormData(prev => ({ ...prev, [name]: weightFloat }));
        } else {
            // Para outros campos, apenas atualiza o valor diretamente
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Função específica para lidar com a mudança do tipo de serviço (por peso ou por peça)
    const handleServiceTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const serviceType = e.target.value;
        setFormData(prev => ({
            ...prev,
            is_weight: serviceType === 'weight',
            is_piece: serviceType === 'piece',
            weight: serviceType === 'weight' ? prev.weight : 0, // Reset weight if not 'weight' type
        }));
    };

    const convertUTCDateToLocalDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are 0-based, add 1 to get the correct month
        const day = (`0${date.getDate()}`).slice(-2);
        const hours = (`0${date.getHours()}`).slice(-2);
        const minutes = (`0${date.getMinutes()}`).slice(-2);

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    useEffect(() => {
        const fetchService = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            if (!token) {
                console.error('No token found, please login first');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/services/${serviceId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                setService(data.service);

                setFormData(prevFormData => ({
                    ...prevFormData,
                    client_id: data.service.client_id,
                    estimated_completion_date: convertUTCDateToLocalDate(data.service.estimated_completion_date),
                    is_weight: data.service.is_weight, // Assuming you have a way to determine this from service data
                    is_piece: data.service.is_piece, // Assuming you have a way to determine this from service data
                    weight: data.service.weight,
                    status: data.service.status,
                    items: data.service.items,
                    is_paid: data.service.is_paid, // Assuming you have a way to determine this from service data
                    completed_at: data.service.completed_at, // Assuming you have a way to determine this from service data
                }));


                // Transform and set selectedItemsWithOptions
                const transformedItems: SelectedItemWithOption[] = data.service.items.map((serviceItem: Item) => {
                    return {
                        laundry_item_id: serviceItem.id,
                        item_quantity: serviceItem.item_quantity,
                        selectedOption: { value: serviceItem.id, label: serviceItem.name },
                        isFromService: true,
                    };
                });
                setSelectedItemsWithOptions(transformedItems);
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        };
        fetchService()
        fetchClients();
        fetchItems();
    }, [serviceId]);

    if (!isOpen) return null;

    return (
        <div className={styles.serviceRegisterContainer}>
            <div className={styles.serviceRegisterContent} onClick={e => e.stopPropagation()}>
                <div className={styles.serviceRegisterTitle}>
                    <h1>Atualizar serviço</h1>
                    <button onClick={onClose}><X /></button>
                </div>
                <div className={styles.serviceRegisterFormContainer}>
                    <form onSubmit={handleSubmit} className={styles.serviceRegisterForm}>
                        <div>
                            <label htmlFor="client_id">Cliente:</label>
                            <Select
                                id="client_id"
                                name="client_id"
                                options={clients}
                                onChange={handleClientSelectChange}
                                value={clients.find(option => option.value === formData.client_id)}
                                placeholder="Selecione um cliente"
                                isClearable
                                isSearchable
                            />
                        </div>

                        {
                            selectedItemsWithOptions.map((item, index) => (
                                <div key={index} className={styles.itemContent}>
                                    <Select
                                        name={`selected_item_${index}`}
                                        options={items.map(it => ({ value: it.id, label: it.name }))}
                                        onChange={(selectedOption: SelectOption | null) => handleSelectedItemSelectChange(index, selectedOption)}
                                        value={item.selectedOption}
                                        placeholder="Selecione um item"
                                        isSearchable
                                        isClearable={!item.isFromService} // Prevent clearing if the item is from the service
                                        isDisabled={item.isFromService} // Disable selection if the item is from the service
                                    />
                                    <input
                                        type="number"
                                        name={`item_quantity_${index}`}
                                        value={item.item_quantity}
                                        placeholder="1"
                                        onChange={e => handleItemQuantityChange(index, e.target.value)}
                                        onBlur={e => {
                                            if (item.isFromService) { // Only update if the item is from the service
                                                updateItemQuantity(serviceId, item.laundry_item_id, parseInt(e.target.value, 10));
                                            }
                                        }}
                                    />
                                    <button type="button" onClick={() => removeItem(index, serviceId, item.laundry_item_id)}>
                                        X
                                    </button>
                                </div>
                            ))
                        }

                        <button type="button" onClick={addItem} className={styles.addItemButton}>+ Adicionar Item</button>

                        <div className={styles.serviceRegisterFormDate}>
                            <label htmlFor="estimated_completion_date">Data Estimada de Conclusão:</label>
                            <input type="datetime-local" id="estimated_completion_date" name="estimated_completion_date" required onChange={handleChange} value={formData.estimated_completion_date} />
                        </div>

                        <div className={styles.serviceRegisterType}>
                            <label>
                                <input type="radio" name="service_type" value="weight" checked={formData.is_weight} onChange={handleServiceTypeChange} />
                                Por Peso
                            </label>
                            <label>
                                <input type="radio" name="service_type" value="piece" checked={formData.is_piece} onChange={handleServiceTypeChange} />
                                Por Peça
                            </label>

                            {formData.is_weight && (
                                <div>
                                    <label htmlFor="weight">Peso (Kg):</label>
                                    <input type="number" id="weight" name="weight" min="0" step="0.01" onChange={handleChange} value={formData.weight} />
                                </div>
                            )}
                        </div>
                        <button type="submit" className={styles.registerServiceButton}>Atualizar Serviço</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateServiceForm;
