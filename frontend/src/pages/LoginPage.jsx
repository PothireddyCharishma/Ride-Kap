import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter both email and password");
      return;
    }
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data === "not found" || data === "pass Not Ok") {
        alert("Invalid Email or Password");
      } else {
        setUser(data);
        alert("Login Success");
        setRedirect(true);
      }
    } catch (error) {
      // console.error("Login Error:", error); // Log any errors
      alert("Login Failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around p-24">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form
          className="max-w-md mx-auto "
          action=""
          onSubmit={handleLoginSubmit}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary"> Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account Yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
