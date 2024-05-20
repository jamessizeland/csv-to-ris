import Papa from 'papaparse';
import { notifyError, notifySuccess } from './notifications';

interface CsvToRisMap {
  [key: string]: string;
}

const csvToRisMap: CsvToRisMap = {
  Author: 'AU', // Author
  Title: 'TI', // Title
  Year: 'PY', // Year
  Source: 'JO', // Journal (Source)
  Volume: 'VL', // Volume
  Issue: 'IS', // Issue
  Pages: 'SP', // Start Page
  EndPages: 'EP', // End Page (optional if you have a separate field)
  DOI: 'DO', // DOI
  Abstract: 'AB', // Abstract
  Keywords: 'KW', // Keywords
  Publisher: 'PB', // Publisher
  ISBN: 'SN', // ISBN (for books)
  ISSN: 'SN', // ISSN (for journals)
  Language: 'LA', // Language
  Edition: 'ET', // Edition
  Editor: 'ED', // Editor
  Translator: 'TR', // Translator
  Type: 'TY', // Type (e.g., JOUR, BOOK, etc.)
  URL: 'UR', // URL
  AccessionNumber: 'AN', // Accession Number
  Notes: 'N1', // Notes
};

function convertCsvToRis(csvString: string): string {
  let numberofRecords = 0;
  const results = Papa.parse(csvString, { header: true });
  if (results.errors.length) {
    console.error('CSV parsing error:', results.errors);
    notifyError('Error parsing CSV file.');
    return '';
  }

  const records = results.data as never[];
  let risOutput = '';

  for (const record of records) {
    risOutput += 'TY  - JOUR\n'; // Default to journal article type
    for (const [csvField, risTag] of Object.entries(csvToRisMap)) {
      if (record[csvField]) {
        risOutput += `${risTag}  - ${record[csvField]}\n`;
      }
    }
    risOutput += 'ER  - \n\n';
    numberofRecords++;
  }
  if (numberofRecords === 0) {
    notifyError('No records found in CSV file.');
  } else {
    notifySuccess(`${numberofRecords} records converted to RIS format.`);
  }

  return risOutput;
}

export default convertCsvToRis;
