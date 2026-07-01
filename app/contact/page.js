"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all the details to send your message.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you shortly.",
        duration: 4000,
      })
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col justify-between">
      {/* Background world map network */}
      <div className="absolute inset-0 bg-world-map opacity-[0.2] mix-blend-screen pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none z-0" />

      {/* Floating neon glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[55%] h-[55%] rounded-full bg-indigo-500/5 blur-[110px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-white rounded-full">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Info Side */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-semibold">
                <MessageSquare className="w-3.5 h-3.5" />
                Get in Touch
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Contact Us</h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Have questions about matching scores, integration options, or general feedback? Our team is here to help you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                  <Mail className="w-4 h-4 text-[#bf5728]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Email</div>
                  <div className="text-white text-sm">support@internfind.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                  <Phone className="w-4 h-4 text-[#bf5728]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Phone</div>
                  <div className="text-white text-sm">+91 9080081210</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                  <MapPin className="w-4 h-4 text-[#bf5728]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Location</div>
                  <div className="text-white text-sm">Erode, Tamil Nadu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <Card className="md:col-span-3 glass-card rounded-2xl p-6 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/40 border-white/10 text-white placeholder-muted-foreground focus-visible:ring-primary focus-visible:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/40 border-white/10 text-white placeholder-muted-foreground focus-visible:ring-primary focus-visible:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Message</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-md border border-white/10 bg-background/40 px-3 py-2 text-sm text-white placeholder-muted-foreground outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#bf5728] hover:bg-[#bf5728]/90 text-white font-semibold rounded-lg h-11 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Mini Footer */}
      <footer className="border-t border-white/5 bg-[#0a0a0d] py-6 relative z-10 text-center">
        <p className="text-xs text-muted-foreground">© InternFind. All Rights reserved.</p>
      </footer>
    </div>
  )
}
