'use client'

import { ChevronDown, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-2 text-slate-700 hover:border-[#4E56C0] hover:bg-slate-50 hover:text-[#4E56C0]"
        >
          <Avatar className="h-8 w-8 border border-slate-200">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-[#4E56C0] text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[110px] truncate text-sm font-semibold sm:inline">
            {user?.name || 'Account'}
          </span>
          <ChevronDown className="hidden h-4 w-4 sm:inline" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 border-slate-200 bg-white">
        <div className="flex items-center gap-3 p-3">
          <Avatar className="h-10 w-10 border border-slate-200">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-[#4E56C0] text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-slate-900">{user?.name}</span>
            <span className="truncate text-xs text-slate-500">{user?.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer font-semibold text-red-600 focus:bg-red-50 focus:text-red-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
