// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { cn } from "../../lib/utils";
// import { Button } from "../ui/button";


// type Invoice = {
//   id: string;
//   customer: string;
//   amount: number;
//   status: "Paid" | "Pending" | "Cancelled";
// };

// type RecentInvoicesCardProps = {
//   emoji: string;
//   title: string;
//   paginatedInvoices: Invoice[];
//   recentInvoices: Invoice[];
//   invoicePage: number;
//   setInvoicePage: (page: number) => void;
// };

// const Pagination = ({ page, totalItems, onPageChange }: PaginationProps) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   return (
//     <div className="flex justify-end mt-4 gap-2">
//       <Button
//         variant="outline"
//         size="sm"
//         disabled={page === 1}
//         onClick={() => onPageChange(page - 1)}
//       >
//         ◀️ Previous
//       </Button>
//       <span className="text-sm flex items-center">
//         Page {page} of {totalPages}
//       </span>
//       <Button
//         variant="outline"
//         size="sm"
//         disabled={page === totalPages}
//         onClick={() => onPageChange(page + 1)}
//       >
//         Next ▶️
//       </Button>
//     </div>
//   );
// };

// export function RecentInvoicesCard({
//   emoji,
//   title,
//   paginatedInvoices,
//   recentInvoices,
//   invoicePage,
//   setInvoicePage,
// }: RecentInvoicesCardProps) {
//   return (
//     <Card className="flex flex-col h-full">
//       <CardHeader>
//         <CardTitle>
//           {emoji} {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="flex-grow min-h-0 overflow-y-auto">
//         <table className="w-full text-sm">
//           <thead className="text-left">
//             <tr className="border-b">
//               <th className="py-2">Invoice</th>
//               <th>Customer</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedInvoices.map((inv) => (
//               <tr key={inv.id} className="border-b">
//                 <td className="py-2">{inv.id}</td>
//                 <td>{inv.customer}</td>
//                 <td>${inv.amount.toLocaleString()}</td>
//                 <td>
//                   <span
//                     className={cn(
//                       "px-2 py-1 rounded text-xs",
//                       inv.status === "Paid" &&
//                         "bg-green-700 text-green-100",
//                       inv.status === "Pending" &&
//                         "bg-yellow-600 text-white",
//                       inv.status === "Cancelled" &&
//                         "bg-red-700 text-red-100"
//                     )}
//                   >
//                     {inv.status === "Paid" && "✅ "}
//                     {inv.status === "Pending" && "⏳ "}
//                     {inv.status === "Cancelled" && "❌ "}
//                     {inv.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <Pagination
//           page={invoicePage}
//           totalItems={recentInvoices.length}
//           onPageChange={setInvoicePage}
//         />
//       </CardContent>
//     </Card>
//   );
// }
