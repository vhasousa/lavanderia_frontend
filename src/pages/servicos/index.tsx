import Sidebar from '../../components/Sidebar';
import Select from 'react-select'; 

import React, { useState, useEffect } from 'react';
import { LaundryService, Client, Item } from '../../models';

import '../../styles/RegisterService.css'

type SelectOption = {
  value: string;
  label: string;
};

const Servicos = () => {
  const [clients, setClients] = useState<SelectOption[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Array<{ laundry_item_id: string; item_quantity: number }>>([]);
  const [formData, setFormData] = useState<LaundryService>({
    estimated_completion_date: '',
    is_weight: false,
    is_piece: false,
    weight: 0,
    client_id: '',
    items: [],
  });

  const addItem = () => {
    setSelectedItems(prevItems => [...prevItems, { laundry_item_id: '', item_quantity: 1 }]);
  };

  const updateItem = (index: number, field: 'laundry_item_id' | 'item_quantity', value: string) => {
    const newItems = [...selectedItems];

    newItems[index] = { ...newItems[index], [field]: value };
    setSelectedItems(newItems);
  };

  const handleQuantityBlur = (index: number, value: string) => {
    const newItems = [...selectedItems];
    // Converte para número ou usa o valor padrão '1' se estiver vazio ou inválido
    const convertedValue = value === '' ? 1 : parseInt(value, 10);
    newItems[index] = { ...newItems[index], item_quantity: isNaN(convertedValue) ? 1 : convertedValue };
    setSelectedItems(newItems);
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

  // Função para carregar clientes e converter para o formato esperado por react-select
  const fetchClients = async () => {
    const response = await fetch('http://localhost:8080/clients');
    const data: Client[] = await response.json(); // Supondo que `Client` seja o tipo dos seus clientes
    const clientOptions: SelectOption[] = data.map(client => ({
      value: client.id.toString(), // Garante que o valor seja uma string
      label: `${client.first_name} ${client.last_name}` // Ajuste conforme necessário
    }));
    setClients(clientOptions);
  };

  // Função para lidar com a mudança de seleção do cliente
  const handleClientSelectChange = (selectedOption: SelectOption | null) => {
    setFormData(prev => ({
      ...prev,
      client_id: selectedOption ? selectedOption.value : ''
    }));
  };

  const fetchItems = async () => {
    const response = await fetch('http://localhost:8080/items');
    const data = await response.json();
    setItems(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Certifique-se de que formData contém todos os dados atualizados, incluindo selectedItems
    const finalFormData = {
      ...formData,
      items: selectedItems // Garante que os itens selecionados estejam incluídos
    };

    // Verifica se o campo de data e hora está preenchido
    if (finalFormData.estimated_completion_date) {
      // Converte o campo de data e hora de string para um objeto Date
      const localDateTime = new Date(finalFormData.estimated_completion_date);

      // Compensa o fuso horário local para obter o tempo UTC
      const utcDateTime = new Date(localDateTime.getTime() + localDateTime.getTimezoneOffset() * 60000);

      // Formata a data e hora para o formato ISO 8601 UTC
      finalFormData.estimated_completion_date = utcDateTime.toISOString();
    }

    console.log(finalFormData);

    const response = await fetch('http://localhost:8080/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData), // Usa finalFormData aqui
    });
    if (response.ok) {
      // Trate o sucesso do envio

      // Limpa o formulário redefinindo o estado de formData para os valores iniciais
      setFormData({
        estimated_completion_date: '',
        is_weight: false,
        is_piece: false,
        weight: 0,
        client_id: '',
        items: [],
      });

      // Adicional: Se estiver usando campos de entrada controlados, talvez seja necessário limpar o estado de outros campos, como selectedItems
      setSelectedItems([]);
    } else {
      // Trate o erro
    }
  };


  // Carrega clientes e itens na montagem do componente
  useEffect(() => {
    fetchClients();
    fetchItems();

    setFormData(prevFormData => ({
      ...prevFormData,
      items: selectedItems
    }));
  }, [selectedItems]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <h1>Servicos</h1>

      <div style={{ flex: 1, padding: '20px' }}>
        <form onSubmit={handleSubmit} className="service-form">
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

          <div>
            <label htmlFor="estimated_completion_date">Data Estimada de Conclusão:</label>
            <input type="datetime-local" id="estimated_completion_date" name="estimated_completion_date" required onChange={handleChange} value={formData.estimated_completion_date} />
          </div>

          <div>
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

          {
            selectedItems.map((item, index) => (
              <div key={index}>
                <select name="laundry_item_id" required onChange={e => updateItem(index, 'laundry_item_id', e.target.value)}>
                  <option value="">Selecione um item</option>
                  {items.map(it => (
                    <option key={it.id} value={it.id}>{it.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  name="item_quantity"
                  value={item.item_quantity || ''} // Permite que o valor seja vazio
                  placeholder="1" // Mostra '1' como valor padrão, mas apenas como placeholder
                  onChange={e => updateItem(index, 'item_quantity', e.target.value)}
                  onBlur={e => handleQuantityBlur(index, e.target.value)} // Adiciona um manipulador onBlur
                />

              </div>
            ))
          }
          <button type="button" onClick={addItem}>Adicionar Item</button>


          <button type="submit">Cadastrar Serviço</button>
        </form>
      </div>
    </div>
  );
};

export default Servicos;
