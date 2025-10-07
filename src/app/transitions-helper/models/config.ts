import { InjectionToken } from '@angular/core';

export const LIBRARY_CONFIG = new InjectionToken<LibraryConfig>('LibraryConfig');

export const provideLibraryConfig = (config: LibraryConfig) => [
  { provide: LIBRARY_CONFIG, useValue: config }
];

export interface LibraryConfig {
     authEndpoint: string;
     initialPage: string;
}