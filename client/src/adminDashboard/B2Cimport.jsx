import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const B2Cimport = ({ onB2CMixTotalChange }) => {
  const [csvData, setCsvData] = useState([]);
  const [searchColumn, setSearchColumn] = useState('Product');
  const [B2CmixTotal, setB2CMixTotal] = useState(0);

  const searchPhrases = {
    Mix: 'Mix',
    Sun: 'Sun',
    Pea: 'Peas',
    Rad: 'Rad'
  };

  useEffect(() => {
    const total = calculateTotal('Mix');
    setB2CMixTotal(total);
    if (onB2CMixTotalChange) {
      onB2CMixTotalChange(total);
    }
  }, [csvData, searchColumn, onB2CMixTotalChange]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data);
        },
        header: true,
      });
    }
    event.target.value = null;
  };

  const countTotalAmountForProduct = (product) => {
    if (!csvData.length) {
      return 0;
    }
    return csvData.reduce((acc, row) => {
      if (row[searchColumn] && row[searchColumn] === product) {
        return acc + (parseInt(row["Amount"]) || 0);
      }
      return acc;
    }, 0);
  }

  const calculateTotal = (category) => {
    const keys = Object.keys(searchPhrases).filter((key) => key.startsWith(category));
    let total = 0;
    keys.forEach((key) => {
      total += countTotalAmountForProduct(searchPhrases[key]);
    });
    return total;
  }

  const columnsToDisplay = ["Client", "Product", "Amount"];
  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      {csvData.length > 0 && (
        <table>
          <thead>
            <tr>
              {columnsToDisplay.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {columnsToDisplay.map((column, index) => (
                  <td key={index}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <br />
        <fieldset>
          Total Mix: {B2CmixTotal}
          <br /> Total Peas: {calculateTotal('Pea')}
          <br /> Total Sun: {calculateTotal('Sun')}
          <br /> Total Rad: {calculateTotal('Rad')}
        </fieldset>
      </div>
    </div>
  );
};

export default B2Cimport;
