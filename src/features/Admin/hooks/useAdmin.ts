import AdminAPI from "../api/Admin";

const useAdmin = () => {
  const admin = new AdminAPI();

  return {
    getAdmins: admin.getAdmins,
    searchAdmins: admin.searchAdmins,
    getAdminById: admin.getAdminById,
    createAdmin: admin.createAdmin,
    updateAdmin: admin.updateAdmin,
  };
};

export default useAdmin;
