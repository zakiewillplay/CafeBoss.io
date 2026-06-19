import { useEffect, useState, useMemo } from 'react';
import { loadLeads, Lead } from '@/lib/leads';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mail, ExternalLink, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      const data = await loadLeads();
      setLeads(data);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  const cities = useMemo(() => {
    return Array.from(new Set(leads.map(l => l.city))).sort();
  }, [leads]);

  const cuisines = useMemo(() => {
    return Array.from(new Set(leads.map(l => l.cuisine))).sort();
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);
      const matchesCity = !selectedCity || lead.city === selectedCity;
      const matchesCuisine = !selectedCuisine || lead.cuisine === selectedCuisine;
      return matchesSearch && matchesCity && matchesCuisine;
    });
  }, [leads, searchTerm, selectedCity, selectedCuisine]);

  const handleWhatsApp = (lead: Lead) => {
    if (lead.whatsapp_link) {
      window.open(lead.whatsapp_link, '_blank');
    } else {
      toast.error('No WhatsApp number available');
    }
  };

  const handleEmail = (lead: Lead) => {
    if (lead.email) {
      const subject = `Digity menu for ${lead.name}`;
      const body = `Hi ${lead.name},\n\nI noticed ${lead.name} (${lead.cuisine}) and thought you might love *Digity* – a simple way to take your menu digital.\n\n✅ QR code menu\n✅ Easy to update\n✅ Orders & reservations\n✅ Showcase your contact & social links\n\nWould you like a free demo? I can set up a trial menu for you.\n\nRegards,\nZakir Rashid\n9103173043`;
      window.location.href = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      toast.error('No email available');
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Name', 'Address', 'Phone', 'Email', 'Website', 'Instagram', 'Facebook', 'Cuisine', 'City'],
      ...filteredLeads.map(l => [
        l.name,
        l.address,
        l.phone,
        l.email,
        l.website,
        l.instagram,
        l.facebook,
        l.cuisine,
        l.city,
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digity-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Leads exported successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Digity Lead Manager</h1>
          <p className="text-primary-foreground/90">Manage and contact {leads.length} restaurant & cafe leads</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search by name, address, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Cuisine</label>
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <option value="">All Cuisines</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleExportCSV} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredLeads.length} of {leads.length} leads
          </p>
        </Card>

        {/* Leads Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Cuisine</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.city}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{lead.cuisine}</Badge>
                      </TableCell>
                      <TableCell>{lead.phone || '-'}</TableCell>
                      <TableCell>{lead.email || '-'}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {lead.phone && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleWhatsApp(lead)}
                              title="Send WhatsApp message"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          )}
                          {lead.email && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEmail(lead)}
                              title="Send email"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                          )}
                          {lead.website && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(lead.website, '_blank')}
                              title="Visit website"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No leads found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
