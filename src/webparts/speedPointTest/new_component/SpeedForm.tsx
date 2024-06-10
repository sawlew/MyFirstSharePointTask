import * as React from 'react';
import './SpeedCSS.css'

const SpeedForm: React.FC = () => {

  return (
    <div>
      <h2>CRUD Operations with SpeedPoint</h2>
      <section id="form">
        <input speed-bind="Title" speed-bind-validate="Title" placeholder="Title" />
        <input speed-bind="CashAmount" speed-bind-validate="CashAmount" placeholder="Cash Amount" />
        <input speed-bind="ItemOfExpense" speed-bind-validate="ItemOfExpense" placeholder="Item Of Expense" />
        <input speed-bind="ManagerName" speed-bind-validate="ManagerName" placeholder="Manager Name" />
        <input speed-bind="ItemCount" speed-bind-validate="ItemCount" placeholder="Item Count" />
        <input speed-bind="PurchaseDate" speed-bind-validate="PurchaseDate" type='date' placeholder="Purchase Date" />
        <input speed-bind="EmployeeID" speed-bind-validate="EmployeeID" placeholder="Employee ID" />
        <input speed-bind="Description" speed-bind-validate="Description" placeholder="Description" />
        <div speed-bind-people="Supervisor" id="Supervisor" speed-validate-mode="true" />
        <button id='create-btn' type="button">Submit</button>
      </section>
      <section id='output' />
    </div>
  );
};

export default SpeedForm;
