import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home () {
    const [isAutheticated, setIsAuthenticated] = useState(false)

    const getAccessToken = () => {
        const localData = localStorage.getItem('strava');
            
        if (!localData) return null
        
        const data =  JSON.parse(localData)
        
        if (!data.accessToken) return null

        return data.accessToken
    }

    useEffect(() => {
        function checkAuthentication () {
            const accessToken = getAccessToken()

            if (accessToken) {
                setIsAuthenticated(Boolean(accessToken))
            }
        }
        checkAuthentication()
    }, [])

    const connect = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/connect?redirect_uri=${window.location.href}login`
    }

    const disconnect = async () => {
        try {
            const accessToken = getAccessToken()
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/disconnect`, {
                headers: {
                    accessToken
                }
            })
            localStorage.removeItem('strava')
            setIsAuthenticated(false)
        } catch (err) {
            console.log(err)
        }
    }

    const synchronize =  async () => {
        try {
            const accessToken = getAccessToken()
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/synchronization`, {
                headers: {
                    accessToken
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <Box textAlign="center">
                <Box mb={5}>
                    <img src="/strava-logo.png" alt="" />
                </Box>

                {
                    isAutheticated 
                    ? (
                        <>
                            <Box mb={2}>
                                <Button fullWidth variant="outlined" onClick={disconnect}>Disconnect</Button>
                            </Box>

                            <Box mb={2}>
                                <Button fullWidth variant="contained" onClick={synchronize}>Sync</Button>
                            </Box>
                        </>
                    ) 
                    : (
                        <Box mb={2}>
                            <Button fullWidth variant="contained" onClick={connect}>Connect</Button>
                        </Box>
                    )
                }
            </Box>
        </Container>
        
    )
}