
import { Button, createTheme, ThemeProvider } from '@mui/material';

// Crée un thème personnalisé
const theme = createTheme({
    palette: {
      primary: {
        main: '#ff5722',
      },
    },
  });
export function Dashboard(){
    return(

       

        <ThemeProvider theme={theme}>
        <div style={{ padding: 20 }}>
          <Button variant="contained" color="primary">
            Bouton avec thème personnalisé
          </Button>
        </div>
      </ThemeProvider>
             
          );
        }




        