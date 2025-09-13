import logo from "../assets/logo.png"
import { ProfileMenu } from "./ProfileMenu";

export const Navbar = ({ user }) => {
  return (
    <div className="w-[80%] h-[100px] mt-[-40px] mb-[20px]">
      <div className="w-[100%] h-[83px] flex justify-between items-center">
        <div className="w-fit flex gap-2 items-center ">
          <img src={logo} alt="Logo" className="h-[50px]" />
          <h1 className="text-[28px] w-[126px] h-[21px] text-white font-semibold ml-2 mt-[-15px]">
            Creatorwrk
          </h1>
        </div>

        <ProfileMenu user={user} />
      </div>
    </div>
  );
};
