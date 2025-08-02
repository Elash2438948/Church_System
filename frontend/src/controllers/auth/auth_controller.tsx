// import { supabase } from "../../lib/supabase-client";
//
// class AuthController {
//     // Register user in Supabase auth and save extra info to 'users' table
//     async signUp(email: string, password: string, fullName: string, phone_number: string) {
//         const { data, error } = await supabase.auth.signUp({ email, password });
//
//         if (error || !data.user) {
//             return { data, error };
//         }
//
//         // Save extra fields (full name, phone number) to 'users' table
//         const { error: insertError } = await supabase.from("users").insert([
//             {
//                 id: data.user.id,
//                 email,
//                 full_name: fullName,
//                 phone_number
//             }
//         ]);
//
//         return { data, error: insertError || null };
//     }
//
//     async signIn(email: string, password: string) {
//         const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//         return { data, error };
//     }
//
//     async signOut() {
//         const { error } = await supabase.auth.signOut();
//         return { success: !error, error };
//     }
//
//     async getSession() {
//         const { data, error } = await supabase.auth.getSession();
//         return { data, error };
//     }
//
//     handleRegister = async (
//         email: string,
//         password: string,
//         fullName: string,
//         phone_number: string
//     ): Promise<{ data: { user: any } | null; error: Error | null }> => {
//         const { data, error } = await this.signUp(email, password, fullName, phone_number);
//         console.log("Registration data:", data?.user);
//         console.log("Registration error:", error);
//         return { data, error };
//     };
//
//     async handleLogin(email: string, password: string) {
//         const { data, error } = await this.signIn(email, password);
//
//         if (error) {
//             console.error("Login failed:", error.message);
//             alert(error.message);
//         } else {
//             console.log("User logged in:", data);
//             alert("Logged in!");
//         }
//     }
//
//     async handleLogout() {
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const { success, error } = await this.signOut();
//
//         if (error) {
//             console.error("Logout failed:", error.message);
//             alert(error.message);
//         } else {
//             console.log("User logged out");
//             alert("Logged out!");
//         }
//     }
// }
//
// // Export only the methods you need
// const authController = new AuthController();
//
// export const handleRegister = authController.handleRegister.bind(authController);
// export const handleLogin = authController.handleLogin.bind(authController);
// export const handleLogout = authController.handleLogout.bind(authController);
// export const getSession = authController.getSession.bind(authController);
