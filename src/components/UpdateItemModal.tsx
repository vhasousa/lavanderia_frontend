import React, { useState, useEffect } from 'react';
import { CreateItem } from '../models';

import styles from './UpdateItemModal.module.css'
import { toast } from 'react-toastify';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_APP_PORT = process.env.NEXT_PUBLIC_APP_PORT;

interface ItemsProps {
  isOpen: boolean;
  itemId: string;
  onClose: () => void;
  onItemUpdated: () => void;
}

const UpdateItemModal: React.FC<ItemsProps> = ({ isOpen, itemId, onClose, onItemUpdated }) => {
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
    e.preventDefault()

    const finalFormData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
      ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
      : process.env.NEXT_PUBLIC_APP_URL;

    const response = await fetch(`${baseUrl}/items/${itemId}`, {
      method: 'PUT',
      credentials: 'include', // Include credentials to ensure cookies are sent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalFormData), // Usa finalFormData aqui
    });

    if (response.ok) {
      toast.success("Item atualizado com sucesso!")
      onItemUpdated();
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

  useEffect(() => {
    if (isOpen) {
      const fetchClient = async () => {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
            ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
            : process.env.NEXT_PUBLIC_APP_URL;

          const response = await fetch(`${baseUrl}/items/${itemId}`);
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
            <button type="submit" className={styles.registerItemButton}>Atualizar item</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemModal;
