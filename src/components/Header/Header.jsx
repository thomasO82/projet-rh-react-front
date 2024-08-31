import { useSelector } from 'react-redux'

const Header = () => {
  const companyName = useSelector((state) => state.company.name)

  return (
    <header>
      {companyName ? (
        <h1>Bienvenue, {companyName}</h1>
      ) : (
        <h1>Mon Application</h1>
      )}
    </header>
  )
}

export default Header