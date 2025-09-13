import "./App.css";
import { AllRoutes } from "./routes/AllRoutes";

export const App = () => {
  return (
    <div
      className="w-[100%] min-h-[100vh] relative overflow-hidden bg-transparent">
       <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-[#0A0A0B]
     via-[#11101d] to-[#0f0c29]">
      <div className="absolute top-[-40%] left-[10%] w-[400px] h-[500px] rounded-full bg-blue-600 opacity-40 blur-[120px]"></div>
      <div className="absolute top-[-35%] left-[35%] w-[400px] h-[500px] rounded-full bg-purple-400 opacity-40 blur-[120px]"></div>
      <div className="absolute top-[-40%] left-[55%] w-[400px] h-[500px] rounded-full bg-pink-400 opacity-40 blur-[120px]"></div>
      <div className="absolute top-[30%] left-[-25%] w-[400px] h-[500px] rounded-full bg-pink-400 opacity-40 blur-[120px]"></div>
      <div className="absolute top-[60%] left-[85%] w-[600px] h-[500px] rounded-full bg-pink-400 opacity-40 blur-[120px]"></div>
      </div>
      <AllRoutes />
    </div>
  );
};
