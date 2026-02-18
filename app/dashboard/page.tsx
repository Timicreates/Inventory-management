import Sidebar from "./../../components/sidebar";

const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar currentPath="/dashboard" />
      <main className="flex-1 md:ml-64 p-4 mt-0 md:p-2">
        <div className="">
          <div className="">
            <div className=" max-sm:mt-12 mt-5">
              <h1>Dashboard</h1>
              <p>Welcome back ! Here is an overview of your inventory</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
