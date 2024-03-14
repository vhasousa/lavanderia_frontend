import React, { useState, useEffect } from 'react';
import { CreateItem } from '../models';

import styles from './ItemRegisterModal.module.css'
import { toast } from 'react-toastify';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_APP_PORT = process.env.NEXT_PUBLIC_APP_PORT;

interface ItemsProps {
  isOpen: boolean;
  onClose: () => void;
  onItemRegistered: () => void;
}

const ItemRegisterModal: React.FC<ItemsProps> = ({ isOpen, onClose, onItemRegistered }) => {
  const [formData, setFormData] = useState<CreateItem>({
    name: "",
    price: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalFormData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
      ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
      : process.env.NEXT_PUBLIC_APP_URL;

    const response = await fetch(`${baseUrl}/items`, {
      method: 'POST',
      credentials: 'include', // Include credentials to ensure cookies are sent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData), // Usa finalFormData aqui
    });
    if (response.ok) {
      onItemRegistered();
      toast.success("Item cadastrado com sucesso!")

      resetForm();
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

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
    });
  };

  useEffect(() => {
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.itemRegisterContainer} onClick={onClose}>
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

export default ItemRegisterModal;
