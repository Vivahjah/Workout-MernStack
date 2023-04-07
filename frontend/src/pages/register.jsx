import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, error, isLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();


        
        await register(username, email, password);
        setEmail("")
        setUsername("")
        setPassword("")
 
   

  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Register</h3>

      <label>Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
