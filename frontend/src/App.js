import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from './components/header/header.component.jsx';
import RegisterForm from './components/auth/register.component.jsx';



const App = () => {
   return (
    <div>
     <Header />  
	 <RegisterForm /> 
    </div>
   );
};

export default App;


