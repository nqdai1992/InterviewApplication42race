import { deepOrange } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from './pages/Home';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          height: '50px',
          borderRadius: '25px'
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <div className="app">
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
              </Routes>
            </BrowserRouter>
        </div>
      </RecoilRoot>
       
    </ThemeProvider>
   
  );
}

export default App;
