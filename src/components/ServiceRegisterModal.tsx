import Select from 'react-select';

import React, { useState, useEffect } from 'react';
import { LaundryService, Client, Item } from '../models';

import styles from './ServiceRegisterModal.module.css'
import { toast } from 'react-toastify';

interface ServicesProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceRegistered: () => void;
}

type SelectOption = {
  value: string;
  label: string;
};


const ServiceRegisterModal: React.FC<ServicesProps> = ({ isOpen, onClose, onServiceRegistered }) => {

  const [clients, setClients] = useState<SelectOption[]>([]);
  const [items, setItems] = useState<SelectOption[]>([]);
  const [selectedItems, setSelectedItems] = useState<Array<{ laundry_item_id: string; item_quantity: number }>>([]);
  const [selectedItemsWithOptions, setSelectedItemsWithOptions] = useState<Array<{ laundry_item_id: string; item_quantity: number; selectedOption: SelectOption | null }>>([]);
  const [formData, setFormData] = useState<LaundryService>({
    estimated_completion_date: '',
    is_weight: false,
    is_piece: false,
    weight: 0,
    client_id: '',
    items: [],
    is_monthly: false,
  });

  const fetchClients = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
      ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
      : process.env.NEXT_PUBLIC_APP_URL;

    const response = await fetch(`${baseUrl}/clients`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    const responseClients: Client[] = data.clients
    const clientOptions: SelectOption[] = responseClients.map(client => ({
      value: client.id.toString(),
      label: `${client.first_name} ${client.last_name}`
    }));
    setClients(clientOptions);
  };

  const fetchItems = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
      ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
      : process.env.NEXT_PUBLIC_APP_URL;

    const response = await fetch(`${baseUrl}/items`);
    const data = await response.json();
    const responseItems: Item[] = data.items
    const itemOptions: SelectOption[] = responseItems.map(item => ({
      value: item.id.toString(),
      label: `${item.name}`
    }));
    setItems(itemOptions);
  };

  const addItem = () => {
    setSelectedItemsWithOptions(prevItems => [
      ...prevItems,
      { laundry_item_id: '', item_quantity: 1, selectedOption: null }
    ]);
  };

  const removeItem = (indexToRemove: number) => {
    setSelectedItemsWithOptions(prevItems =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );
  };

  const handleQuantityBlur = (index: number, value: string) => {
    const newItems = [...selectedItems];
    const convertedValue = value === '' ? 1 : parseInt(value, 10);
    newItems[index] = { ...newItems[index], item_quantity: isNaN(convertedValue) ? 1 : convertedValue };
    setSelectedItems(newItems);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'weight') {
      const weightFloat = parseFloat(value);
      setFormData(prev => ({ ...prev, [name]: weightFloat }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const serviceType = e.target.value;
    setFormData(prev => ({
      ...prev,
      is_weight: serviceType === 'weight',
      is_monthly: serviceType === 'monthly',
      is_piece: serviceType === 'piece',
      weight: serviceType === 'weight' ? prev.weight : 0,
    }));
  };

  const handleClientSelectChange = (selectedOption: SelectOption | null) => {
    setFormData(prev => ({
      ...prev,
      client_id: selectedOption ? selectedOption.value : ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.client_id) {
      toast.error('Por favor, selecione um cliente!');
      return;
    }

    if (formData.is_weight && formData.weight <= 0) {
      toast.error('Por favor, informe o peso!');
      return;
    }

    const estimatedCompletionDate = new Date(formData.estimated_completion_date);
    if (estimatedCompletionDate <= new Date()) {
      toast.error('A data de entrega estimada não pode ser data no passado');
      return;
    }

    if (selectedItemsWithOptions.some(item => !item.selectedOption || item.item_quantity <= 0)) {
      toast.error('Garanta que existem itens selecionados e possuem quantidade válida');
      return;
    }

    const itemsToSend = selectedItemsWithOptions.map(item => ({
      laundry_item_id: item.selectedOption ? item.selectedOption.value : '',
      item_quantity: item.item_quantity,
    }));

    const finalFormData = {
      ...formData,
      items: itemsToSend
    };

    if (finalFormData.estimated_completion_date) {
      const localDateTime = new Date(finalFormData.estimated_completion_date);

      const utcDateTime = new Date(localDateTime.getTime() + localDateTime.getTimezoneOffset() * 60000);

      finalFormData.estimated_completion_date = utcDateTime.toISOString();
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
      ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
      : process.env.NEXT_PUBLIC_APP_URL;

    const response = await fetch(`${baseUrl}/services`, {
      method: 'POST',
      credentials: 'include', // Include credentials to ensure cookies are sent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData),
    });
    if (response.ok) {
      onServiceRegistered();
      resetForm();
      toast.success("Serviço cadastrado com sucesso!")
    } else {
      try {
        const errorResponse = await response.json();
        if (errorResponse.error === "Validation failed") {
          toast.error(errorResponse.details.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSelectedItemSelectChange = (index: number, selectedOption: SelectOption | null) => {
    setSelectedItemsWithOptions(prevItems =>
      prevItems.map((item, idx) => idx === index ? { ...item, selectedOption } : item)
    );
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

  const resetForm = () => {
    setFormData({
      estimated_completion_date: '',
      is_weight: false,
      is_piece: false,
      weight: 0,
      client_id: '',
      items: [],
      is_monthly: false,
    });
    setSelectedItems([]);
    setSelectedItemsWithOptions([]);
  };

  useEffect(() => {
    fetchClients();
    fetchItems();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.serviceRegisterContainer} onClick={onClose}>
      <div className={styles.serviceRegisterContent} onClick={e => e.stopPropagation()}>
        <div className={styles.serviceRegisterTitle}>
          <h1>Cadastrar serviço</h1>
          <button onClick={onClose} className={styles.close}>X</button>
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
                    options={items}
                    onChange={(selectedOption: SelectOption | null) => handleSelectedItemSelectChange(index, selectedOption)}
                    value={item.selectedOption}
                    placeholder="Selecione um item"
                    isClearable
                    isSearchable
                  />
                  <input
                    type="number"
                    name={`item_quantity_${index}`}
                    value={item.item_quantity}
                    placeholder="1"
                    onChange={e => handleItemQuantityChange(index, e.target.value)}
                    onBlur={e => handleQuantityBlur(index, e.target.value)}
                  />
                  <button type="button" onClick={() => removeItem(index)}>
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
                <input type="radio" name="service_type" value="monthly" checked={formData.is_monthly} onChange={handleServiceTypeChange} />
                Mensal
              </label>
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
            <button type="submit" className={styles.registerServiceButton}>Cadastrar Serviço</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceRegisterModal;
