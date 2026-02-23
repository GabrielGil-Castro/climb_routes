import { AlertTriangle, Star, X, ArrowUp, Bolt, Calendar, MapPin, Info } from 'lucide-react';

export default function RouteModal({ route, onClose }) {
  if (!route) return null;

  // Função para cor do grade
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{route.route}</h2>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {route.area} → {route.sector}
              </p>
              {route.subsector && (
                <p className="text-sm text-gray-500 ml-5">{route.subsector}</p>
              )}
            </div>
            
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* SAFETY WARNING */}
          {route.problem_reported && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900">Safety Warning</h4>
                  <p className="text-sm text-red-700">{route.problem_description}</p>
                </div>
              </div>
            </div>
          )}

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Grade</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xl font-bold ${getGradeColor(route.grade)}`}>
                {route.grade}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <ArrowUp  className="w-4 h-4" />
                Height
              </div>
              <div className="text-2xl font-bold text-gray-900">{route.height}m</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <Bolt className="w-4 h-4" />
                Bolts
              </div>
              <div className="text-2xl font-bold text-gray-900">{route.bolts}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Quality</div>
              <div className="flex gap-1">
                {[...Array(route.stars || 0)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
                {route.stars === 0 && <span className="text-gray-400 text-sm">Not rated</span>}
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-4">
            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Description
              </h3>
              <p className="text-gray-700">{route.description}</p>
            </div>

            {/* First Ascent */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                First Ascent
              </h3>
              <p className="text-gray-700">{route.first_ascent} ({route.fa_year})</p>
            </div>

            {/* Bolt Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bolt Information</h3>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Type:</span> {route.bolt_info}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Rebolted:</span> {route.rebolted}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Estimated safe until:</span>{' '}
                  <span className={route.safe_until > 2025 ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>
                    {route.safe_until}
                  </span>
                </p>
              </div>
            </div>

            {/* 27Crags Link */}
            {route.crags_27 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">External Resources</h3>
                <a 
                  href="#" 
                  target="_blank"
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  View on 27Crags →
                </a>
              </div>
            )}
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}