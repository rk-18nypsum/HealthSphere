import Navbar from "./Navbar";
import MySidebar from "./MySidebar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <MySidebar />
        <div className="flex-grow-1 p-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
