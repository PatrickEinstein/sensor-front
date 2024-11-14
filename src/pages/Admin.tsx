import React, { useEffect, useState } from "react";
import { userFetches } from "../HttpServices/fetches";
import { PiEyeClosed } from "react-icons/pi";
import { FaTrashCan } from "react-icons/fa6";
import { typeUserDetails } from "../Types";

type user = {
  id: number;
  username: string;
  email: string;
  role: string;
};
type userDetails = {
  username: string;
  email: string;
  password: string;
};
type userList = user[];

type userRoles = {
  id: number;
  userid: string;
  role: string;
  isActive: boolean;
  canAssignAdmin: boolean;
  canDeleteAdmin: boolean;
  canUpload: boolean;
};
const Admin = () => {
  const userservice = new userFetches();

  const userPortfolio = localStorage.getItem("userDetails");
  const defaultUserDetails: typeUserDetails = {
    token: "",
    canAssignAdmin: false,
    canDeleteAdmin: false,
    canUpload: false,
    role: "",
  };

  const userObject: typeUserDetails = userPortfolio
    ? JSON.parse(userPortfolio)
    : defaultUserDetails;

    // console.log(userObject);

  const [userDetails, setUserDetails] = useState<userDetails>({
    username: "",
    email: "",
    password: "",
  });

  const [userRoles, setUserRoles] = useState<userRoles>({
    id: 0,
    userid: "",
    role: "",
    isActive: false,
    canAssignAdmin: false,
    canDeleteAdmin: false,
    canUpload: false,
  });

  const onSetUserInfo = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof userDetails
  ) => {
    const value = e.target.value;
    setUserDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const [users, setUsers] = useState<userList>([
    {
      id: 0,
      username: "",
      email: "",
      role: "",
    },
  ]);
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpandRow = (id: number) => {
    setExpandedRow((prevId) => (prevId === id ? null : id));
  };

  const findAllUsers = async () => {
    const foundusers = await userservice.getAllusers();

    if (foundusers.status === 200) {
      setUsers(foundusers.message);
    } else {
      alert(foundusers.message);
    }
  };

  const getUserRole = async (id: string) => {
    const foundRole = await userservice.getUserRole(id);
    // console.log(`role`, foundRole);
    if (foundRole.status === 200) {
      setUserRoles(foundRole.message);
    } else {
      alert(foundRole.message);
    }
  };

  const createUser = async () => {
    const createdUser = await userservice.createuser(userDetails);
    // console.log(`updateduser==>`, createdUser);
    if (createdUser.status === 200) {
      setUserDetails({
        username: "",
        email: "",
        password: "",
      });
    }
    alert(createdUser.message);
    findAllUsers();
    findAllUsers();
  };
  const updateUserRole = async (id: string, role: string) => {
    const foundusers = await userservice.updateRole({
      userid: id,
      role: role,
    });
    getUserRole(id);
    getUserRole(id);
    alert(foundusers.message);
  };
  const deleteUser = async (id: string) => {
    const deletedUser = await userservice.deleteuser(id);
    // console.log(`updateduser==>`, deletedUser);
    alert(deletedUser.message);
    findAllUsers();
  };
  useEffect(() => {
    findAllUsers();
    findAllUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, username, email, role }, index) => (
              <React.Fragment key={id}>
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition-colors`}
                >
                  <td className="py-3 px-4 text-gray-700 font-medium">{id}</td>
                  <td className="py-3 px-4 text-gray-700">{username}</td>
                  <td className="py-3 px-4 text-gray-700">{email}</td>
                  <td className="py-3 px-4 text-center">
                    <PiEyeClosed
                      className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => {
                        toggleExpandRow(id);
                        getUserRole(String(id));
                      }}
                    />
                  </td>
                </tr>
                {expandedRow === id && (
                  <tr>
                    <td colSpan="5" className="px-4 py-4">
                      <div className="bg-gray-100 p-4 gap-5 rounded-lg shadow-inner w-full h-auto">
                        {/* Additional details for user ID {id} go here. */}
                        <div className="flex flex-cols w-full gap-5 justify-between mb-4">
                          <p>Role</p>
                          <p>
                            {userDetails.username} is a/an {userRoles.role}
                          </p>
                        </div>
                        {userObject.canAssignAdmin && (
                          <div className="flex flex-cols w-full gap-5 justify-between mb-4">
                            <p>assign role</p>
                            <div>
                              <select
                                name="role"
                                id="role"
                                value={userRoles.role} // set this to the user's current role
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => updateUserRole(String(id), e.target.value)}
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                          </div>
                        )}
                        {userObject.canDeleteAdmin && (
                          <div className="flex flex-cols w-full gap-5 justify-between">
                            <p>delete </p>
                            <div>
                              <FaTrashCan
                                onClick={() => deleteUser(String(id))}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan="5">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <input
                    className="w-16 py-2 px-3 text-gray-700 font-medium bg-gray-200 rounded-lg"
                    defaultValue="0"
                    disabled
                  />
                  <input
                    type="text"
                    className="w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Username"
                    name="username"
                    onChange={(e) => onSetUserInfo(e, "username")}
                  />
                  <input
                    type="text"
                    className="w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => onSetUserInfo(e, "email")}
                  />
                  <input
                    type="text"
                    className="w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => onSetUserInfo(e, "password")}
                  />
                  <button
                    className="w-32 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={createUser}
                  >
                    Create
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
