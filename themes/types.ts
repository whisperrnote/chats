export interface Theme {
  name: string;
  colors: {
    bg: string;
    surface: string;
    primary: string;
    accent: string;
    text: string;
    border: string;
    error: string;
  };
  radius: number;
  shadow: string;
  font: string;
  pattern: string;
}
