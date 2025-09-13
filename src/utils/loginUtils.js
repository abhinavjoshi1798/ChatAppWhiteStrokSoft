import { userLoginAction } from "../actions/loginActions"

export const handleLogin = async ({email, password, login, navigate, setErrors, setLoading, setError}) => {
    setLoading(true)
    setErrors("")
    const res = await userLoginAction({email, password})
    if(res.status){
        setLoading(false)
        login(res.token,res.user)
        navigate("/chatApp")
    }else{
        setLoading(false)
        setError(true)
        setErrors(res.message)
    }
}