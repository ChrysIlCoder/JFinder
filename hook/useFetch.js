import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetch( endpoint, query ) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      headers: {
        'X-RapidAPI-Key': "f40c8376d6msh2e121abe07e84adp1f2fa5jsn7bf917dd2d3d",
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      },
      params: { ...query },
    };

    async function fetchData() {
        setIsLoading(true)

        try {
            const response = await axios.request(options)

            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            alert("Non sono riuscito i dati")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    function refetch(){
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch }
}