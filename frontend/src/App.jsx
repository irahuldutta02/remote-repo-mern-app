import { Sidebar } from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import { PageRoutes } from "./routes/PageRoutes";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
        <PageRoutes />
      </div>
      <Toaster
        toastOptions={{
          position: "bottom-right",
        }}
      />
    </div>
  );
}

export default App;
