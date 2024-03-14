import React, { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { marketPlaceData, HistoryData } from "../assets/data-demo";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
	const [marketPlaceList, setMarketPlaceList] = useState(marketPlaceData);
	const [HistoryList, setHistoryList] = useState(HistoryData);

	const theme = createTheme({
		palette: {
			primary: {
				main: "#111",
			},
			secondary: {
				main: "#2f2f2f",
			},
		},
		typography: {
			fontFamily: "Poppins, sans-serif",
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						// borderWidth: "2px",
						borderRadius: "6px",
						borderColor: "#111",
					},
				},
			},
		},
	});

	return (
		<AppContext.Provider value={{ marketPlaceList, setMarketPlaceList, HistoryList, setHistoryList }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</AppContext.Provider>
	);
};
