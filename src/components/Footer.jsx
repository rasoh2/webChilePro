export default function Footer() {
  return (
    <footer className='bg-dark text-white text-center py-3 mt-5'>
      <div className='container'>
        <p className='mb-0'>
          &copy; {new Date().getFullYear()} WebChilePro. Todos los derechos
          reservados.
        </p>
        <p className='mb-0'>
          <a href='https://webchilepro.netlify.app/' className='text-white text-decoration-none'>
            Visítanos en webchilepro.com
          </a>
        </p>
      </div>
    </footer>
  );
}
