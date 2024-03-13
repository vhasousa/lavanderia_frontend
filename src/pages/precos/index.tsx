import { useEffect, useState } from 'react';

import { ArrowLeft, ArrowRight } from 'react-feather'

import styles from '../../styles/precos/Prices.module.css'
import { Header } from '@/components/HomeHeader';
import { Footer } from '@/components/Footer';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_APP_PORT = process.env.NEXT_PUBLIC_APP_PORT;

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


const Prices: React.FC<ItemsTableProps> = ({ updateTrigger }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageInput, setPageInput] = useState('');

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
        const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
          ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
          : process.env.NEXT_PUBLIC_APP_URL;

        const response = await fetch(`${baseUrl}/items?page=${currentPage}`);
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

  return (
    <>
      <Header />
      <div className={styles.pricesContainer}>
        <table className={styles.itemTable}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Preço Unitário</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {`${item.name}`}
                  </td>
                  <td>{formatPrice(item.price)}</td>
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
      </div>
      <Footer />
    </>
  );

};

export default Prices;
