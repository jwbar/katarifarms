import  { useState, useEffect } from 'react';
import Papa from 'papaparse';

const CSVImporter = ({ onMixTotalChange }) => {
  const [csvData, setCsvData] = useState([]);
  const [searchColumn, setSearchColumn] = useState('Artikel (editierbar)'); // Hard-coded column name
  const [mixTotal, setMixTotal] = useState(0);

  // Hard-coded search phrases
  const searchPhrases = {
    Mix50: 'mix50',
    Mix100: 'mix100',
    Mix250: 'mix250',
    

    Sun50: 'sun50',
    Sun100: 'sun100',
    Sun250: 'sun250',

    Peas50: 'peas50',
    Peas100: 'peas100',
    Peas250: 'peas250',
  };

  // Hard-coded quantities
  const quantities = {
    Mix50: 50,
    Mix100: 100,
    Mix250: 250,
    Sun50: 50,
    Sun100: 100,
    Sun250: 250,
    Peas50: 50,
    Peas100: 100,
    Peas250: 250,
  };

  useEffect(() => {
    const newOccurrences = {};
    for (const key in searchPhrases) {
      newOccurrences[key] = countOccurrences(searchPhrases[key]);
    }
    setOccurrences(newOccurrences);

    // After occurrences have been updated, set the mixTotal state and inform the parent component about the total for 'Mix'
    const total = calculateTotalWithOccurrences('Mix', newOccurrences);  // Use the new function
    setMixTotal(total);
    if (onMixTotalChange) {
      onMixTotalChange(total);
    }
}, [csvData, searchColumn, onMixTotalChange]);


  // State for occurrences of each search phrase
  const [occurrences, setOccurrences] = useState({});
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          // `result.data` contains the parsed CSV data as an array of objects
          setCsvData(result.data);
        },
        header: true, // Set to `true` if the first row contains headers
      });
    }
    event.target.value = null;
  };

  // Function to count occurrences of the specified phrase in the chosen column
  const countOccurrences = (phrase) => {
    if (!csvData.length) {
      return 0;
    }
    return csvData.reduce((acc, row) => {
      if (row[searchColumn] && row[searchColumn].includes(phrase)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  // Update occurrences when CSV data changes

  const calculateTotalWithOccurrences = (category, occurrencesObject) => {
    const keys = Object.keys(searchPhrases).filter((key) => key.startsWith(category));
    let total = 0;
    keys.forEach((key) => {
      total += occurrencesObject[key] * quantities[key];
    });
    return total;
};


  // Calculate total for a specific category (Mix, Sun, Peas)
  const calculateTotal = (category) => {
    const keys = Object.keys(searchPhrases).filter((key) => key.startsWith(category));
    let total = 0;
    keys.forEach((key) => {
      total += occurrences[key] * quantities[key];
    });
    return total;
  };

  const columnsToDisplay = ["n°", "Adresse des Standorts", "Produkt", "Artikel (editierbar)", "Menge"];
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
      Total Mix: {mixTotal}
        <br /> Total Peas: {calculateTotal('Peas')}
        <br /> Total Sun: {calculateTotal('Sun')}
        </fieldset>
      </div>
    
    </div>
  );
};

export default CSVImporter;
