
import { useTranslation } from "react-i18next";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES } from "@/data/categories";

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/lovable-uploads/b7de9b33-d899-4c4a-a399-3655bbb16b4c.png"
              alt="Outwit Shop"
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-semibold text-gray-900">Outwit Shop</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span className="sr-only">{t('header.notifications')}</span>
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="sr-only">{t('header.menu')}</span>
                <MoreVertical className="w-6 h-6 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => navigate(`/category/${category.id}`)}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-accent" />
                    <span>{category.name}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
