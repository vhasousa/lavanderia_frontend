import { useEffect, useState } from 'react';

import { AlertTriangle, ArrowLeft, ArrowRight, Edit, Trash2 } from 'react-feather'

import styles from './ItemsTable.module.css'
import UpdateItemModal from './UpdateItemModal';

interface Item {
  id: string;
  name: string
  price: number
}

interface ItemsResponse {
  items: Item[];
  page: number;
  total_pages: number;
}

interface ItemsTableProps {
  updateTrigger: number; // This prop will be used to trigger updates in the table
}


const ItemsTable: React.FC<ItemsTableProps> = ({ updateTrigger }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageInput, setPageInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  const openModal = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  useEffect(() => {
    // Function to fetch items data
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/items?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ItemsResponse = await response.json();
        setItems(data.items ?? []);
        setTotalPages(data.total_pages)
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchItems();
  }, [updateTrigger, currentPage]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleItemUpdated = () => {
    closeModal();
    // Logic to handle what happens after an item is updated, such as refetching items
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const jumpToPage = () => {
    const pageNumber = parseInt(pageInput, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
      setPageInput(''); // Reset the input if the value is invalid
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      jumpToPage(); // Call jumpToPage when user presses Enter
    }
  };

  const handleItemDelete = async () => {
    const response = await fetch(`http://localhost:8080/items/${itemId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await handleItemDelete(); // Call your existing delete function
      setIsDeleteConfirmationOpen(false); // Close confirmation modal on successful delete
      location.reload(); // Reload the page
    } catch (error) {
      console.error('Error deleting service:', error);
      setIsDeleteConfirmationOpen(false); // Close confirmation modal on error
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false); // Close confirmation modal without deleting
  };

  const initiateDelete = (itemId: string) => {
    setItemId(itemId);
    setIsDeleteConfirmationOpen(true);
  };

  return (
    <>
      <table className={styles.itemTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Preço Unitário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td onClick={() => openModal(item.id)}>
                  {`${item.name}`}
                </td>
                <td>{formatPrice(item.price)}</td>
                <td className={styles.actionsButton}>
                  <Edit className={styles.editButton} onClick={() => openModal(item.id)} />
                  <Trash2 className={styles.deleteButton} onClick={() => initiateDelete(item.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>Nenhum cliente cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className={styles.paginationContainer}>
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1 || items.length === 0}>
            <ArrowLeft className={styles.arrowLeftIcon} />
          </button>
          <span>{currentPage} de {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages || items.length === 0}>
            <ArrowRight />
          </button>
        </div>
        {items.length > 0 && (
          <div className={styles.paginationSearch}>
            <input
              type="text"
              value={pageInput}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              placeholder="Ir para"
            />
            <button onClick={jumpToPage}>Ir</button>
          </div>
        )}
      </div>

      {isDeleteConfirmationOpen && (
        <div className={styles.confirmationModal}>
          <div className={styles.confirmationModalContent}>
            <AlertTriangle className={styles.iconWarning} size={48} /> {/* Warning icon */}
            <p>Tem certeza que deseja excluir este item?</p>
          </div>
          <button className={`${styles.confirmationButton} ${styles.confirmButton}`} onClick={handleConfirmDelete}>SIM</button>
          <button className={`${styles.confirmationButton} ${styles.cancelButton}`} onClick={handleCloseDeleteConfirmation}>NÃO</button>
        </div>
      )}

      <UpdateItemModal
        isOpen={isModalOpen}
        itemId={selectedItemId}
        onClose={closeModal}
        onItemRegistered={handleItemUpdated}
      />
    </>
  );

};

export default ItemsTable;
