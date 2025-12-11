import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./Layouts/DefaultLayout"
import HomePage from "./Pages/HomePage"


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
