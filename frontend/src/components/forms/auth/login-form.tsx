import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";

// Zod schema
const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    // Load saved email if "Remember Me" was selected
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setValue("email", savedEmail);
            setValue("rememberMe", true);
        }
    }, [setValue]);

    // Handle login
    const onSubmit = async (data: LoginFormValues) => {
        console.log("Login data:", data);

        navigate("/all-invoices");

        // if (data.rememberMe) {
        //     localStorage.setItem("rememberedEmail", data.email);
        // } else {
        //     localStorage.removeItem("rememberedEmail");
        // }

        // try {
        //     const response = await fetch("https://api.example.com/auth/login", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ email: data.email, password: data.password }),
        //     });

        //     if (!response.ok) {
        //         throw new Error("Invalid credentials");
        //     }

        //     const userData = await response.json();
        //     console.log("Logged in user:", userData);

        //     // navigate to a protected route
        //     navigate("/main");
        // } catch (error) {
        //     console.log("Login error:", error);
        //     // Handle login error

        //     alert("Login failed. Please check your credentials.");
        // }
    };

    return (
        <div className="min-h-screen justify-center flex flex-col md:flex-row bg-background text-foreground">
            {/* <div className="hidden md:flex w-1/2 bg-cover bg-center bg-[url('/login-bg.jpg')]"></div> */}

            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold text-primary">Login</h2>
                        <p className="text-muted-foreground">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-2 relative">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-10 text-muted-foreground"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" {...register("rememberMe")} className="shrink-0" />
                            <label
                                htmlFor="remember-me"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>

                        <Button type="submit" className="w-full" onClick={handleSubmit(onSubmit)}>
                            Login
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Need an account?{" "}
                            <Link to="/register" className="text-primary hover:underline">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
