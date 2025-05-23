import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}
