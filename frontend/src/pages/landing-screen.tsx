import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">



      <div className="relative w-full h-screen overflow-hidden">
        <header className="flex w-full pt-4 pb-4 px-6 justify-end items-center absolute top-0 left-0 z-10">
          <div >
            <Button className="mr-2 cursor-pointer w-36" variant={"secondary"} onClick={handleRegister}>Register</Button>
            {/*<Button variant="secondary" className="text-primary cursor-pointer" onClick={handleSignUp}>Sign Up</Button>*/}
          </div>

          <div >
            <Button className="mr-2 cursor-pointer w-36" onClick={handleLogin}>Login</Button>
            {/*<Button variant="secondary" className="text-primary cursor-pointer" onClick={handleSignUp}>Sign Up</Button>*/}
          </div>
        </header>
        <img 
          src="/hero-bg-one.jpg"
          alt="Congregation"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">METHODIST CHURCH OF GHANA</h1>
            <p className="text-xl md:text-2xl">Join us in worship and fellowship</p>
          </div>
        </div>
      </div>


      {/* Main Content */}
      {/*<main >*/}
      {/*    */}
      {/*</main>*/}

      {/* Footer */}
      {/*<footer className="text-center text-sm py-4 border-t text-muted-foreground">*/}
      {/*  © {new Date().getFullYear()} Invoiced Inc. All rights reserved.*/}
      {/*</footer>*/}
    </div>
  );
}
