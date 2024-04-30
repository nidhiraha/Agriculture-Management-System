import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'



import Login from './Components/Login'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Income from './Components/Income'
import Expense from './Components/Expense'
import Transaction from './Components/Transaction'
import Repo from './Components/Repo'
import AddIncome from './Components/AddIncome'
import AddExpense from './Components/AddExpense'
import AddTransaction from './Components/AddTransaction'
import AddTransaction2 from './Components/AddTransaction2'
import Create from './Components/Create'
import Edit from './Components/Edit'
import Make from './Components/Make'
import Edit2 from './Components/Edit2'
import Edit3 from './Components/Edit3'
import Produce from './Components/Produce'
import SupplyManagement from './Components/SupplyManagement'



function App() {
 

  return (
   <BrowserRouter>
     <Routes>
      <Route path= '/adminlogin' element = {<Login />}></Route>
      <Route path= '/dashboard' element = {<Dashboard />}>
        <Route path  ='' element = {<Home />}></Route>
        <Route path  ='/dashboard/income' element = {<Income />}></Route>
        <Route path  ='/dashboard/expense' element = {<Expense />}></Route>
        <Route path  ='/dashboard/transaction' element = {<Transaction />}></Route>
        <Route path  ='/dashboard/repo' element = {<Repo />}></Route>
        <Route path  ='/dashboard/add_income' element = {<AddIncome />}></Route>
        <Route path  ='/dashboard/add_expense' element = {<AddExpense />}></Route> 
        <Route path  ='/dashboard/add_transaction' element = {<AddTransaction />}></Route>
        <Route path  ='/dashboard/add_transaction2' element = {<AddTransaction2 />}></Route>
        <Route path  ='/dashboard/create' element = {<Create />}></Route>
        <Route path  ='/dashboard/edit/:id' element = {<Edit />}></Route>
        <Route path  ='/dashboard/make' element = {<Make />}></Route>
        <Route path  ='/dashboard/edit2/:id' element = {<Edit2 />}></Route>
        <Route path  ='/dashboard/produce' element = {<Produce />}></Route>
        <Route path  ='/dashboard/edit3/:id' element = {<Edit3 />}></Route>
        <Route path  ='/dashboard/supply_management' element = {<SupplyManagement />}></Route>
      </Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
