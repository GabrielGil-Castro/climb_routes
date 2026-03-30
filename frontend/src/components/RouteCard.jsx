import { Star, AlertTriangle, Bolt, ArrowUp } from "lucide-react";

export default function RouteCard({ route, onSelect }) {
  // Função para determinar a cor do badge de grade
  const getGradeColor = (grade) => {
    if (!grade) return 'bg-gray-100 text-gray-800';
    const gradeNum = grade.charAt(0);
    if (gradeNum === '4') return 'bg-green-100 text-green-800';
    if (gradeNum === '5') return 'bg-blue-100 text-blue-800';
    if (gradeNum === '6') return 'bg-yellow-100 text-yellow-800';
    if (gradeNum === '7') return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div
      onClick={() => onSelect(route)}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:bg-blue-50 transition-shadow cursor-pointer"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{route.route}</h3>
          <p className="text-sm text-gray-600">{route.sector}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(route.grade)}`}>
            {route.grade}
          </span>
          {route.problem_reported && (
            <AlertTriangle className="w-5 h-5 text-red-500" />
          )}
        </div>
      </div>

      {/* META INFO */}
      <div className="flex gap-4 text-sm text-gray-600 mb-2">
        <span className="flex items-center gap-1">
          <ArrowUp className="w-4 h-4" />
          {route.height}m
        </span>
        <span className="flex items-center gap-1">
          <Bolt className="w-4 h-4" />
          {route.bolts} bolts
        </span>
        <span className="flex items-center gap-1">
          {[...Array(route.stars || 0)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-xs text-gray-500 mb-2 line-clamp-2">{route.description}</p>

      {/* FOOTER */}
      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
        <span>FA: {route.first_ascent} ({route.fa_year})</span>
        <span className={route.safe_until > 2025 ? 'text-green-600' : 'text-orange-600'}>
          Safe until {route.safe_until}
        </span>
      </div>
    </div>
  );
}