import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/router';

// Define a generic type for the HOC that can accept any component props
const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.replace('/');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuthComponent.displayName = `withAuth(${wrappedComponentName})`;

  return WithAuthComponent;
};

export default withAuth;
