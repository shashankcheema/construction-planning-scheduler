import { AreaStatement, ValidationResult } from '../types';

export function validateFile(file: File): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check file type
  if (file.type !== 'application/json') {
    errors.push('File must be a JSON file');
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }

  // Check if file is empty
  if (file.size === 0) {
    errors.push('File cannot be empty');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateAreaStatement(data: any): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic structure check
  if (!data || typeof data !== 'object') {
    errors.push('Data must be a valid JSON object');
    return { isValid: false, errors, warnings };
  }

  // Check for required top-level keys
  const requiredKeys = [
    'site_details',
    'building_floors',
    'residential_block_area_statement',
    'residential_setbacks_building_height_parking',
    'mall_multiplex_area_statement',
    'amenities_area'
  ];
  for (const key of requiredKeys) {
    if (!(key in data)) {
      errors.push(`Missing required property: ${key}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
} 