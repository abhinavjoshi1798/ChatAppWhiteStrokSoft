import { FaUser, FaLock, FaSignOutAlt } from "react-icons/fa";
import { handleLogout } from "../utils/logoutUtils";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfileMenu = ({ user }) => {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()

  return (
    <div className="w-fit flex gap-2 items-center">
      <div className="relative group inline-block">
        <img
          src={user?.profileImageUri}
          alt="UserImg"
          className="h-[50px] w-[50px] rounded-full transition-transform duration-200 hover:scale-115 cursor-pointer"
        />

        <div className="absolute right-0 mt-2 w-56 bg-black rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 text-white py-2 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition rounded-lg text-left">
            <FaUser className="text-lg" />
            <span>Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition rounded-lg text-left">
            <FaLock className="text-lg" />
            <span>Change password</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition rounded-lg text-left hover:cursor-pointer"
            
            onClick={()=>handleLogout(logout,navigate)}
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <h1 className="text-[18px] text-white font-semibold">{user?.name}</h1>
    </div>
  );
};
