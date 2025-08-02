import React, { useState, useMemo } from 'react';
import {
  Users,
  User,
  UserCheck,
  Zap,
  Plus,
  Download,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  FileText,
  X
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter
} from '../components/ui/alert-dialog';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import AddMemberModal from '../components/add-member-form';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../components/ui/table.tsx";

const MembershipDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedMembers, setSelectedMembers] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [previewMember, setPreviewMember] = useState<Member | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [open, setOpen] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);



  // Mock data based on the image
  const membershipData = [
    {
      id: 1,
      memberId: 'EF/AGO/AGA/0001',
      name: 'Asare Baffour',
      contact: '0247878880',
      email: 'baffourasare94@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      memberId: 'EF/AGO/AGA/0002',
      name: 'Lordia Oforiwaa Gyasi',
      contact: '0506240942',
      email: 'akuasherry2002@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-02-20',
      status: 'Active'
    },
    {
      id: 3,
      memberId: 'EF/AGO/AGA/0003',
      name: 'Betty Appiah',
      contact: '0540216688',
      email: 'bettyapppin@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-01-10',
      status: 'Active'
    },
    {
      id: 4,
      memberId: 'EF/AGO/AGA/0004',
      name: 'Mary Amponsah',
      contact: '0550687981',
      email: 'obaapakdline@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-03-05',
      status: 'Active'
    },
    {
      id: 5,
      memberId: 'EF/AGO/AGA/0005',
      name: 'Kwame Adarkwah Yiadom',
      contact: '0240205642',
      email: 'kayiadom@yahoo.com',
      branch: 'Agogo',
      dateJoined: '2024-01-25',
      status: 'Active'
    },
    {
      id: 6,
      memberId: 'EF/AGO/AGA/0006',
      name: 'Appiah Salomey',
      contact: '0249189855',
      email: 'appiahsalomey072@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-02-14',
      status: 'Active'
    },
    {
      id: 7,
      memberId: 'EF/AGO/AGA/0007',
      name: 'Oteng Gyamfuah Frederica',
      contact: '0547109254',
      email: 'fredricagyamfuaoteng@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-03-12',
      status: 'Active'
    },
    {
      id: 8,
      memberId: 'EF/AGO/AGA/0008',
      name: 'Hannah Owusu',
      contact: '0200921026',
      email: 'owuha@yahoo.com',
      branch: 'Agogo',
      dateJoined: '2024-01-30',
      status: 'Active'
    },
    {
      id: 9,
      memberId: 'EF/AGO/AGA/0009',
      name: 'Elvis Ohene-Kontoh',
      contact: '0549001886',
      email: 'ohenekontoh30@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-02-28',
      status: 'Active'
    },
    {
      id: 10,
      memberId: 'EF/AGO/AGA/0010',
      name: 'Amponsah Mary',
      contact: '0550687981',
      email: 'amponsahmary2003@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-03-18',
      status: 'Active'
    },
    {
      id: 11,
      memberId: 'EF/AGO/AGA/0011',
      name: 'Omane Acheampong',
      contact: '0548696825',
      email: 'omaneea81@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-01-08',
      status: 'Active'
    },
    {
      id: 12,
      memberId: 'EF/AGO/AGA/0012',
      name: 'Theodorah Asantewah',
      contact: '0541577790',
      email: 'adwoagym27@gmail.com',
      branch: 'Agogo',
      dateJoined: '2024-02-05',
      status: 'Active'
    }
  ];

  // Statistics calculations
  const stats = useMemo(() => {
    const totalMembers = membershipData.length;
    const maleCount = Math.floor(totalMembers * 0.33);
    const femaleCount = totalMembers - maleCount;
    const activeCount = totalMembers;

    return {
      total: totalMembers,
      male: maleCount,
      female: femaleCount,
      active: activeCount
    };
  }, [membershipData]);

  const [members, setMembers] = useState<Member[]>(membershipData);

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return membershipData;

    return membershipData.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.contact.includes(searchTerm)
    );
  }, [searchTerm, membershipData]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Num
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const [viewingMember, setViewingMember] = useState<Member | null>(null);
  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredMembers.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle next/previous page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMemberAction = (action: string, memberId: number) => {
    const member = membershipData.find(m => m.id === memberId);

    switch (action) {
      case 'preview':
        setPreviewMember(member ?? null);
        setShowPreviewModal(true);
        break;
      case 'edit':
        console.log('Edit member:', memberId);
        // Implement edit functionality
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${member?.name}?`)) {
          console.log('Delete member:', memberId);
          // Implement delete functionality
        }
        break;
      case 'print':
        if (member) {
          handlePrintMember(member);
        }
        break;
      default:
        console.log(`${action} action for member ${memberId}`);
    }
  };


  const handleView = (member: Member) => {
    setViewingMember(member);
  };

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };
  const handlePrintMember = (member: Member) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Member Details - ${member.name}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .details { margin: 20px 0; }
              .field { margin: 10px 0; }
              .label { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>MYF D-SYSTEM</h1>
              <h2>Member Details</h2>
            </div>
            <div class="details">
              <div class="field"><span class="label">Member ID:</span> ${member.memberId}</div>
              <div class="field"><span class="label">Name:</span> ${member.name}</div>
              <div class="field"><span class="label">Contact:</span> ${member.contact}</div>
              <div class="field"><span class="label">Email:</span> ${member.email}</div>
              <div class="field"><span class="label">Branch:</span> ${member.branch}</div>
              <div class="field"><span class="label">Date Joined:</span> ${member.dateJoined}</div>
              <div class="field"><span class="label">Status:</span> ${member.status}</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Member ID', 'Name', 'Contact', 'Email', 'Branch', 'Date Joined', 'Status'];
    const rows = filteredMembers.map(member => [
      member.id,
      member.memberId,
      member.name,
      member.contact,
      member.email,
      member.branch,
      member.dateJoined,
      member.status
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(field => `"${field}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `membership_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    // Simple Excel export using HTML table format
    const headers = ['ID', 'Member ID', 'Name', 'Contact', 'Email', 'Branch', 'Date Joined', 'Status'];
    const rows = filteredMembers.map(member => [
      member.id,
      member.memberId,
      member.name,
      member.contact,
      member.email,
      member.branch,
      member.dateJoined,
      member.status
    ]);

    let excelContent = '<table>';
    excelContent += '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
    rows.forEach(row => {
      excelContent += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
    });
    excelContent += '</table>';

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `membership_data_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

   const handleExportList = (type: 'csv' | 'excel') => {
    setOpen(false);
    if (type === 'csv') {
      exportToCSV();
    } else {
      exportToExcel();
    }
  };

  type StatCardVariant = "default" | "secondary" | "success" | "danger";

  interface StatCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    variant?: StatCardVariant;
  }

  const cardVariants: Record<StatCardVariant, string> = {
    default: "bg-card text-primary",
    secondary: "bg-muted text-muted-foreground",
    success: "bg-emerald-500 text-white",
    danger: "bg-destructive text-destructive-foreground"
  };

  const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, variant = "default" }) => {
    return (
      <Card className={`${cardVariants[variant]} border-none shadow-sm`}>
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium opacity-90">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs opacity-75">Just Updated</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black/10">
            <Icon className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    );
  };

  // Preview Modal Component
  interface Member {
    id: number;
    memberId: string;
    name: string;
    contact: string;
    email: string;
    branch: string;
    dateJoined: string;
    status: string;
  }

  interface PreviewModalProps {
    member: Member | null;
    isOpen: boolean;
    onClose: () => void;
  }

  const PreviewModal: React.FC<PreviewModalProps> = ({ member, isOpen, onClose }) => {
    if (!isOpen || !member) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Member Preview</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Member ID</label>
              <p className="text-sm bg-gray-100 p-2 rounded">{member.memberId}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-sm">{member.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Contact</label>
              <p className="text-sm">{member.contact}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-sm">{member.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Branch</label>
              <p className="text-sm">{member.branch}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Date Joined</label>
              <p className="text-sm">{member.dateJoined}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <Badge variant="outline" className="text-green-600">{member.status}</Badge>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => handleMemberAction('print', member.id)}>
              <FileText className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    );
  };

  // Generate pagination buttons
  // const renderPaginationButtons = () => {
  //   const buttons = [];
  //   const maxVisibleButtons = 5;
  //
  //   let startPage = 1;
  //   if (totalPages > maxVisibleButtons) {
  //     if (currentPage > Math.floor(maxVisibleButtons / 2)) {
  //       startPage = Math.min(
  //           currentPage - Math.floor(maxVisibleButtons / 2),
  //           totalPages - maxVisibleButtons + 1
  //       );
  //     }
  //   }
  //
  //   const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);
  //
  //   for (let i = startPage; i <= endPage; i++) {
  //     buttons.push(
  //         <Button
  //             key={i}
  //             variant={currentPage === i ? 'default' : 'outline'}
  //             size="sm"
  //             onClick={() => paginate(i)}
  //         >
  //           {i}
  //         </Button>
  //     );
  //   }
  //
  //   return buttons;
  // };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-bold">M</span>
              </div>
              <span className="text-lg font-semibold">MYF D-SYSTEM</span>
            </div>
            <div className="text-muted-foreground">Membership Data</div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Badge variant="outline">AgoBetBraSec</Badge>
              <Badge variant="outline">Level 5</Badge>
              <Badge variant="outline">Branch Secretary</Badge>
              <Badge variant="outline">Agogo</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-64 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-6 py-6">
        {/* Action Buttons */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Membership Data</h1>
          <div className="flex items-center space-x-3">
            <Button
              className="bg-primary text-foreground hover:bg-primary/90"
              onClick={() => setShowAddMemberModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              ADD MEMBER
            </Button>
            <Button
              variant="outline"
              className=""
              onClick={() => setOpen(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              EXPORT LIST
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Membership" value={stats.total} icon={Users} variant="default" />
          <StatCard title="Male" value={stats.male} icon={User} />
          <StatCard title="Female" value={stats.female} icon={UserCheck} />
          <StatCard title="Active" value={stats.active} icon={Zap} />
        </div>

        {/* Members Table */}
        <div className="flex justify-between items-center">
          <div>
            Registered Members{" "}
            <Badge className="ml-2">{filteredMembers.length}</Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {filteredMembers.length} of {members.length}
          </div>
        </div>
            <div className="overflow-auto max-h-140">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead>S/No.</TableHead> */}
                    <TableHead>Member ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentRows.length > 0 ? (
                      currentRows.map((member, index) => (
                          <TableRow
                              key={member.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            {/* <TableCell>{index + 1 + indexOfFirstRow}</TableCell> */}
                            <TableCell className="font-medium">{member.id}</TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.contact}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {member.email}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{member.branch}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleView(member)}
                                    title="View details"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => handleDeleteClick(member)}
                                    title="Delete member"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          {searchTerm
                              ? "No members found matching your search."
                              : "No members available."}
                        </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              {filteredMembers.length > rowsPerPage && (
                  <div className="flex items-center justify-between px-6 py-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Showing{" "}
                      <span className="font-medium">{indexOfFirstRow + 1}</span> to{" "}
                      <span className="font-medium">
                    {Math.min(indexOfLastRow, filteredMembers.length)}
                  </span>{" "}
                      of{" "}
                      <span className="font-medium">{filteredMembers.length}</span>{" "}
                      members
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          className="px-4 py-2"
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                          (page) => (
                              <Button
                                  key={page}
                                  variant={currentPage === page ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => paginate(page)}
                                  className="px-4 py-2"
                              >
                                {page}
                              </Button>
                          )
                      )}
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
              )}
            </div>


        {/*<Card>*/}
        {/*  <CardHeader>*/}
        {/*    <div className="flex items-center justify-between">*/}
        {/*      <div>*/}
        {/*        <CardTitle className="text-lg">*/}
        {/*          Registered Members*/}
        {/*          <Badge variant="secondary" className="ml-2 bg-white/20 text-white">*/}
        {/*            {filteredMembers.length}*/}
        {/*          </Badge>*/}
        {/*        </CardTitle>*/}
        {/*        <p className="text-sm opacity-90">*/}
        {/*          Registered members as at Tue Jul 29, 2025 15:44*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">*/}
        {/*        <Filter className="h-4 w-4" />*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  </CardHeader>*/}
        {/*  <CardContent className="p-0 overflow-x-auto">*/}
        {/*    <div className="overflow-x-auto">*/}
        {/*      <table className="w-full">*/}
        {/*        <thead>*/}
        {/*          <tr className="bg-muted/50 border-b">*/}
        {/*            <th className="w-12 px-4 py-3 text-left text-sm font-medium text-muted-foreground">#</th>*/}
        {/*            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Member ID</th>*/}
        {/*            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>*/}
        {/*            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Contact</th>*/}
        {/*            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>*/}
        {/*            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Branch</th>*/}
        {/*            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>*/}
        {/*          </tr>*/}
        {/*        </thead>*/}
        {/*        <tbody>*/}
        {/*          {filteredMembers.map((member, index) => (*/}
        {/*            <tr key={member.id} className="border-b hover:bg-muted/50 transition-colors">*/}
        {/*              <td className="px-4 py-3 font-medium">{index + 1}</td>*/}
        {/*              <td className="px-4 py-3">*/}
        {/*                <code className="text-sm bg-muted px-2 py-1 rounded">*/}
        {/*                  {member.memberId}*/}
        {/*                </code>*/}
        {/*              </td>*/}
        {/*              <td className="px-4 py-3 font-medium">{member.name}</td>*/}
        {/*              <td className="px-4 py-3">{member.contact}</td>*/}
        {/*              <td className="px-4 py-3">*/}
        {/*                <a*/}
        {/*                  href={`mailto:${member.email}`}*/}
        {/*                  className="text-blue-600 hover:text-blue-800 hover:underline"*/}
        {/*                >*/}
        {/*                  {member.email}*/}
        {/*                </a>*/}
        {/*              </td>*/}
        {/*              <td className="px-4 py-3">*/}
        {/*                <Badge variant="outline">{member.branch}</Badge>*/}
        {/*              </td>*/}
        {/*              <td className="px-4 py-3 text-right">*/}
        {/*                <div className="flex items-center justify-end space-x-1">*/}
        {/*                  <Button*/}
        {/*                    variant="ghost"*/}
        {/*                    size="sm"*/}
        {/*                    className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"*/}
        {/*                    onClick={() => handleMemberAction('preview', member.id)}*/}
        {/*                    title="Preview"*/}
        {/*                  >*/}
        {/*                    <Eye className="h-4 w-4" />*/}
        {/*                  </Button>*/}
        {/*                  <Button*/}
        {/*                    variant="ghost"*/}
        {/*                    size="sm"*/}
        {/*                    className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"*/}
        {/*                    onClick={() => handleMemberAction('edit', member.id)}*/}
        {/*                    title="Edit"*/}
        {/*                  >*/}
        {/*                    <Edit className="h-4 w-4" />*/}
        {/*                  </Button>*/}
        {/*                  <Button*/}
        {/*                    variant="ghost"*/}
        {/*                    size="sm"*/}
        {/*                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"*/}
        {/*                    onClick={() => handleMemberAction('delete', member.id)}*/}
        {/*                    title="Delete"*/}
        {/*                  >*/}
        {/*                    <Trash2 className="h-4 w-4" />*/}
        {/*                  </Button>*/}
        {/*                </div>*/}
        {/*              </td>*/}
        {/*            </tr>*/}
        {/*          ))}*/}
        {/*        </tbody>*/}
        {/*      </table>*/}
        {/*    </div>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}

        {/* Empty State */}
        {filteredMembers.length === 0 && searchTerm && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              No members found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
      />

      {/* Preview Modal */}
      <PreviewModal
        member={previewMember}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Choose export format</AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => handleExportList('csv')}>
              Export as CSV
            </Button>
            <Button onClick={() => handleExportList('excel')}>
              Export as Excel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>


  );
};

export default MembershipDashboard;
