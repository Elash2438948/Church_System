import React, { useState } from 'react';
import { X, User, Phone, Mail, Calendar, Save, Briefcase, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';

const formSchema = z.object({
  // Personal Information
  picture: z.instanceof(File).optional(),
  fullName: z.string().min(1, "Full name is required"),
  contact: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long"),
  email: z.string().email("Please enter a valid email"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  hometown: z.string().min(1, "Hometown is required"),
  digitalAddress: z.string().optional(),
  gender: z.string().min(1, "Gender is required"),
  languages: z.string().optional(),
  
  // Membership Information
  disease: z.string().min(1, "Disease is required"),
  circuit: z.string().min(1, "Circuit is required"),
  branch: z.string().min(1, "Branch is required"),
  memberStatus: z.string().min(1, "Member status is required"),
  dateOfAdmission: z.string().min(1, "Date of admission is required"),
  
  // Employment Information
  employmentStatus: z.string().min(1, "Employment status is required"),
  employmentType: z.string().optional(),
  companyName: z.string().optional(),
  employer: z.string().optional(),
  position: z.string().optional(),
  occupation: z.string().optional(),
  
  // Relationship Information
  relationshipStatus: z.string().min(1, "Relationship status is required"),
  spouseName: z.string().optional(),
  spouseContact: z.string().optional(),
  numberOfChildren: z.string().optional(),
  closestRelativeNumber: z.string().optional(),
  
  // Group Information
  group: z.string().min(1, "Group is required"),
  leadershipStatus: z.string().min(1, "Leadership status is required"),
}).superRefine((data, ctx) => {
  // Conditional validation for employment fields
  if (data.employmentStatus === 'Employed') {
    if (!data.employmentType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Employment type is required",
        path: ["employmentType"]
      });
    }
    if (!data.position) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Position is required",
        path: ["position"]
      });
    }
    if (!data.occupation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Occupation is required",
        path: ["occupation"]
      });
    }
    if (data.employmentType === 'Self-Employed' && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company name is required",
        path: ["companyName"]
      });
    }
    if (data.employmentType === 'Employee' && !data.employer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Employer is required",
        path: ["employer"]
      });
    }
  }

  // Conditional validation for relationship fields
  if (data.relationshipStatus === 'Married') {
    if (!data.spouseName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Spouse name is required",
        path: ["spouseName"]
      });
    }
    if (!data.spouseContact) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Spouse contact is required",
        path: ["spouseContact"]
      });
    }
  }

  if (['Single', 'Married', 'Divorced', 'Separated', 'Widowed'].includes(data.relationshipStatus)) {
    if (!data.closestRelativeNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Closest relative number is required",
        path: ["closestRelativeNumber"]
      });
    }
  }

  if (['Married', 'Divorced', 'Separated', 'Widowed'].includes(data.relationshipStatus)) {
    if (!data.numberOfChildren) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Number of children is required",
        path: ["numberOfChildren"]
      });
    }
  }
});

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember?: (member: any) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, onAddMember }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      contact: "",
      email: "",
      dateOfBirth: "",
      nationality: "",
      hometown: "",
      digitalAddress: "",
      gender: "",
      languages: "",
      disease: "",
      circuit: "",
      branch: "",
      memberStatus: "",
      dateOfAdmission: new Date().toISOString().split('T')[0],
      employmentStatus: "",
      relationshipStatus: "",
      group: "",
      leadershipStatus: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const employmentStatus = form.watch("employmentStatus");
  const employmentType = form.watch("employmentType");
  const relationshipStatus = form.watch("relationshipStatus");

  const generateMemberId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
    return `EF/AGO/AGA/${randomNum}`;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newMember = {
        id: Date.now(),
        memberId: generateMemberId(),
        ...values
      };

      if (onAddMember) {
        onAddMember(newMember);
      }

      alert(`Member ${values.fullName} has been successfully added!`);
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-bold">Membership Registration</h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              {/* Picture Upload */}
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload picture</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="w-fit"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Eg. Joe Nyarko"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact */}
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact (one phone number) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Eg. 0240987890"
                            className="pl-10"
                            {...field}
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
                      <FormLabel>Email (should be valid and active) *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Eg. joenyarko@gmail.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="date"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Nationality */}
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. Ghanaian"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Hometown */}
                <FormField
                  control={form.control}
                  name="hometown"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hometown *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. Akim Begoro"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Digital/Postal Address */}
                <FormField
                  control={form.control}
                  name="digitalAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Digital/Postal Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. P. O. Box 7671A, Akim Begoro"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Languages */}
                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language(s) spoken</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. English, Twi"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Membership Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Membership Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Disease */}
                <FormField
                  control={form.control}
                  name="disease"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disease *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. Effiduase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Circuit */}
                <FormField
                  control={form.control}
                  name="circuit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Circuit *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eg. Circuit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Branch */}
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Agogo">Agogo</SelectItem>
                            <SelectItem value="Kumasi">Kumasi</SelectItem>
                            <SelectItem value="Accra">Accra</SelectItem>
                            <SelectItem value="Tamale">Tamale</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Member Status */}
                <FormField
                  control={form.control}
                  name="memberStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member's Status *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Admission */}
                <FormField
                  control={form.control}
                  name="dateOfAdmission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Admission *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="date"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Employment Information
              </h3>
              
              <FormField
                control={form.control}
                name="employmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Status *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Employed">Employed</SelectItem>
                          <SelectItem value="Unemployed">Unemployed</SelectItem>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {employmentStatus === 'Employed' && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type *</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Employment Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                              <SelectItem value="Employee">Employee</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {employmentType === 'Self-Employed' && (
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter company name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {employmentType === 'Employee' && (
                    <FormField
                      control={form.control}
                      name="employer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employer *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter employer name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your position"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occupation *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your occupation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Relationship Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Relationship Information
              </h3>
              
              <FormField
                control={form.control}
                name="relationshipStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship Status *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Relationship Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Separated">Separated</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {relationshipStatus === 'Married' && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                  <FormField
                    control={form.control}
                    name="spouseName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spouse Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter spouse name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spouseContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spouse Contact *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter spouse contact number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {['Married', 'Divorced', 'Separated', 'Widowed'].includes(relationshipStatus) && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                  <FormField
                    control={form.control}
                    name="numberOfChildren"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Children *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter number of children"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {['Single', 'Married', 'Divorced', 'Separated', 'Widowed'].includes(relationshipStatus) && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                  <FormField
                    control={form.control}
                    name="closestRelativeNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closest Relative Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter closest relative's contact number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Group Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Group Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Group */}
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Youth">Youth</SelectItem>
                            <SelectItem value="Women">Women</SelectItem>
                            <SelectItem value="Men">Men</SelectItem>
                            <SelectItem value="Choir">Choir</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Leadership Status */}
                <FormField
                  control={form.control}
                  name="leadershipStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leadership Status *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Leadership Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Leader">Leader</SelectItem>
                            <SelectItem value="Member">Member</SelectItem>
                            <SelectItem value="Executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Submit Registration
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>

        {/* Footer */}
        <div className="px-6 py-3 bg-muted border-t text-xs text-muted-foreground">
          * Required fields. Please make sure all details are accurate before proceeding.
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;