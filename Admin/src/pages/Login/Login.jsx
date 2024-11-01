import React, { useState } from "react";
import LoginImage from "../../assets/image/bg-remove-image/computer-monitor.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { baseUrl } from "../../redux/Baseurl";
console.log(baseUrl)
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);  
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const FormSubmission = async (event) => {
    event.preventDefault();
    console.log("Form data being sent:", formData); // Log formData to confirm values

    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include", 
        });
        
        console.log("Response status:", response.status); // Log response status

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error from server:", errorData.message || response.statusText);
            return;
        }

        const data = await response.json();
        console.log("User logged in successfully:", data);
        localStorage.setItem('token', data.token);
        
        setFormData({ email: "", password: "" });
        window.location.href = "/";
    } catch (error) {
        console.error("Fetch error:", error);
    }
};




  return (
    <div className="flex flex-col md:flex-row justify-between  md:h-screen">
      <div className="flex flex-col justify-center md:w-1/2 h- items-center bg-sky-200 text-center">
        <h4 className="text-xl  font-semibold font-poppins">Gadget Core</h4>
        <img
          className="h-[800px] object-contain object-right"
          src={LoginImage}
          alt="imagepc.png"
        />
      </div>
      <div className="flex items-center justify-center md:w-1/2 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md my-2">
          <h2 className="text-3xl font-semibold text-center text-gray-800 font-poppins">
            Admin Login
          </h2>
         

          <form className="mt-8 flex flex-col gap-4" onSubmit={FormSubmission}>
            <input
              type="email"
              className="border-b border-gray-300 p-3 w-full focus:outline-none focus:border-black font-poppins"
              placeholder="Admin Username"
              onChange={handleChange}
              name="email"
              value={formData.email}
              required
            />

            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="border-b border-gray-300 p-3 w-full focus:outline-none focus:border-black font-poppins"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                required
              />
              {isPasswordVisible ? (
                <FaRegEyeSlash
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 cursor-pointer"
                />
              ) : (
                <FaRegEye
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 cursor-pointer"
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-500 focus:border-black"
                />
                <label className="ml-2 text-sm text-gray-600 font-poppins">
                  Remember me
                </label>
              </div>
              <p className="text-sm text-black font-bold cursor-pointer font-poppins">
                Forgot password?
              </p>
            </div>

            <button className="bg-black text-white py-3 rounded-md w-full font-poppins hover:bg-gray-800 transition">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
