

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";

export default function InvoiceViewModal({ invoice }: { invoice: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">View</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invoice Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                    <p><strong>Date:</strong> {invoice.dateCreated.toLocaleString()}</p>
                    <p><strong>Invoice ID:</strong> {invoice.invoiceId}</p>
                    <p><strong>Customer ID:</strong> {invoice.customerId}</p>
                    <p><strong>Description:</strong> {invoice.description}</p>
                    <p><strong>Total Products:</strong> {invoice.totalProducts}</p>
                    <p><strong>Total Price:</strong> {invoice.totalPrice}</p>
                    <p><strong>Status:</strong> {invoice.status ? "Paid" : "Unpaid"}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
