import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

function Login () {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = searchParams.get("accessToken")
        localStorage.setItem('strava', JSON.stringify({
            accessToken,
        }))
        navigate('/')
    }, [])

    return (
        <Box sx={{ 
            display: 'flex',
            height: '100vh',
            alignItems: 'center',
            justifyItems: 'center'
        }}>
            <CircularProgress />
        </Box>
    )
}

export default React.memo(Login)