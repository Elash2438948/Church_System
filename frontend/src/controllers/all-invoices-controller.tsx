

type Invoice = {
  id: number;
  invoiceId: string;
  customerId: string;
  dateCreated: Date;
  description: string;
  totalPrice: string;
  totalProducts: string;
  status: boolean;
};

type Product = {
  invoiceId: string;
  customerId: string;
  productName: string;
  price: string;
};

const products: Product[] = [
  { invoiceId: "kqpindpbf", customerId: "ihdbgsojladgojsabf", productName: "Round Neck Shirt", price: "500" },
  { invoiceId: "kqpindpbf", customerId: "ihdbgsojladgojsabf", productName: "Baggy Jeans", price: "500" },
  { invoiceId: "0fzvbloaf", customerId: "ihdbgsojlanbqsabf", productName: "Hoodie", price: "400" },
  { invoiceId: "0fzvbloaf", customerId: "ihdbgsojlanbqsabf", productName: "Sneakers", price: "840" },
  { invoiceId: "x7mn0a9fs", customerId: "cust202", productName: "Socks", price: "200" },
  { invoiceId: "x7mn0a9fs", customerId: "cust202", productName: "Cap", price: "150" },
  { invoiceId: "x7mn0a9fs", customerId: "cust202", productName: "T-shirt", price: "650" },
];

const initialInvoices: Invoice[] = [
  {
    id: 1,
    invoiceId: "kqpindpbf",
    customerId: "ihdbgsojladgojsabf",
    dateCreated: new Date("2024-05-01"),
    description: "Two round neck shirts, 1 baggy jeans",
    totalPrice: "1000",
    totalProducts: "2",
    status: true,
  },
  {
    id: 2,
    invoiceId: "0fzvbloaf",
    customerId: "ihdbgsojlanbqsabf",
    dateCreated: new Date("2024-05-15"),
    description: "Hoodie and Sneakers",
    totalPrice: "1240",
    totalProducts: "2",
    status: true,
  },
  {
    id: 3,
    invoiceId: "x7mn0a9fs",
    customerId: "cust202",
    dateCreated: new Date("2024-05-18"),
    description: "Socks, Cap and T-shirt",
    totalPrice: "1000",
    totalProducts: "3",
    status: false,
  }
];


export {initialInvoices, products, type Invoice, type Product};