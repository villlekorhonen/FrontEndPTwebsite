import * as XLSX from 'xlsx';
import React from "react";
import Button from "@mui/material/Button";

const ExportExcel = ({ customers }) => {
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = customers.map(customer => ({
      Firstname: customer.firstname,
      Lastname: customer.lastname,
      StreetAddress: customer.streetaddress,
      Postcode: customer.postcode,
      City: customer.city,
      Email: customer.email,
      Phone: customer.phone,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
  
    
    XLSX.writeFile(workbook, 'customers.xlsx');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={exportToExcel}>
        Export to Excel
      </Button>
    </div>
  );
};

export default ExportExcel;
