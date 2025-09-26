import { IconName } from '../components/UI/Icon';

// Semantic mapping of common icon uses to actual icon names
export const ICON_MAPPINGS = {
  // Toast and notification icons
  SUCCESS: 'check' as IconName,
  ERROR: 'x' as IconName,
  WARNING: 'triangle-alert' as IconName,
  INFO: 'info' as IconName,

  // Action icons
  CLOSE: 'x' as IconName,
  EDIT: 'pencil' as IconName,
  DELETE: 'trash-2' as IconName,
  ADD: 'plus' as IconName,
  SAVE: 'save' as IconName,
  REFRESH: 'refresh-cw' as IconName,
  LOGOUT: 'log-out' as IconName,

  // Sorting icons
  SORT_NONE: 'arrow-up-down' as IconName,
  SORT_ASC: 'arrow-up' as IconName,
  SORT_DESC: 'arrow-down' as IconName,

  // Search and content icons
  SEARCH: 'search' as IconName,
  EMPTY_STATE: 'file-text' as IconName,

  // Visibility icons
  SHOW_PASSWORD: 'eye' as IconName,
  HIDE_PASSWORD: 'eye-off' as IconName,

  // Misc icons
  GREETING: 'hand' as IconName,
} as const;

// Helper function to get icon name from semantic mapping
export const getIcon = (semanticName: keyof typeof ICON_MAPPINGS): IconName => {
  return ICON_MAPPINGS[semanticName];
};