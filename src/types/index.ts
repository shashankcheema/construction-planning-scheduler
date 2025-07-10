// Area Statement Data Structure (matches area-statement.json)

export interface AreaStatement {
  site_details: {
    actual_site_area: {
      sqm: number;
      sqyds: number;
    };
    affected_area: {
      road_widening_ht_lines: {
        sqm: number;
        sqyds: number;
      };
      nala: {
        sqm: number;
        sqyds: number;
      };
      nala_buffer: {
        sqm: number;
        sqyds: number;
      };
    };
    net_plot_area: {
      sqm: number;
      sqyds: number;
    };
    tot_lot_area: {
      required: {
        sqm: number;
        percent: number;
      };
      provided: {
        sqm: number;
        percent: number;
      };
    };
  };
  building_floors: {
    mall_multiplex: string;
    residential: string;
  };
  residential_block_area_statement: {
    super_structure_area_sqm: number;
    floor_wise_area: Record<string, number>;
    basements: Record<string, number>;
    stilts: Record<string, number>;
    assembly: Record<string, number>;
  };
  residential_setbacks_building_height_parking: {
    setbacks: {
      front: string;
      all_around: string;
    };
    height: {
      permissible: string;
      proposed: string;
    };
    parking: {
      required_percent: number;
      required_area_sqm: number;
      provided_percent: number;
      provided_area_sqm: number;
    };
  };
  mall_multiplex_area_statement: {
    total_area_sqm: number;
    floor_wise_area: Record<string, number>;
    basements: Record<string, number>;
    occupancy_type: Record<string, string>;
    setbacks: {
      all_around: string;
    };
    height: {
      proposed: string;
    };
    parking: {
      required_percent: number;
      required_area_sqm: number;
      provided_percent: number;
      provided_area_sqm: number;
    };
  };
  amenities_area: {
    residential: {
      required_sqm: number;
      provided_sqm: number;
    };
  };
}

export interface FileProcessingState {
  isProcessing: boolean;
  progress: number;
  error: string | null;
  data: AreaStatement | null;
}

export interface ExportOptions {
  format: 'json' | 'csv';
  includeMetadata: boolean;
  filename: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export type DashboardTab = 'overview' | 'blocks' | 'analytics' | 'compliance'; 