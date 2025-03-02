
type SourceColorMap = {
  [key: string]: string;
};

export const getBadgeColor = (source?: string): string => {
  const sourceColorMap: SourceColorMap = {
    'aliexpress': "bg-red-500 hover:bg-red-600",
    'shein': "bg-purple-500 hover:bg-purple-600",
    'otto': "bg-blue-600 hover:bg-blue-700",
    'zalando': "bg-teal-500 hover:bg-teal-600",
    'harcoo': "bg-amber-500 hover:bg-amber-600",
    'lounge': "bg-pink-500 hover:bg-pink-600",
    'flaconi': "bg-emerald-500 hover:bg-emerald-600"
  };

  return sourceColorMap[source || ''] || "bg-gray-500 hover:bg-gray-600";
};
