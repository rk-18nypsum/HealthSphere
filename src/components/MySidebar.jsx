import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

const MySidebar = () => {
  return (
    <Sidebar>
      <Menu>
        <SubMenu label="Dashboard">
          <MenuItem component={<NavLink to="/" />}>Overview</MenuItem>
        </SubMenu>

        <SubMenu label="Patients">
          <MenuItem component={<NavLink to="/patient-list" />}>
            Patient List
          </MenuItem>
          <MenuItem component={<NavLink to="/add-patient" />}>
            Add Patient
          </MenuItem>
        </SubMenu>

        <SubMenu label="Doctors">
          <MenuItem component={<NavLink to="/doctor-list" />}>
            Doctor List
          </MenuItem>
          <MenuItem component={<NavLink to="/add-doctor" />}>
            Add Doctor
          </MenuItem>
        </SubMenu>

        <MenuItem component={<NavLink to="/appointment" />}>
          Appointments
        </MenuItem>

        <MenuItem component={<NavLink to="/billing" />}>Billing</MenuItem>

        <MenuItem component={<NavLink to="/pharmacy-list" />}>
          Pharmacy
        </MenuItem>

        <MenuItem component={<NavLink to="/report" />}>Reports</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MySidebar;
