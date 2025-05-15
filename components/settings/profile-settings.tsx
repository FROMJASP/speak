"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Camera, User, Lock, Trash2, CheckCircle, AlertCircle, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/components/ui/use-toast"

export default function ProfileSettings() {
  const { user, updateProfile, updatePreferences, isLoading } = useUser()
  const { toast } = useToast()

  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [tempFirstName, setTempFirstName] = useState(user?.firstName || "")
  const [tempLastName, setTempLastName] = useState(user?.lastName || "")
  const [tempBio, setTempBio] = useState(user?.bio || "")

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Initialize form data when user data is loaded
  useState(() => {
    if (user) {
      setTempFirstName(user.firstName)
      setTempLastName(user.lastName)
      setTempBio(user.bio)
    }
  })

  const handleSaveName = async () => {
    try {
      await updateProfile({
        firstName: tempFirstName,
        lastName: tempLastName,
      })
      setIsEditingName(false)
      toast({
        title: "Profile updated",
        description: "Your name has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancelNameEdit = () => {
    if (user) {
      setTempFirstName(user.firstName)
      setTempLastName(user.lastName)
    }
    setIsEditingName(false)
  }

  const handleSaveBio = async () => {
    try {
      await updateProfile({
        bio: tempBio,
      })
      setIsEditingBio(false)
      toast({
        title: "Profile updated",
        description: "Your bio has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update your bio. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancelBioEdit = () => {
    if (user) {
      setTempBio(user.bio)
    }
    setIsEditingBio(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    // Password validation would go here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match. Please try again.",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real implementation, this would call an API to change the password
      console.log("Changing password:", passwordData)

      setIsChangingPassword(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update your password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTogglePreference = async (key: keyof typeof user.preferences, value: boolean) => {
    if (!user) return

    try {
      await updatePreferences({
        [key]: value,
      })

      toast({
        title: "Preferences updated",
        description: "Your preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update your preferences. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading || !user) {
    return <div>Loading user data...</div>
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-border">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change profile picture</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update profile picture</DialogTitle>
                    <DialogDescription>Upload a new profile picture or choose from the library.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex justify-center">
                      <Avatar className="h-32 w-32 border-2 border-border">
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt="Profile" />
                        <AvatarFallback>
                          <User className="h-16 w-16" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline">Upload</Button>
                      <Button variant="outline">Remove</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-medium">
                {user.firstName} {user.lastName}
              </h3>
              <div className="flex items-center gap-1 text-xs">
                <div className="bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">{user.plan.toUpperCase()}</div>
                <span className="text-muted-foreground">{user.plan} Plan</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium">Bio</h3>
                <p className="text-sm text-muted-foreground">Tell us a little about yourself.</p>
              </div>
              {!isEditingBio && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingBio(true)} className="h-8">
                  <Edit className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
              )}
            </div>

            {isEditingBio ? (
              <div className="space-y-3">
                <Textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  placeholder="Write a short bio..."
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancelBioEdit} className="h-8">
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveBio} className="h-8">
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm">{user.bio || "No bio provided."}</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium">Email address</h3>
                <p className="text-sm text-muted-foreground">
                  Your email address is used for notifications and sign-in.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-xs">
                <Input value={user.email} readOnly className="pr-8 bg-muted/50" />
                {user.emailVerified && (
                  <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                )}
                {!user.emailVerified && (
                  <AlertCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
                )}
              </div>
              {user.emailVerified ? (
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </span>
              ) : (
                <Button size="sm" variant="outline" className="h-8">
                  Verify
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Change your password to keep your account secure.</p>
              </div>
              <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Lock className="h-3.5 w-3.5 mr-1.5" />
                    Change password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and a new password to update your credentials.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePasswordChange} className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm new password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Update password</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="text-sm">Last updated: 3 months ago</div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Email Preferences</CardTitle>
          <CardDescription>Manage what types of emails you receive from us.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing" className="text-base">
                  Marketing emails
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features, special offers, and promotions.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={user.preferences.marketingEmails}
                onCheckedChange={(checked) => handleTogglePreference("marketingEmails", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="product-updates" className="text-base">
                  Product updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about product updates, new features, and improvements.
                </p>
              </div>
              <Switch
                id="product-updates"
                checked={user.preferences.productUpdates}
                onCheckedChange={(checked) => handleTogglePreference("productUpdates", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">Delete account</h3>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
