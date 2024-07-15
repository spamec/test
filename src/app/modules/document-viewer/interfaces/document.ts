import { Page } from './page';
import { Annotation } from './annotation';

export interface Document {
  id: string;
  name: string;
  pages: Page[],
  annotations?: Annotation[]
}

