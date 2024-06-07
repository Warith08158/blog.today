import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

export default function RootLayout() {
  return (
    <div>
      <Menu />
      <div id="detail" className="pt-20 px-4 max-w-2xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
