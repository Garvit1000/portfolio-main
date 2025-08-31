import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Terminal, Server, Database } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/mock';
import { toast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message compiled successfully!",
        description: "Your message has been queued for processing. I'll respond soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Compilation error",
        description: "Message failed to send. Please try again or contact directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 tech-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-primary font-mono text-lg">{'>'} ./start-connection.sh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-mono">
            Initialize{' '}
            <span className="text-primary tech-text-glow">
              Contact
            </span>
          </h2>
          <div className="max-w-2xl mx-auto angular-card p-4 bg-card/30 backdrop-blur-sm">
            <p className="text-lg sm:text-xl text-muted-foreground font-mono">
              <span className="text-primary">{'// '}</span>
              Ready to collaborate? Let's establish a secure connection and discuss your project requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info with tech styling */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div className="angular-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h3 className="text-2xl font-bold mb-6 font-mono flex items-center">
                  <Terminal className="mr-2 h-5 w-5 text-primary" />
                  ./connection-info
                </h3>
                <p className="text-muted-foreground mb-6 font-mono">
                  <span className="text-primary">{'> '}</span>
                  Establishing secure channel for project collaboration. 
                  Multiple protocols available for communication.
                </p>
              </div>

              {/* Contact Details with tech styling */}
              <div className="angular-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h4 className="font-semibold mb-4 font-mono flex items-center">
                  <Server className="mr-2 h-4 w-4 text-primary" />
                  Network Endpoints
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 font-mono">
                    <Mail className="h-5 w-5 text-primary" />
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 font-mono">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Links with tech styling */}
              <div className="angular-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h4 className="font-semibold mb-4 font-mono flex items-center">
                  <Database className="mr-2 h-4 w-4 text-primary" />
                  Social Protocols
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-primary/20 hover:border-primary transition-colors straight-line hover:bg-primary/10"
                      aria-label={social.name}
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with tech styling */}
          <div className="lg:col-span-2">
            <Card className="angular-card bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="font-mono flex items-center">
                  <Terminal className="mr-2 h-5 w-5 text-primary" />
                  ./compose-message.js
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-mono">const name = *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="your_name"
                        className="straight-line border-primary/20 focus:border-primary font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-mono">const email = *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="user@domain.com"
                        className="straight-line border-primary/20 focus:border-primary font-mono"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-mono">const subject = *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="project_inquiry || collaboration"
                      className="straight-line border-primary/20 focus:border-primary font-mono"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-mono">const message = *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="/* Tell me about your project requirements, timeline, and technical specifications */"
                      rows={8}
                      className="straight-line border-primary/20 focus:border-primary font-mono"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full straight-line tech-glow font-mono"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                        Compiling message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Execute sendMessage()
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;