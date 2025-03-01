
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'fa', name: 'فارسی' },
  { code: 'ar', name: 'العربية' },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem('preferred-language', value);
    
    // Handle RTL languages (Arabic and Persian)
    if (value === 'ar' || value === 'fa') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = value;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = value;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select 
        value={i18n.language} 
        onValueChange={handleLanguageChange}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
