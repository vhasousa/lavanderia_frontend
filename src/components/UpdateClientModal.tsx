import Select from 'react-select';

import React, { useState, useEffect } from 'react';
import { LaundryService, Item, CreateClient } from '../models';

import styles from './ClientRegisterModal.module.css'

interface ClientsProps {
  isOpen: boolean;
  clientId: string;
  onClose: () => void;
  onClientRegistered: () => void;
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

const UpdateClientModal: React.FC<ClientsProps> = ({ isOpen, clientId, onClose, onClientRegistered }) => {
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
    landmark: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;  // Type assertion here
    const { name, value, type } = target;

    // Check if the input type is checkbox
    if (type === 'checkbox') {
      // For checkbox, use the 'checked' property to set the value
      setFormData(prev => ({ ...prev, [name]: target.checked }));  // Access 'checked' safely after type assertion
    } else {
      // For other inputs, use the 'value' property
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
      monthly_date: ""
    };

    console.log(finalFormData)

    const response = await fetch(`http://localhost:8080/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData), // Usa finalFormData aqui
    });
    if (response.ok) {
      // Trate o sucesso do envio
      onClientRegistered();

      // Limpa o formulário redefinindo o estado de formData para os valores iniciais
    } else {
      // Trate o erro
    }
  };

  useEffect(() => {
    if (isOpen) {
      const fetchClient = async () => {
        try {
          const response = await fetch(`http://localhost:8080/clients/${clientId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)

          // Check if complement.Valid is true and set accordingly
          const complementValue = data.complement.Valid ? data.complement.String : "";
          const landmarkValue = data.landmark.Valid ? data.landmark.String : "";

          setFormData({
            ...data,
            complement: complementValue, // Set the complement value here
            landmark: landmarkValue, // Set the complement value here
            // Ensure other fields are set correctly, potentially with similar checks for their validity
          });

          // Find and set the state option that matches the fetched client's state
          const clientStateOption = stateOptions.find(option => option.value === data.state) ?? null;
          setSelectedState(clientStateOption);
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
              <input type="checkbox" id="is_monthly" name="is_monthly" onChange={handleChange} />
            </div>
            <button type="submit" className={styles.registerClientButton}>Atualizar cliente</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClientModal;
