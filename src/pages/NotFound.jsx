import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
<div className="flex w-fit m-auto flex-col">
    <h1 className="text-white">404 Not Found</h1>
    <button className="text-white bg-green-500 border-2 border-solid border-gray-500 rounded-xl p-2
    hover:cursor-pointer mt-2"
    onClick={()=>navigate("/login")}>Back to Login</button>
</div>
        
      
    </div>
  );
};
