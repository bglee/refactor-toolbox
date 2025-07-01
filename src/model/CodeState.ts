export interface CodeState {
  languageName: string;
  parserId: string;
  content: string;
  checksum: string;
}

export interface HighlightState {
  start: number;
  end: number;
}
