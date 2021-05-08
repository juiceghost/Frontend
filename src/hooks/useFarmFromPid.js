import { useEffect, useState } from "react"
import { useFarmsUser } from "./useFarmsUser"

export const useFarmFromPid = (pid, forceUpdate) => {
    const [user, setUser] = useState(null)
    const users = useFarmsUser(forceUpdate)

    useEffect(() => {
        if (users) {
            setUser(users[pid])
        }
    }, [users, forceUpdate])

    return user
}