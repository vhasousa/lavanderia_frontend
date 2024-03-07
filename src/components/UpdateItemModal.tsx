import React, { useState, useEffect } from 'react';
import { CreateItem } from '../models';

import styles from './UpdateItemModal.module.css'

interface ItemsProps {
  isOpen: boolean;
  itemId: string;
  onClose: () => void;
  onItemRegistered: () => void;
}

const UpdateItemModal: React.FC<ItemsProps> = ({ isOpen, itemId, onClose, onItemRegistered }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState<CreateItem>({
    name: "",
    price: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const finalFormData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (!token) {
        console.error('No token found, please login first');
        return;
      }

    const response = await fetch(`http://localhost:8080/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData), // Usa finalFormData aqui
    });
    if (response.ok) {
      // Trate o sucesso do envio
      onItemRegistered();

      // Limpa o formulário redefinindo o estado de formData para os valores iniciais
    } else {
      // Trate o erro
    }
  };

  useEffect(() => {
    if (isOpen) {
      const fetchClient = async () => {
        try {
          const response = await fetch(`http://localhost:8080/items/${itemId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)

          setFormData(data);

        } catch (error) {
          console.error('There was a problem with your fetch operation:', error);
        }
      };
      setIsClosing(false);
      fetchClient()
    }
  }, [isOpen, itemId, updateTrigger]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.itemRegisterContainer}>
      <div className={styles.itemRegisterContent} onClick={e => e.stopPropagation()}>
        <div className={styles.itemRegisterTitle}>
          <h1>Cadastrar item</h1>
          <button className={styles.close} onClick={onClose}>X</button>
        </div>
        <div className={styles.itemRegisterFormContainer}>
          <form onSubmit={handleSubmit} className={styles.itemRegisterForm}>
            <div>
              <label htmlFor="name">Item:</label>
              <input type="text" id="name" name="name" required onChange={handleChange} value={formData.name} />
            </div>
            <div>
              <label htmlFor="price">Preço Unitário:</label>
              <input type="number" id="price" name="price" required onChange={handleChange} value={formData.price} />
            </div>
            <button type="submit" className={styles.registerItemButton}>Cadastrar item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemModal;
