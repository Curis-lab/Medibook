import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";
import { useAuthApi } from "../../../hooks/actions/useAuthApi/useAuthApi";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useAuthApi();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="px-5 lg:px-0 bg-primary-background py-10 h-screen">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-black text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primary">Weclome</span> Back 🎉
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate(formData);
          }}
          className="py-4 md:py-0"
        >
          <div className="mb-5">
            <input
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary rounded-md cursor-pointer"
              required
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primary text-[22px] leading-7 text-black placeholder:text-primary rounded-md cursor-pointer"
              required
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              className="btn w-full bg-primary text-white text-[18px] leading-[30px] rounded-lg px-4 "
            >
              {isPending ? <HashLoader size={25} color="#fff" /> : "Login"}
            </button>
          </div>
          <p className="mt-5 text-black text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
