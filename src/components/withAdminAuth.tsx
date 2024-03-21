import { ComponentType, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAdminAuthComponent = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { setRole } = useContext(AuthContext); // Assuming you have a setter for role in your context

    useEffect(() => {
      const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
        ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
        : process.env.NEXT_PUBLIC_APP_URL;

      const verifyAuth = async () => {
        const response = await fetch(`${baseUrl}/api/auth/status`, {
          credentials: 'include', // Necessary to include the HTTP-only cookie
        });

        if (!response.ok) {
          // Handle error or redirect if the endpoint call was unsuccessful
          router.replace('/login'); // Redirect to login page
          return;
        }

        const data = await response.json();

        if (data.role !== "Admin") {
          router.replace('/'); // Redirect if not admin
        } else {
          setRole(data.role); // Update role in AuthContext
          setIsLoading(false); // Authentication check completed
        }
      };

      verifyAuth();
    }, [router, setRole]);

    if (isLoading) {
      return <div>Loading...</div>; // Or any other loading indicator
    }

    return <WrappedComponent {...props} />;
  };

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAdminAuthComponent.displayName = `withAdminAuth(${wrappedComponentName})`;

  return WithAdminAuthComponent;
};

export default withAdminAuth;
