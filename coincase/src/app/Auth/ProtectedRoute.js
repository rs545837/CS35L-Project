import React, {useEffect} from "react"
import {useAuth} from "./AuthContext";
import { redirect } from "next/navigation";

export default function ProtectedRoute({children}) {
    const { authUser, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !authUser) {
            redirect("/Auth/SignIn")
        }
    }, [authUser, isLoading])

    if (authUser && !isLoading) {
        return children
    }
}