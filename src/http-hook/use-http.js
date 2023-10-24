import { useState, useCallback } from "react";

const useHttp = () => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ hasError, setHasError ] = useState(null);

    const sendRequest = useCallback( async (requestConfig, applyData) => {
        setIsLoading(true);
        setHasError(null);
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
            );
        if (!response.ok) {
            throw new Error('Request failed.')
        }
        const data = await response.json();
        applyData(data)
        } catch(err) {
            setHasError(err.message || 'Something went wrong')
        }
        setIsLoading(false);
    }, [])
    
    return {
        isLoading,
        hasError,
        sendRequest
    }
}



export default useHttp;