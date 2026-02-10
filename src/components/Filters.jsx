import { Search, Filter } from 'lucide-react';

export default function Filters({ filters, onFilterChange, areas, sectors }) {
  const grades = ['4a', '4b', '4c', '5a', '5b', '5c', '6a', '6b', '6c', '7a', '7b', '7c', '8a', '8b', '8c'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* SEARCH */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search routes, sectors, or areas..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* FILTERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* AREA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area
          </label>
          <select
            value={filters.areaId || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              areaId: e.target.value ? Number(e.target.value) : null,
              sectorId: null // Reset sector when area changes
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Areas</option>
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>

        {/* SECTOR */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <select
            value={filters.sectorId || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              sectorId: e.target.value ? Number(e.target.value) : null 
            })}
            disabled={!filters.areaId}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector.id} value={sector.id}>{sector.name}</option>
            ))}
          </select>
        </div>

        {/* GRADE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Grade
          </label>
          <select
            value={filters.minGrade || ''}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              minGrade: e.target.value || null 
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Grades</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}+</option>
            ))}
          </select>
        </div>

        {/* SAFETY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Safety Status
          </label>
          <select
            value={filters.safetyStatus || 'all'}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              safetyStatus: e.target.value 
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Routes</option>
            <option value="safe">Safe Routes</option>
            <option value="risk">At Risk</option>
            <option value="reported">Problem Reported</option>
          </select>
        </div>
      </div>

      {/* ACTIVE FILTERS INDICATOR */}
      {(filters.search || filters.areaId || filters.sectorId || filters.minGrade || filters.safetyStatus !== 'all') && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span>Filters active</span>
          <button
            onClick={() => onFilterChange({
              search: '',
              areaId: null,
              sectorId: null,
              minGrade: null,
              safetyStatus: 'all'
            })}
            className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}