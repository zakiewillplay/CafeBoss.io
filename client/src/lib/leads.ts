export interface Lead {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  cuisine: string;
  city: string;
  whatsapp_link: string;
  email_draft: string;
}

export async function loadLeads(): Promise<Lead[]> {
  try {
    const response = await fetch('/leads.csv');
    const csv = await response.text();
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    
    const leads: Lead[] = lines.slice(1).map(line => {
      const values = parseCSVLine(line);
      return {
        name: values[0] || '',
        address: values[1] || '',
        phone: values[2] || '',
        email: values[3] || '',
        website: values[4] || '',
        instagram: values[5] || '',
        facebook: values[6] || '',
        cuisine: values[7] || '',
        city: values[8] || '',
        whatsapp_link: values[9] || '',
        email_draft: values[10] || '',
      };
    });
    
    return leads;
  } catch (error) {
    console.error('Failed to load leads:', error);
    return [];
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}
