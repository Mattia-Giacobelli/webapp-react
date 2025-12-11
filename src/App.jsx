import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./Layouts/DefaultLayout"
import HomePage from "./Pages/HomePage"
import { MoviesProvider } from "./Contexts/MoviesContext"


function App() {


  return (
    <>
      <MoviesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route />
            </Route>
          </Routes>
        </BrowserRouter>
      </MoviesProvider>
    </>
  )
}

export default App
