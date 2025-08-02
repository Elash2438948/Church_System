import { useState, useMemo } from 'react';
import { Search, Upload, ChevronLeft, ChevronRight, User, ChevronUp, Download, X } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';

type Report = {
    id: string;
    filename: string;
    size: string;
    type: 'Monthly' | 'Quarterly' | 'Annual' | 'Special';
    submissionDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    downloadUrl?: string;
};

type SortDirection = 'asc' | 'desc';
type SortField = 'filename' | 'size' | 'type' | 'submissionDate';

const ReportsDashboard = () => {
    // State management
    const [searchTerm, setSearchTerm] = useState('');
    const [tableSearch, setTableSearch] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<SortField>('submissionDate');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [reportType, setReportType] = useState<string>('');

    // Sample data
    const reports: Report[] = [
        {
            id: '1',
            filename: 'Q2_Financials_2025.pdf',
            size: '2.4 MB',
            type: 'Quarterly',
            submissionDate: '2025-06-30',
            status: 'Approved',
            downloadUrl: '#'
        },
        {
            id: '2',
            filename: 'Annual_Report_2024.pdf',
            size: '5.1 MB',
            type: 'Annual',
            submissionDate: '2025-03-15',
            status: 'Approved',
            downloadUrl: '#'
        },
        {
            id: '3',
            filename: 'July_2025_Operations.pdf',
            size: '1.8 MB',
            type: 'Monthly',
            submissionDate: '2025-08-01',
            status: 'Pending'
        }
    ];

    // Derived values
    const totalReports = reports.length;
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Filter and sort reports
    const filteredReports = useMemo(() => {
        let result = [...reports];

        if (tableSearch) {
            const searchTerm = tableSearch.toLowerCase();
            result = result.filter(report =>
                report.filename.toLowerCase().includes(searchTerm) ||
                report.type.toLowerCase().includes(searchTerm)
            );
        }

        result.sort((a, b) => {
            let comparison = 0;

            switch (sortField) {
                case 'filename':
                    comparison = a.filename.localeCompare(b.filename);
                    break;
                case 'size': {
                    const sizeA = parseFloat(a.size.split(' ')[0]);
                    const sizeB = parseFloat(b.size.split(' ')[0]);
                    comparison = sizeA - sizeB;
                    break;
                }
                case 'type':
                    comparison = a.type.localeCompare(b.type);
                    break;
                case 'submissionDate':
                    comparison = new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime();
                    break;
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [reports, tableSearch, sortField, sortDirection]);

    // Pagination
    const paginatedReports = useMemo(() => {
        const startIndex = (currentPage - 1) * entriesPerPage;
        return filteredReports.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredReports, currentPage, entriesPerPage]);

    const totalPages = Math.ceil(filteredReports.length / entriesPerPage);

    // Handlers
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleEntriesPerPageChange = (value: string) => {
        setEntriesPerPage(Number(value));
        setCurrentPage(1);
    };

    const handleDownload = (report: Report) => {
        if (report.downloadUrl) {
            window.open(report.downloadUrl, '_blank');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmitReport = () => {
        if (!reportType || !selectedFile) {
            alert('Please select both report type and file');
            return;
        }

        // Here you would typically upload the file to your backend
        console.log('Submitting report:', {
            type: reportType,
            file: selectedFile
        });

        // Reset form and close modal
        setIsSubmitModalOpen(false);
        setSelectedFile(null);
        setReportType('');
    };

    // Render sort indicator
    const renderSortIndicator = (field: SortField) => {
        if (sortField !== field) return null;
        return (
            <ChevronUp
                className={`h-3 w-3 transition-transform ${
                    sortDirection === 'desc' ? 'rotate-180' : ''
                }`}
            />
        );
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-background">
                <div className="flex items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-semibold text-foreground">Reports</h1>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                className="w-64 pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="p-6 space-y-6">
                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setIsSubmitModalOpen(true)}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        SUBMIT REPORT
                    </Button>
                </div>

                {/* Submit Report Modal */}
                <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Submit New Report</DialogTitle>
                            <DialogDescription>
                                Choose the report type and select the file to upload
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reportType">Report Type</Label>
                                <Select value={reportType} onValueChange={setReportType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select report type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Monthly">Monthly</SelectItem>
                                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                                        <SelectItem value="Annual">Annual</SelectItem>
                                        <SelectItem value="Special">Special</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reportFile">Report File</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="reportFile"
                                        type="file"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {selectedFile && (
                                    <div className="text-sm text-muted-foreground">
                                        Selected: {selectedFile.name}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsSubmitModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmitReport}
                                disabled={!reportType || !selectedFile}
                            >
                                Submit
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Submitted Reports Card */}
                <Card className="bg-secondary text-secondary-foreground">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            Submitted Reports
                            <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                {totalReports}
                            </Badge>
                        </CardTitle>
                        <p className="text-sm opacity-90">
                            Reports submitted as at {currentDate}
                        </p>
                    </CardHeader>
                </Card>

                {/* No Data Alert - only shown when there's truly no data */}
                {reports.length === 0 && (
                    <Alert variant="destructive" className="bg-destructive/10 text-destructive">
                        <AlertDescription className="text-destructive">
                            Sorry! No reports available
                        </AlertDescription>
                    </Alert>
                )}

                {/* Data Table Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Show</span>
                                <Select
                                    value={entriesPerPage.toString()}
                                    onValueChange={handleEntriesPerPageChange}
                                >
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">entries</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Search:</span>
                                <Input
                                    className="w-32"
                                    value={tableSearch}
                                    onChange={(e) => setTableSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-primary">
                                        <button
                                            className="flex items-center gap-1 hover:underline"
                                            onClick={() => handleSort('filename')}
                                        >
                                            Filename
                                            {renderSortIndicator('filename')}
                                        </button>
                                    </TableHead>
                                    <TableHead className="text-primary">
                                        <button
                                            className="flex items-center gap-1 hover:underline"
                                            onClick={() => handleSort('size')}
                                        >
                                            Size
                                            {renderSortIndicator('size')}
                                        </button>
                                    </TableHead>
                                    <TableHead className="text-primary">
                                        <button
                                            className="flex items-center gap-1 hover:underline"
                                            onClick={() => handleSort('type')}
                                        >
                                            Report Type
                                            {renderSortIndicator('type')}
                                        </button>
                                    </TableHead>
                                    <TableHead className="text-primary">
                                        <button
                                            className="flex items-center gap-1 hover:underline"
                                            onClick={() => handleSort('submissionDate')}
                                        >
                                            Submission Date
                                            {renderSortIndicator('submissionDate')}
                                        </button>
                                    </TableHead>
                                    <TableHead className="text-primary">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedReports.length > 0 ? (
                                    paginatedReports.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell className="font-medium">{report.filename}</TableCell>
                                            <TableCell>{report.size}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="capitalize">
                                                    {report.type.toLowerCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(report.submissionDate).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDownload(report)}
                                                    disabled={!report.downloadUrl}
                                                    title={report.downloadUrl ? 'Download report' : 'Download not available'}
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            {tableSearch ? 'No matching reports found' : 'No reports available'}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing{' '}
                        {filteredReports.length > 0 ? (
                            <>
                                {(currentPage - 1) * entriesPerPage + 1} to{' '}
                                {Math.min(currentPage * entriesPerPage, filteredReports.length)} of{' '}
                                {filteredReports.length} entries
                            </>
                        ) : (
                            '0 to 0 of 0 entries'
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Prev
                        </Button>
                        <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage >= totalPages || filteredReports.length === 0}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsDashboard;