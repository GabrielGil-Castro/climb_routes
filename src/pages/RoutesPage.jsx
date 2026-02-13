import { useEffect, useState, useMemo } from "react";
import RouteCard from "../components/RouteCard";
import RouteModal from "../components/RouteModal";
import Filters from "../components/Filters";
import { getRoutes, getAreas, getSectorsByArea } from "../services/dataService";
import { Mountain } from 'lucide-react';


export default function Home() {
  const [allRoutes, setAllRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    areaId: null,
    sectorId: null,
    minGrade: null,
    safetyStatus: 'all'
  });

  const areas = getAreas();
  const sectors = filters.areaId ? getSectorsByArea(filters.areaId) : [];

  useEffect(() => {
    const data = getRoutes();
    setAllRoutes(data);
  }, []);

  // FILTER LOGIC
  const filteredRoutes = useMemo(() => {
    return allRoutes.filter(route => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          route.route.toLowerCase().includes(searchLower) ||
          route.area.toLowerCase().includes(searchLower) ||
          route.sector.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Area filter
      if (filters.areaId && route.area_id !== filters.areaId) return false;

      // Sector filter
      if (filters.sectorId && route.sector_id !== filters.sectorId) return false;

      // Grade filter
      if (filters.minGrade && route.grade < filters.minGrade) return false;

      // Safety filter
      if (filters.safetyStatus === 'safe') {
        if (route.problem_reported || route.safe_until <= 2025) return false;
      }
      if (filters.safetyStatus === 'risk') {
        if (!route.problem_reported && route.safe_until > 2025) return false;
      }
      if (filters.safetyStatus === 'reported') {
        if (!route.problem_reported) return false;
      }

      return true;
    });
  }, [allRoutes, filters]);

  return (
    <div className="min-h-screen bg-linear-to-b py-14 from-slate-50 via-white to-slate-200">

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* FILTERS */}
        <Filters 
          filters={filters}
          onFilterChange={setFilters}
          areas={areas}
          sectors={sectors}
        />

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Total Routes</div>
            <div className="text-2xl font-bold text-gray-900">{filteredRoutes.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Safe Routes</div>
            <div className="text-2xl font-bold text-green-600">
              {filteredRoutes.filter(r => !r.problem_reported && r.safe_until > 2025).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">At Risk</div>
            <div className="text-2xl font-bold text-orange-600">
              {filteredRoutes.filter(r => r.problem_reported || r.safe_until <= 2025).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Areas</div>
            <div className="text-2xl font-bold text-blue-600">{areas.length}</div>
          </div>
        </div>

        {/* ROUTES GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRoutes.map(route => (
            <RouteCard
              key={route.id}
              route={route}
              onSelect={setSelectedRoute}
            />
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No routes found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </main>

      {/* MODAL */}
      {selectedRoute && (
        <RouteModal
          route={selectedRoute}
          onClose={() => setSelectedRoute(null)}
        />
      )}
    </div>
  );
}