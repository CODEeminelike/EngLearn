import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Banner from "./Components/Banner";
import AboutUs from './Components/AboutUs';
import Register from './Components/Register';
import Login from './Components/Login';
function App() {
  return (
    <div className="App">
      <Header />
      <Banner />           
      <AboutUs />
         {/* Thêm dòng kẻ ngang để phân cách (tùy chọn) */}
      <hr style={{ margin: "40px 0"}} />   
      {}
      <Register /> 
      
      {/* Bạn có thể thêm các component khác ở đây */}
      <div style={{height: "50vh"}}></div> {/* Thêm khoảng trống để cuộn xem */}
  <hr style={{ margin: "40px 0"}} /> 
   <Login />
      
   
</div>

    


  );
}

export default App;
