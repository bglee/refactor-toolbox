export interface CodeState {
  file: File | undefined;
  languageName: string;
  parserId: string;
  content: string;
  checksum: string;
}

export interface HighlightState {
  start: number;
  end: number;
}
