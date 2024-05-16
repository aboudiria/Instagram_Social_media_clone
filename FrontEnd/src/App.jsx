import {Container} from '@chakra-ui/layout'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import Header from './components/Header'
import UserHeader from './components/UserHeader';

export default function App() {
  return (
    <Container maxW="620">
      <Header/>
      <Routes>
        <Route path='/:username' element={<UserPage/>}/>
        <Route path='/post/:pid' element={<PostPage/>}/>
       
      </Routes>
    </Container>
  )
}
