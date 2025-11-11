export enum PostMode {
  SINGLE = 'SINGLE',
  SERIES = 'SERIES'
}

export interface GeneratedPost {
  id: string;
  title: string;
  content: string;
}

export interface GeneratorState {
  topic: string;
  mode: PostMode;
  isLoading: boolean;
  posts: GeneratedPost[];
  error: string | null;
}