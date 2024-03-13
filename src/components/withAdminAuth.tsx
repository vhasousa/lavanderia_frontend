import { ComponentType, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

// Define a generic type for the HOC that can accept any component props
const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  // Define a functional component inside your HOC to use Hooks
  const WithAdminAuthComponent = (props: P) => {
    const router = useRouter();
    const { role } = useContext(AuthContext);

    useEffect(() => {
      const token = localStorage.getItem('token');

      // Redirect if no token or not an admin role
      if (!token || role !== "Admin") {
        router.replace('/cliente/servicos');
      }
    }, [router, role]);

    // Render the wrapped component with the provided props
    return <WrappedComponent {...props} />;
  };

  // Set a display name for your higher-order component for easier debugging
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAdminAuthComponent.displayName = `withAdminAuth(${wrappedComponentName})`;

  // Return the functional component from your HOC
  return WithAdminAuthComponent;
};

export default withAdminAuth;
