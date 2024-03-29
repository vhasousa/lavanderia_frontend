import Select from 'react-select';

import React, { useState, useEffect } from 'react';
import { LaundryService, Item, CreateClient } from '../models';

import styles from './ClientRegisterModal.module.css'
import { toast } from 'react-toastify';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_APP_PORT = process.env.NEXT_PUBLIC_APP_PORT;

interface ClientsProps {
  isOpen: boolean;
  clientId: string;
  onClose: () => void;
  onClientUpdate: () => void;
}

type SelectOption = {
  value: string;
  label: string;
};

const stateOptions: SelectOption[] = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' },
];

const UpdateClientModal: React.FC<ClientsProps> = ({ isOpen, clientId, onClose, onClientUpdate }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState<CreateClient>({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    is_monthly: false,
    street: "",
    city: "",
    state: "",
    postal_code: "",
    number: "",
    complement: "",
    landmark: "",
    monthly_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {

      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleStateChange = (selectedOption: SelectOption | null) => {
    setSelectedState(selectedOption);
    if (selectedOption) {
      setFormData(prev => ({ ...prev, state: selectedOption.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalFormData = {
      ...formData,
    };

    const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
      ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
      : process.env.NEXT_PUBLIC_APP_URL;

    const response = await fetch(`${baseUrl}/clients/${clientId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData),
    });
    if (response.ok) {
      toast.success("Cliente atualizado com sucesso!")
      onClientUpdate();
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, monthly_date: value }));
  };

  useEffect(() => {
    if (isOpen) {
      const fetchClient = async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
            ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
            : process.env.NEXT_PUBLIC_APP_URL;

          const response = await fetch(`${baseUrl}/clients/${clientId}`, {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          const complementValue = data.complement.Valid ? data.complement.String : "";
          const landmarkValue = data.landmark.Valid ? data.landmark.String : "";

          const defaultMonthlyDate = data.is_monthly ? new Date(data.monthly_date.Time).toISOString().split('T')[0] : "";

          setFormData({
            ...data,
            complement: complementValue,
            landmark: landmarkValue,
            monthly_date: defaultMonthlyDate,
          });

          const clientStateOption = stateOptions.find(option => option.value === data.state) ?? null;
          setSelectedState(clientStateOption);
        } catch (error) {
          console.error('There was a problem with your fetch operation:', error);
        }
      };
      setIsClosing(false);
      fetchClient();
    }
  }, [isOpen, clientId, updateTrigger]);


  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.clientRegisterContainer}>
      <div className={styles.clientRegisterContent} onClick={e => e.stopPropagation()}>
        <div className={styles.clientRegisterTitle}>
          <h1>Atualizar cliente</h1>
          <button className={styles.close} onClick={onClose}>X</button>
        </div>
        <div className={styles.clientRegisterFormContainer}>
          <form onSubmit={handleSubmit} className={styles.clientRegisterForm}>
            <div>
              <label htmlFor="first_name">Nome:</label>
              <input type="text" id="first_name" name="first_name" required onChange={handleChange} value={formData.first_name} />
            </div>
            <div>
              <label htmlFor="last_name">Sobrenome:</label>
              <input type="text" id="last_name" name="last_name" required onChange={handleChange} value={formData.last_name} />
            </div>
            <div>
              <label htmlFor="username">Nome de usuário:</label>
              <input type="text" id="username" name="username" required onChange={handleChange} value={formData.username} />
            </div>
            <div>
              <label htmlFor="phone">Telefone:</label>
              <input type="text" id="phone" name="phone" required onChange={handleChange} value={formData.phone} />
            </div>
            <div>
              <label htmlFor="street">Logradouro:</label>
              <input type="text" id="street" name="street" required onChange={handleChange} value={formData.street} />
            </div>
            <div>
              <label htmlFor="number">Número:</label>
              <input type="text" id="number" name="number" required onChange={handleChange} value={formData.number} />
            </div>
            <div>
              <label htmlFor="complement">Complemento:</label>
              <input type="text" id="complement" name="complement" onChange={handleChange} value={formData.complement} />
            </div>
            <div>
              <label htmlFor="city">Cidade:</label>
              <input type="text" id="city" name="city" required onChange={handleChange} value={formData.city} />
            </div>
            <div>
              <label htmlFor="state">Estado:</label>
              <Select
                id="state"
                options={stateOptions}
                value={selectedState}
                onChange={handleStateChange}
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="state"
                placeholder="Selecione o Estado"
              />
            </div>
            <div>
              <label htmlFor="postal_code">CEP:</label>
              <input type="text" id="postal_code" name="postal_code" required onChange={handleChange} value={formData.postal_code} />
            </div>
            <div>
              <label htmlFor="landmark">Ponto de referência:</label>
              <input type="text" id="landmark" name="landmark" onChange={handleChange} value={formData.landmark} />
            </div>
            <div>
              <label htmlFor="is_monthly">Mensal:</label>
              <input
                type="checkbox"
                id="is_monthly"
                name="is_monthly"
                checked={formData.is_monthly}
                onChange={handleChange}
              />
            </div>
            {formData.is_monthly && (
              <div>
                <label htmlFor="monthly_date">Data Mensal:</label>
                <input type="date" id="monthly_date" name="monthly_date" onChange={handleDateChange} value={formData.monthly_date} />
              </div>
            )}
            <button type="submit" className={styles.registerClientButton}>Atualizar cliente</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClientModal;
