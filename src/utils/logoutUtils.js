export const handleLogout = (logout, navigate) => {
    logout()
    navigate("/login")
}