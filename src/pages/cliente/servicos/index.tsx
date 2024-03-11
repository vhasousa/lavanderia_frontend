import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import ServicesTable from '@/components/ServicesTable';

const ClientServicesPage = () => {
  const router = useRouter();
  const { userID } = useContext(AuthContext);

  return (
    <div>
      <ServicesTable />
    </div>
  );
};

export default ClientServicesPage;
