import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { TailSpin } from 'react-loader-spinner';
// there three functions are from material ui -----
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const key = `https://restcountries.com/v3.1/name/`;
const all = `https://restcountries.com/v3.1/all`;
function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [dataall, setDataall] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const [loadingsecond, setLoadingsecond] = useState(false)
  const [errorsecond, setErrorsecond] = useState("");
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value)
  }
  // const query = "iran"
  const fetchApi = async (query) => {
    try {
      setLoading(true)
      const res = await fetch(`${key}${query}`);
      if (!res.ok) throw new Error("failed to fetch Data");
      const data = await res.json()
      setData(data)
      console.log(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  const fetchAll = async (query) => {
    try {
      setLoadingsecond(true)
      const res = await fetch(`${all}`);
      if (!res.ok) throw new Error("failed to fetch Data");
      const data = await res.json()
      setDataall(data)
      console.log(data)
    } catch (err) {
      setErrorsecond(err.message)
    } finally {
      setLoadingsecond(false)
    }
  }

  const showResult = () => {
    fetchApi(input)
    setError("")
  }
  useEffect(() => {
    fetchAll()
  }, [])
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              React
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={input}
                onChange={handleInput}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button onClick={showResult} style={{ marginLeft: '12px' }} variant="contained" color='secondary'>Search</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container style={{ marginTop: '12rem' }}>
        <div style={{ margin: 'auto', width: '90%' }}>
          <div className="d-flex is-justify-content-space-around flex-wrap">

            {loading && <Loader />}
            {!loading && !error &&
              data.map((item, index) => (
                <List loadData={item} key={index} />
              ))
            }
            {error &&
              <ErrorMessage message={error} />}
          </div>
        </div>

      </Container>

      <hr></hr>
      <Container className='mt-4' style={{ marginTop: '400px', marginLeft: '90px' }}>
        <div style={{ margin: 'auto', width: '100%' }}>
          <div className="d-flex is-justify-content-space-around flex-wrap">
            {loadingsecond && <Loader />}
            {!loadingsecond && !errorsecond &&
              dataall.map((item, index) => (
                <List loadData={item} key={index} />
              ))
            }
            {errorsecond &&
              <ErrorMessage message={error} />}
          </div>
        </div>
      </Container>
    </div>
  );
}
function ErrorMessage({ message }) {
  return <h1 className="text-center text-danger">{message}</h1>
}
function Loader() {
  return <TailSpin
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    className="text-center"
    visible={true}
  />
}
function List(props) {
  return (
    <>
      <div className="mb-2 m-2">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="195"
              image={props.loadData.flags.png}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.loadData.name.common}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* {props.loadData.name.common} */}
              </Typography>
              <Typography variant="body2" className='mt-2' color="text.secondary">
                <span className='p-1 '>Population</span>  {props.loadData.population}
              </Typography>

              <Typography variant="body2" className='mt-2' color="text.secondary">
                <span className='p-1'>Region</span>     {props.loadData.region}
              </Typography>
            </CardContent>

          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              more
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  )
}
export default App;
