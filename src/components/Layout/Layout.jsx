import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.jsx';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
