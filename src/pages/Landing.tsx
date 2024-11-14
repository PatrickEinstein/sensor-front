import { useState } from "react";
import { userFetches } from "../HttpServices/fetches";
import { useNavigate } from "react-router-dom";
import { typeUserDetails } from "../Types";


const Landing = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const userservice = new userFetches();
    e.preventDefault();
    const login = await userservice.Login({
      email: email, 
      password: password,
    });
    console.log(login);
    alert(login.message);

    if (login.status === 200) {
      const userRole = await userservice.getUserRole(String(login.id));



      const userDetails: typeUserDetails = {
        token: login.token,
        canAssignAdmin: userRole.message.canAssignAdmin,
        canDeleteAdmin: userRole.message.canDeleteAdmin,
        canUpload: userRole.message.canUpload,
        role: userRole.message.role,
      };

      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      navigate("/dashboard/");
    }
    // handle login logic here
    // console.log("Logging in:", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Welcome Back!
        </h2>
        <p className="text-sm text-center text-gray-600">
          Please enter your credentials to sign in.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        {/* <div className="flex items-center justify-center pt-4 space-x-2 text-sm text-gray-600">
          <span>Don't have an account?</span>
          <a href="#" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Landing;
