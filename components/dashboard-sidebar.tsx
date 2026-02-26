'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BarChart3, FileText, History, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
    { icon: FileText, label: 'Analyze Text', href: '/dashboard/analyze' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-background border-b border-border px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold text-foreground">TextIQ</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 z-40 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">TextIQ</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
              >
                <Icon size={20} className="group-hover:text-sidebar-primary" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Avatar */}
        <div className="p-4 border-t border-sidebar-border">
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-sidebar-foreground">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60">john@example.com</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main content spacer for mobile */}
      <div className="pt-16 md:pt-0" />
    </>
  );
}
