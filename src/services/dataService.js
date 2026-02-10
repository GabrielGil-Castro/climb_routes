import data from "../data/routes.json";

/* ========= ÁREAS ========= */

export function getAreas() {
  return data.areas;
}

/* ========= SECTORS ========= */

export function getSectorsByArea(areaId) {
  return data.sectors.filter(
    sector => sector.area_id === areaId
  );
}

/* ========= SUBSECTORS ========= */

export function getSubsectorsBySector(sectorId) {
  return data.subsectors.filter(
    sub => sub.sector_id === sectorId
  );
}

/* ========= ROUTES ========= */

export function getRoutes(filters = {}) {
  return data.routes.filter(route => {
    if (filters.areaId && route.area_id !== filters.areaId) return false;
    if (filters.sectorId && route.sector_id !== filters.sectorId) return false;
    if (filters.subsectorId && route.subsector_id !== filters.subsectorId) return false;

    if (filters.status && route.status !== filters.status) return false;
    if (filters.minGrade && route.grade < filters.minGrade) return false;

    if (filters.problemReported === true && !route.problem_reported) return false;

    return true;
  });
}

/* ========= ROUTE BY ID ========= */

export function getRouteById(routeId) {
  return data.routes.find(route => route.id === routeId);
}
