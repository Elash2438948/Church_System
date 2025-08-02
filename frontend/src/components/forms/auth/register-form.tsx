import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form.tsx";
import { Input } from "../../ui/input.tsx";
import { Button } from "../../ui/button.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
// import { handleRegister } from "../../../controllers/auth/auth_controller";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import Loader from "../../loading-indicator";


const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
      username: z.string().min(1, "Please set a username"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6, "Minimum 6 characters"),
    phone_number: z.string().min(6, "Enter a valid phone_number number"),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
        username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone_number: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      form.setValue("email", savedEmail);
      form.setValue("rememberMe", true);
    }
  }, [form]);

  const onSubmit = async (data: RegisterFormValues) => {
    // setIsLoading(true);
    // try {
    //   const { email, password, fullName, phone_number, rememberMe } = data;
    //
    //   if (rememberMe) {
    //     localStorage.setItem("rememberedEmail", email);
    //   } else {
    //     localStorage.removeItem("rememberedEmail");
    //   }
    //
    //   const result = await handleRegister(email, password, fullName, phone_number);
    //
    //   if (result?.error) {
    //     toast.error(result.error.message || "Registration failed");
    //     return;
    //   }
    //
    //   toast.success("Registration successful. Check your email to confirm.");
    //   navigate("/login");
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (err) {
    //   toast.error("Something went wrong. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-primary">Register</h2>
          <p className="text-muted-foreground">Create your account to continue</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Joseph Tenkorang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  Username */}
              <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                              <Input placeholder="joseph" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="tel"
                        placeholder="Enter your phone_number number"
                        value={field.value}
                        onChange={(e) => {
                          // Allow only numbers
                          const numericValue = e.target.value.replace(/\D/g, '');
                          field.onChange(numericValue);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-muted-foreground"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <Loader />
                  <span>Registering...</span>
                </div>
              ) : (
                "Register"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
