import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useAuthCheck(allowedRoles: string[]) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    const role = sessionStorage.getItem('role');

    if (!user) {
      navigate('/login');
    } else if (role && !allowedRoles.includes(role)) {
      navigate('/unauthorized', { state: { from: location.pathname } });
    }
  }, [navigate, location, allowedRoles]);
}

export default useAuthCheck;
