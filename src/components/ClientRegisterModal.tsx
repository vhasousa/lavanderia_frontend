import Select from 'react-select';

import React, { useState, useEffect } from 'react';
import { CreateClient } from '../models';

import styles from './ClientRegisterModal.module.css'

interface ClientsProps {
  isOpen: boolean;
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

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_APP_PORT = process.env.NEXT_PUBLIC_APP_PORT;

const ClientRegisterModal: React.FC<ClientsProps> = ({ isOpen, onClose, onClientRegistered }) => {
  const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
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
    };

    console.log(finalFormData)

    const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
      ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
      : process.env.NEXT_PUBLIC_APP_URL;

    const response = await fetch(`${baseUrl}/clients`, {
      method: 'POST',
      credentials: 'include', // Include credentials to ensure cookies are sent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData), // Usa finalFormData aqui
    });
    if (response.ok) {
      // Trate o sucesso do envio
      onClientRegistered();

      // Limpa o formulário redefinindo o estado de formData para os valores iniciais
      resetForm();
    } else {
      // Trate o erro
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, monthly_date: value }));
  };

  const resetForm = () => {
    setFormData({
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
  };

  useEffect(() => {
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.clientRegisterContainer} onClick={onClose}>
      <div className={styles.clientRegisterContent} onClick={e => e.stopPropagation()}>
        <div className={styles.clientRegisterTitle}>
          <h1>Cadastrar cliente</h1>
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
            {formData.is_monthly && (
              <div>
                <label htmlFor="monthly_date">Data Mensal:</label>
                <input type="date" id="monthly_date" name="monthly_date" onChange={handleDateChange} value={formData.monthly_date} />
              </div>
            )}
            <button type="submit" className={styles.registerClientButton}>Cadastrar cliente</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientRegisterModal;
