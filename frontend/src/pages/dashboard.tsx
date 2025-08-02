import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { Eye, Trash2, Search } from "lucide-react";

interface Member {
  id: string;
  name: string;
  contact: string;
  email: string;
  branch: string;
}

const initialMembers: Member[] = [
  {
    id: "EF/AGO/AGA/0001",
    name: "Asare Baffour",
    contact: "0247878880",
    email: "baffoursasare94@gmail.com",
    branch: "Agogo",
  },
  {
    id: "EF/AGO/AGA/0002",
    name: "Lordia Oforiwaa Gyasi",
    contact: "0596240942",
    email: "akuasherry2002@gmail.com",
    branch: "Agogo",
  },
  {
    id: "EF/AGO/AGA/0003",
    name: "Kwame Nkrumah",
    contact: "0201234567",
    email: "kwame.nkrumah@example.com",
    branch: "Kumasi",
  },
  {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  },
  {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  }, {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  },
  {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  },
  {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  },
  {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  },
  {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  },
  {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  },
    {
    id: "EF/AGO/AGA/0004",
    name: "Ama Ata Aidoo",
    contact: "0245678901",
    email: "ama.ata@example.com",
    branch: "Accra",
  },


];

export default function Dashboard() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingMember, setViewingMember] = useState<Member | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  // Filter members based on search term
  const filteredMembers = members.filter((member) =>
      Object.values(member).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleView = (member: Member) => {
    setViewingMember(member);
  };

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      setMembers(members.filter((member) => member.id !== memberToDelete.id));
      setShowDeleteModal(false);
      setMemberToDelete(null);
    }
  };

  const closeModal = () => {
    setViewingMember(null);
    setShowDeleteModal(false);
    setMemberToDelete(null);
  };

  const closeOnOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Main Dashboard</h1>
            <div className="text-sm mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">Username: <span className="font-semibold text-primary">AgoBetBraSec</span></Badge>
              <Badge variant="secondary">Privileges: <span className="font-semibold text-primary">Level 5</span></Badge>
              <Badge variant="secondary">Position: <span className="font-semibold text-primary">Admin</span></Badge>
              <Badge variant="secondary">Branch: <span className="font-semibold text-primary">Agogo</span></Badge>
            </div>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search members..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">Membership</p>
              <p className="text-2xl font-bold">{members.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">Males</p>
              <p className="text-2xl font-bold">
                {members.filter((member) => member.name.includes("Kwame")).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">Females</p>
              <p className="text-2xl font-bold">
                {members.filter((member) => member.name.includes("Lordia")).length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">Active Members</p>
              <p className="text-2xl font-bold">{members.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <div>
            Registered Members{" "}
            <Badge className="ml-2">{filteredMembers.length}</Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {filteredMembers.length} of {members.length} members
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


        {/* View Member Modal */}
        {viewingMember && (
            <div
                className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50"
                onClick={closeOnOverlayClick}
            >
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Member Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Member ID</p>
                    <p>{viewingMember.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p>{viewingMember.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p>{viewingMember.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{viewingMember.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Branch</p>
                    <p>{viewingMember.branch}</p>
                  </div>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end space-x-2">
                  <Button variant="outline" onClick={closeModal}>
                    Close
                  </Button>
                </div>
              </Card>
            </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && memberToDelete && (
            <div
                className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50"
                onClick={closeOnOverlayClick}
            >
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Confirm Deletion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Are you sure you want to delete member{" "}
                    <strong>{memberToDelete.name}</strong> (ID:{" "}
                    {memberToDelete.id})? This action cannot be undone.
                  </p>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end space-x-2">
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button
                      variant="destructive"
                      onClick={confirmDelete}
                      className="bg-destructive hover:bg-destructive/20"
                  >
                    Delete Member
                  </Button>
                </div>
              </Card>
            </div>
        )}
      </div>
  );
}