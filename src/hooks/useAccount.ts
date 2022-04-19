import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import accountState from "../recoil/accountAtom";

export default function useAccount () {
    const [loading, setLoading] = useState(false)
    const accountInfo = useRecoilValue(accountState)

    useEffect(() => {
        async function getAccountInfo(athleteId: string, accessToken: string) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/accounts`)
        }

        if (!accountInfo.id) {
            const localData = localStorage.getItem('strava')
            if (!localData) return

            const data = JSON.parse(localData)

            if (!data.athleteId) return

            getAccountInfo(data.athleteId, data.accessToken) 
        }
    }, [])

    return {
        loading,
        accountInfo
    }
}