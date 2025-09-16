import React from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter, Terminal, User } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo, socialLinks } from '../data/mock';

const Contact = () => {
  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30 tech-section">
      <div className="container-xl">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-primary font-mono text-lg">{'>'} ./initiate-contact.sh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-mono">
            Get In{' '}
            <span className="text-primary tech-text-glow">
              Touch
            </span>
          </h2>
        </div>

        {/* Contact List - Left aligned within centered container */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 text-left">
            
            {/* Contact Info Section */}
            <div className="group">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-2xl font-mono font-bold italic underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                  Contact Information
                  <User className="inline ml-2 h-5 w-5 text-primary" />
                </h3>
              </div>
              
              <div className="text-muted-foreground font-mono text-sm leading-relaxed mb-4 space-y-2">
                <p>
                  <span className="text-primary">{'// '}</span>
                  Available for freelance projects, collaborations, and full-time opportunities.
                </p>
                <p>
                  <span className="text-primary">{'// '}</span>
                  Feel free to reach out via email or connect through social platforms.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-mono text-sm hover:text-primary transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-mono text-sm text-muted-foreground">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="group">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-2xl font-mono font-bold italic underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                  Social Networks
                  <Terminal className="inline ml-2 h-5 w-5 text-primary" />
                </h3>
              </div>
              
              <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-4">
                <span className="text-primary">{'// '}</span>
                Connect with me on various platforms for updates, projects, and professional networking.
              </p>
              
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <div key={social.name} className="flex items-center gap-3">
                    {getSocialIcon(social.icon)}
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm hover:text-primary transition-colors"
                    >
                      {social.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connect Button */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="rounded-lg border-primary/50 hover:border-primary font-mono hover:tech-glow">
            <Mail className="mr-2 h-4 w-4" />
            git clone --connect
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;