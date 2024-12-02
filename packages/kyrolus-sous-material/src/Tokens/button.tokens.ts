import { InjectionToken } from '@angular/core';

export const BUTTON_ACTIVE_CLASS = new InjectionToken<string>(
  'BUTTON_ACTIVE_CLASS',
  {
    providedIn: 'any',
    factory: () => '',
  }
);
export const BUTTON_DISABLED_CLASS = new InjectionToken<string>(
  'BUTTON_DISABLED_CLASS',
  { providedIn: 'any', factory: () => '' }
);
export const BUTTON_USE_RIPPLE = new InjectionToken<boolean>(
  'BUTTON_USE_RIPPLE',
  { providedIn: 'any', factory: () => false }
);
export const BUTTON_RIPPLE_CLASS = new InjectionToken<string>(
  'BUTTON_RIPPLE_CLASS',
  {
    providedIn: 'any',
    factory: () => '',
  }
);
export const BUTTON_LOADING_CLASS = new InjectionToken<string>(
  'BUTTON_LOADING_CLASS',
  { providedIn: 'any', factory: () => '' }
);
export const BUTTON_BORDER_RADIUS_CLASS = new InjectionToken<string>(
  'BUTTON_BORDER_RADIUS',
  { providedIn: 'any', factory: () => 'br-r-2' }
);
export const BUTTON_RAISE_CLASS = new InjectionToken<string>(
  'BUTTON_RAISE_CLASS',
  { providedIn: 'any', factory: () => 'elevation-2' }
);

export const BUTTON_IS_RAISED = new InjectionToken<boolean>(
  'Button_IS_RAISED',
  { providedIn: 'any', factory: () => false }
);
