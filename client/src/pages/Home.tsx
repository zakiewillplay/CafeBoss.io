import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, Mail, MessageCircle, Download } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Digity Leads</div>
          <Link href="/leads">
            <Button>View Leads</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Manage Your Restaurant Leads Effortlessly
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Access 235+ verified restaurant and cafe leads across India. Contact them directly via WhatsApp or email with pre-filled Digity pitches.
          </p>
          <Link href="/leads">
            <Button size="lg" className="gap-2">
              Start Managing Leads <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/50 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">View All Leads</h3>
              <p className="text-muted-foreground">
                Browse 235+ verified restaurant and cafe leads organized by city and cuisine type.
              </p>
            </Card>
            <Card className="p-6">
              <MessageCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">WhatsApp Messaging</h3>
              <p className="text-muted-foreground">
                Send pre-filled WhatsApp messages with your Digity pitch directly from the dashboard.
              </p>
            </Card>
            <Card className="p-6">
              <Mail className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Outreach</h3>
              <p className="text-muted-foreground">
                Compose professional emails with pre-filled subject and body for each lead.
              </p>
            </Card>
            <Card className="p-6">
              <Download className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Export to CSV</h3>
              <p className="text-muted-foreground">
                Export filtered leads to CSV for bulk outreach or external tools.
              </p>
            </Card>
            <Card className="p-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Filtering</h3>
              <p className="text-muted-foreground">
                Search by name, address, phone, and filter by city or cuisine type.
              </p>
            </Card>
            <Card className="p-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Stats</h3>
              <p className="text-muted-foreground">
                See how many leads match your current filters and search criteria.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="max-w-2xl mx-auto text-center bg-primary/5 rounded-lg p-12 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Reach Out?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Access all 235+ leads and start your outreach campaign today.
          </p>
          <Link href="/leads">
            <Button size="lg">View Leads Dashboard</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50">
        <div className="container py-8 text-center text-muted-foreground">
          <p>Digity Lead Manager © 2026 | Zakir Rashid</p>
        </div>
      </footer>
    </div>
  );
}
