import { useState, useEffect } from 'react';

const useAuth = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const loggedInStatus = localStorage.getItem('loggedIn');
		if (loggedInStatus === 'true') {
			setLoggedIn(true);
		}
	}, []);

	const login = () => {
		setLoggedIn(true);
		localStorage.setItem('loggedIn', 'true');
	};

	const logout = () => {
		setLoggedIn(false);
		localStorage.removeItem('loggedIn');
	};

	return {
		loggedIn,
		login,
		logout,
	};
};

export default useAuth;
