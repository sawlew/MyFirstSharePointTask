import * as React from 'react';

interface Supervisor {
  id: number;
  value: string;
  email: string;
}

interface ListItem {
  ID: number;
  EmployeesName: string;
  ReasonForAdvance: string;
  Currency: string;
  Amount: number;
  AccountNumber: string;
  BankName: string;
  Supervisor: Supervisor;
  Approval: string;
}

interface UserEditFormProps {
  item: ListItem;
  onClose: () => void;
  onUpdate: (id: number, updatedItem: ListItem) => void;
}

function peoplePicker(): void {
  $spcontext.loadSPDependencies(
    () => {
      console.log("PeoplePicker Loaded");
      $spcontext.createMultiplePeoplePicker({});
    },
    { clientPeoplePicker: true }
  );
}

const UserEditForm: React.FC<UserEditFormProps> = ({ item, onClose, onUpdate }) => {
  const [formData, setFormData] = React.useState<ListItem>(item);

  React.useEffect(() => {
    peoplePicker();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (): void => {
    console.log('Submitting updated item:', formData);
    onUpdate(formData.ID, formData);
    onClose();
  };

  return (
    <div className='modal'>
      <div className='content modal-form'>
        <h1 className='title'>Cash Advance Form(Employee)</h1>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor='EmployeesName'>Employee:</label></td>
              <td><input id='EmployeesName' name='EmployeesName' className='input-field' type='text' value={formData.EmployeesName} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td><label htmlFor='ReasonForAdvance'>Reason For Advance:</label></td>
              <td><input id='ReasonForAdvance' name='ReasonForAdvance' className='input-field' type='text' value={formData.ReasonForAdvance} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td><label htmlFor='Currency'>Currency:</label></td>
              <td><input id='Currency' name='Currency' className='input-field' type='text' value={formData.Currency} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td><label htmlFor='Amount'>Amount:</label></td>
              <td><input id='Amount' name='Amount' className='input-field' type='number' value={formData.Amount} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td><label htmlFor='AccountNumber'>Account Number:</label></td>
              <td><input id='AccountNumber' name='AccountNumber' className='input-field' type='text' value={formData.AccountNumber} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td><label htmlFor='BankName'>Bank Name:</label></td>
              <td><input id='BankName' name='BankName' className='input-field' type='text' value={formData.BankName} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td><label>Supervisor:</label></td>
              <td>
                <div speed-bind-people="Supervisor" id="Supervisor" speed-validate-mode="true" className='input-field' />
              </td>
            </tr>
            <tr>
              <td><label htmlFor='Approval'>Approval:</label></td>
              <td>
                <div id='Approval'>
                    {formData.Approval}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='button-div'>
          <button type='button' className='edit-btn' onClick={handleSubmit}>Update</button>
          <button type='button' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditForm;
