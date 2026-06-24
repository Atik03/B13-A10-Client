import { FaBars } from "react-icons/fa6";

export default function DashboardTopbar() {
  return (
    <div className="navbar bg-base-100 border-b">
      <div className="flex-none lg:hidden">
        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
          <FaBars />
        </label>
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>

      <div className="avatar">
        <div className="w-10 rounded-full bg-base-300"></div>
      </div>
    </div>
  );
}
