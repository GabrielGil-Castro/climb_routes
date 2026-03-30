import React, { useState, useMemo } from 'react';
import { Search, Mountain, Filter, AlertTriangle, Info, Star, MapPin, Calendar, Anchor, TrendingUp } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [safetyFilter, setSafetyFilter] = useState('all');
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Sample climbing routes data
  const routes = [
    {
      id: 1,
      area: "Scogliera di Salinella - Centro",
      sector: "Bunker",
      subsector: "Canalino Gully",
      route: "Oktoberfest",
      grade: "7b",
      height: 16,
      bolts: 9,
      stars: 1,
      firstAscent: "A. Lind",
      year: 2013,
      boltInfo: "Bolt-in and Hanger",
      safeUntil: 2013,
      hasIssues: false,
      description: "Short but tricky."
    },
    {
      id: 2,
      area: "Scogliera di Salinella - Centro",
      sector: "Bunker",
      subsector: "Grotta della Palma",
      route: "Profondo Rosso",
      grade: "6c+",
      height: 26,
      bolts: 11,
      stars: 1,
      firstAscent: "D. Arena, C. Cianciolo",
      year: 2006,
      boltInfo: "Bolt-in Titanium",
      safeUntil: 2056,
      hasIssues: false,
      description: "Steep first part and then technical moves on the white rock."
    },
    {
      id: 3,
      area: "Monte Monaco",
      sector: "Cattedrale nel Deserto",
      subsector: "",
      route: "Kellogs",
      grade: "6b",
      height: 25,
      bolts: 9,
      stars: 3,
      firstAscent: "T. Fickert",
      year: 1992,
      boltInfo: "Bolt-in and Hanger",
      safeUntil: 2013,
      hasIssues: false,
      description: "Great mid-grade vertical climbing. Excellent texture and solid holds."
    },
    {
      id: 4,
      area: "Rocca Firriato",
      sector: "ACDC",
      subsector: "",
      route: "Big Guns",
      grade: "7b",
      height: 24,
      bolts: 10,
      stars: 1,
      firstAscent: "D. Arena",
      year: 2011,
      boltInfo: "Bolt-in and Hanger",
      safeUntil: 2011,
      hasIssues: true,
      problemReported: "Attention: In 2019 fire destroyed the rock. Holds break easily.",
      description: "Attention: In 2019 fire destroyed the rock. Holds break easily."
    },
    {
      id: 5,
      area: "Scogliera di Salinella - Nord",
      sector: "Cala Mancina",
      subsector: "Grotta di Cala Mancina",
      route: "Frida in the Water",
      grade: "7c+",
      height: 26,
      bolts: 13,
      stars: 1,
      firstAscent: "M. Monaco",
      year: 2010,
      boltInfo: "Bolt-in Titanium",
      safeUntil: 2060,
      hasIssues: false,
      description: "Amazing endurance test piece!"
    },
    {
      id: 6,
      area: "Macari",
      sector: "Crown of Aragon",
      subsector: "",
      route: "Buon Natale",
      grade: "6c+",
      height: 23,
      bolts: 11,
      stars: 2,
      firstAscent: "D.Arena, T.Tamagnini",
      year: 2008,
      boltInfo: "Bolt-in Duplex",
      safeUntil: 2033,
      hasIssues: false,
      description: "Leftmost route. Jug fest."
    }
  ];

  const areas = [...new Set(routes.map(r => r.area))];
  const grades = ['4a', '4b', '4c', '5a', '5b', '5c', '6a', '6b', '6c', '7a', '7b', '7c', '8a', '8b'];

  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const matchesSearch = route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          route.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          route.sector.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGrade = gradeFilter === 'all' || route.grade.startsWith(gradeFilter);
      const matchesArea = areaFilter === 'all' || route.area === areaFilter;
      const matchesSafety = safetyFilter === 'all' || 
                           (safetyFilter === 'safe' && !route.hasIssues && route.safeUntil > 2025) ||
                           (safetyFilter === 'risk' && (route.hasIssues || route.safeUntil <= 2025));
      
      return matchesSearch && matchesGrade && matchesArea && matchesSafety;
    });
  }, [searchTerm, gradeFilter, areaFilter, safetyFilter]);

  const RouteCard = ({ route }) => (
    <div 
      onClick={() => setSelectedRoute(route)}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{route.route}</h3>
          <p className="text-sm text-gray-600">{route.sector}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            route.grade.startsWith('4') ? 'bg-green-100 text-green-800' :
            route.grade.startsWith('5') ? 'bg-blue-100 text-blue-800' :
            route.grade.startsWith('6') ? 'bg-yellow-100 text-yellow-800' :
            route.grade.startsWith('7') ? 'bg-orange-100 text-orange-800' :
            'bg-red-100 text-red-800'
          }`}>
            {route.grade}
          </span>
          {route.hasIssues && (
            <AlertTriangle className="w-5 h-5 text-red-500" />
          )}
        </div>
      </div>
      
      <div className="flex gap-4 text-sm text-gray-600 mb-2">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {route.height}m
        </span>
        <span className="flex items-center gap-1">
          <Anchor className="w-4 h-4" />
          {route.bolts} bolts
        </span>
        <span className="flex items-center gap-1">
          {[...Array(route.stars)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </span>
      </div>
      
      <p className="text-xs text-gray-500 mb-2">{route.description}</p>
      
      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
        <span>FA: {route.firstAscent} ({route.year})</span>
        <span className={route.safeUntil > 2025 ? 'text-green-600' : 'text-orange-600'}>
          Safe until {route.safeUntil}
        </span>
      </div>
    </div>
  );

  const RouteDetail = ({ route, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{route.route}</h2>
              <p className="text-gray-600">{route.area} → {route.sector}</p>
              {route.subsector && <p className="text-sm text-gray-500">{route.subsector}</p>}
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {route.hasIssues && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900">Safety Warning</h4>
                  <p className="text-sm text-red-700">{route.problemReported}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Grade</div>
              <div className="text-2xl font-bold text-gray-900">{route.grade}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Height</div>
              <div className="text-2xl font-bold text-gray-900">{route.height}m</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Bolts</div>
              <div className="text-2xl font-bold text-gray-900">{route.bolts}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Quality</div>
              <div className="flex gap-1">
                {[...Array(route.stars)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{route.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">First Ascent</h3>
              <p className="text-gray-700">{route.firstAscent} ({route.year})</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Bolt Information</h3>
              <p className="text-gray-700">{route.boltInfo}</p>
              <p className="text-sm text-gray-600 mt-1">
                Estimated safe until: <span className={route.safeUntil > 2025 ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>{route.safeUntil}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Mountain className="w-8 h-8" />
            <h1 className="text-3xl font-bold">San Vito Lo Capo</h1>
          </div>
          <p className="text-blue-100">Climbing Guide & Route Finder</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search routes, sectors, or areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Grades</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Areas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Safety</label>
              <select
                value={safetyFilter}
                onChange={(e) => setSafetyFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Routes</option>
                <option value="safe">Safe Routes</option>
                <option value="risk">Routes at Risk</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Total Routes</div>
            <div className="text-2xl font-bold text-gray-900">{filteredRoutes.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Safe Routes</div>
            <div className="text-2xl font-bold text-green-600">
              {filteredRoutes.filter(r => !r.hasIssues && r.safeUntil > 2025).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">At Risk</div>
            <div className="text-2xl font-bold text-orange-600">
              {filteredRoutes.filter(r => r.hasIssues || r.safeUntil <= 2025).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Areas</div>
            <div className="text-2xl font-bold text-blue-600">{areas.length}</div>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No routes found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      {selectedRoute && (
        <RouteDetail route={selectedRoute} onClose={() => setSelectedRoute(null)} />
      )}
    </div>
  );
};

export default App;