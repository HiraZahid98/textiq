'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ChevronRight, Mail, Bell, Lock, Palette, BarChart3, LogOut, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [analysisAlerts, setAnalysisAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [exportSaved, setExportSaved] = useState(false);

  const handleSaveSettings = () => {
    setExportSaved(true);
    setTimeout(() => setExportSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences and application settings</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Profile
          </CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Address</p>
              <p className="text-sm text-muted-foreground">user@example.com</p>
            </div>
            <Button variant="outline">Change</Button>
          </div>
          <div className="border-t pt-6">
            <p className="font-medium text-foreground mb-2">Account Status</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Active</Badge>
              <p className="text-sm text-muted-foreground">Your account is in good standing</p>
            </div>
          </div>
          <div className="border-t pt-6">
            <p className="font-medium text-foreground mb-2">Subscription Plan</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pro Plan</p>
                <p className="text-xs text-muted-foreground mt-1">Renews on March 25, 2026</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Control how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Analysis Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when analyses complete</p>
              </div>
              <Switch checked={analysisAlerts} onCheckedChange={setAnalysisAlerts} />
            </div>
          </div>
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Report</p>
                <p className="text-sm text-muted-foreground">Receive a weekly summary of your usage</p>
              </div>
              <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Preferences
          </CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Use dark theme throughout the app</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="border-t pt-6">
            <p className="font-medium text-foreground mb-4">Text Analysis Defaults</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Auto-format results</p>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Include readability score</p>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API & Integration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            API & Integrations
          </CardTitle>
          <CardDescription>Manage your API keys and integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-foreground text-sm">API Key</p>
              <Badge variant="outline">Active</Badge>
            </div>
            <code className="text-xs text-muted-foreground break-all">sk_live_1a2b3c4d5e6f7g8h9i0j</code>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">Copy</Button>
              <Button variant="outline" size="sm">Regenerate</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <span>Change Password</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>Two-Factor Authentication</span>
            <Badge variant="outline">Disabled</Badge>
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>Active Sessions</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
          <CardDescription className="text-red-700">Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-between border-red-200 text-red-600 hover:text-red-700 hover:bg-red-100">
            <span className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete All Data
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between border-red-200 text-red-600 hover:text-red-700 hover:bg-red-100">
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Delete Account
            </span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Save Section */}
      <div className="flex gap-4 pb-8">
        <Button onClick={handleSaveSettings} className="flex-1">
          {exportSaved ? 'Settings Saved!' : 'Save Changes'}
        </Button>
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}
