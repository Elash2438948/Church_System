import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        fullName: 'Agogo Bethel Branch Secretary',
        username: 'AgoBetBraSec',
        email: 'agogobethelmethodistchurch@gmail.com',
        contact: '0542180657',
        portfolio: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            portfolio: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Profile updated:', formData);
    };

    return (
        <div className="min-h-screen bg-background p-6">
        <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <CardTitle className="text-2xl">My Profile</CardTitle>
    <p className="text-sm text-muted-foreground">Edit Profile</p>
    </CardHeader>

    <CardContent>
    <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-4">
    <h3 className="text-lg font-medium">Complete your profile</h3>

    <div className="space-y-2">
    <Label htmlFor="fullName">Fullname</Label>
        <Input
    id="fullName"
    name="fullName"
    value={formData.fullName}
    onChange={handleChange}
    />
    </div>

    <div className="space-y-2">
    <Label htmlFor="username">Username</Label>
        <Input
    id="username"
    name="username"
    value={formData.username}
    onChange={handleChange}
    />
    </div>

    <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
        <Input
    id="email"
    name="email"
    type="email"
    value={formData.email}
    onChange={handleChange}
    />
    </div>

    <div className="space-y-2">
    <Label htmlFor="contact">Contact</Label>
        <Input
    id="contact"
    name="contact"
    value={formData.contact}
    onChange={handleChange}
    />
    </div>

    <div className="space-y-2">
        <Label>Current Portfolio</Label>
    <Select value={formData.portfolio} onValueChange={handleSelectChange}>
    <SelectTrigger>
        <SelectValue placeholder="– Choose Portfolio –" />
    </SelectTrigger>
    <SelectContent>
    <SelectItem value="effiduase">Effiduase</SelectItem>
        <SelectItem value="agogo">Agogo</SelectItem>
        <SelectItem value="branch1">Branch 1</SelectItem>
    <SelectItem value="branch2">Branch 2</SelectItem>
    </SelectContent>
    </Select>
    </div>
    </div>

    <div className="space-y-4 pt-4 border-t">
    <h3 className="text-lg font-medium">Change Password</h3>

    <div className="space-y-2">
    <Label htmlFor="currentPassword">Current Password</Label>
    <Input
    id="currentPassword"
    name="currentPassword"
    type="password"
    value={formData.currentPassword}
    onChange={handleChange}
    placeholder="Enter current password"
        />
        </div>

        <div className="space-y-2">
    <Label htmlFor="newPassword">New Password</Label>
    <Input
    id="newPassword"
    name="newPassword"
    type="password"
    value={formData.newPassword}
    onChange={handleChange}
    placeholder="Enter new password"
        />
        </div>

        <div className="space-y-2">
    <Label htmlFor="confirmPassword">Confirm Password</Label>
    <Input
    id="confirmPassword"
    name="confirmPassword"
    type="password"
    value={formData.confirmPassword}
    onChange={handleChange}
    placeholder="Confirm new password"
        />
        </div>
        </div>

        <div className="flex justify-end pt-4">
    <Button type="submit" className="bg-primary text-primary-foreground">
        UPDATE PROFILE
    </Button>
    </div>
    </form>
    </CardContent>
    </Card>
    </div>
);
};

export default ProfilePage;