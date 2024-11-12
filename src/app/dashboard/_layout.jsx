import Sidebar from "./(admin)/sidebar/page";

const Layout = ({ children }) => {
  return (
    <div className="flex bg-white">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
