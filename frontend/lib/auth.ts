export function getUser() {
    if (typeof window === "undefined") {
        return null
    }

    return JSON.parse(
        localStorage.getItem("user") || "null"
    )
}

export function getToken() {
    if (typeof window === "undefined") {
        return null
    }
    return getUser()?.token || localStorage.getItem("token") || null
}

export function getJsonHeaders(): HeadersInit {

    const token = getToken()

    return {
        "Content-Type": "application/json",
        ...(token && {
            Authorization: `Bearer ${token}`
        })
    }
}

export function getMultipartHeaders(): HeadersInit {

    const token = getToken()

    const headers = new Headers()

    if (token) {
        headers.append(
            "Authorization",
            `Bearer ${token}`
        )
    }

    return headers
}