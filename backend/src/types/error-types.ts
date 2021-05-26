export const ErrorCodes = {
  EXISTING_USERNAME: 'EXISTING_USERNAME',
  EXISTING_ORGANIZATION_NAME: 'EXISTING_ORGANIZATION_NAME',
} as const;

export type ErrorCodes = typeof ErrorCodes[keyof typeof ErrorCodes];
