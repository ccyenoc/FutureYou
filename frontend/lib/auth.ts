export function getUser() {
    if (typeof window === "undefined") {
        return null
    }

    return JSON.parse( localStorage.getItem("user") || "null")
}

export function getToken() {
    const user = getUser()

    return user?.token || null
}

export function getJsonHeaders() {
    const token =
        localStorage.getItem("token")

    return {
        "Content-Type": "application/json",
        ...(token && {
            Authorization:
            `Bearer ${token}`
        })
    }
}

export function getMultipartHeaders(): HeadersInit {

    const headers = new Headers()

    const token = localStorage.getItem("token")

    if (token) {
        headers.append(
            "Authorization",
            `Bearer ${token}`
        )
    }

    return headers
}