"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Ban, FilePenLine, Send, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/drafts", label: "Drafts", icon: FilePenLine },
  { href: "/sends", label: "Envíos", icon: Send },
  { href: "/opt-outs", label: "Opt-outs", icon: Ban },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-xs border-r border-white/60 bg-[#163029] px-5 py-6 text-white">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
            Interchile Clima
          </p>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Prospecting Panel
            </h1>
            <p className="text-sm text-white/72">
              Operación comercial interna
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-white/14 text-white"
                    : "text-white/72 hover:bg-white/8 hover:text-white",
                )}
                href={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
