import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Code, Palette, Zap, Users, Terminal, Database, Server, Monitor } from 'lucide-react';
import { personalInfo, experience } from '../data/mock';

const About = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable code following industry best practices and modern standards."
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "UI/UX Focus",
      description: "Creating intuitive interfaces with pixel-perfect design and seamless user experiences."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance",
      description: "Optimizing applications for speed, accessibility, and flawless user interactions."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "System Design",
      description: "Architecting robust solutions with scalable infrastructure and efficient workflows."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 tech-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-primary font-mono text-lg">{'>'} cat ~/about.md</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-mono">
            About{' '}
            <span className="text-primary tech-text-glow">
              Developer
            </span>
          </h2>
          <div className="max-w-2xl mx-auto angular-card p-4 bg-card/30 backdrop-blur-sm">
            <p className="text-lg sm:text-xl text-muted-foreground font-mono">
              <span className="text-primary">{'// '}</span>
              Passionate about creating exceptional digital experiences through innovative code architecture.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio & Skills */}
          <div className="space-y-8">
            <div className="angular-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-2xl font-bold mb-4 font-mono flex items-center">
                <Terminal className="mr-2 h-5 w-5 text-primary" />
                ./my-story.sh
              </h3>
              <div className="space-y-4 text-muted-foreground font-mono">
                <p>
                  <span className="text-primary">{'> '}</span>
                  Initializing developer profile... {personalInfo.yearsOfExperience} years of experience detected.
                </p>
                <p>
                  <span className="text-primary">{'> '}</span>
                  Specialized in React.js, modern JavaScript frameworks, and creating 
                  intuitive user interfaces. Passionate about clean code architecture 
                  and performance optimization.
                </p>
                <p>
                  <span className="text-primary">{'> '}</span>
                  When not coding: Contributing to open-source projects, exploring 
                  emerging technologies, and sharing knowledge with the developer community.
                </p>
                <p className="text-primary">
                  {'> '} Profile loaded successfully. Ready for collaboration.
                </p>
              </div>
            </div>

            {/* Skills with tech grid */}
            <div className="angular-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-2xl font-bold mb-4 font-mono flex items-center">
                <Server className="mr-2 h-5 w-5 text-primary" />
                ./skills --list
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {personalInfo.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-2 straight-line bg-primary/10 text-primary border border-primary/20 font-mono text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Features */}
          <div className="space-y-8">
            {/* What I Do Best */}
            <div className="angular-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-2xl font-bold mb-6 font-mono flex items-center">
                <Code className="mr-2 h-5 w-5 text-primary" />
                ./core-functions.js
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="p-4 border border-primary/20 straight-line hover:border-primary transition-colors hover:bg-primary/5">
                    <div className="flex items-start space-x-3">
                      <div className="text-primary mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 font-mono">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground font-mono">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Timeline with tech styling */}
            <div className="angular-card p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="text-2xl font-bold mb-6 font-mono flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                ./work-history.log
              </h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="border-l-4 border-primary pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary straight-line"></div>
                    <CardHeader className="p-0 pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle className="text-lg font-mono">{exp.position}</CardTitle>
                        <Badge variant="outline" className="w-fit mt-2 sm:mt-0 straight-line border-primary/50 font-mono">
                          {exp.period}
                        </Badge>
                      </div>
                      <div className="text-primary font-medium font-mono">{exp.company}</div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground font-mono text-sm">
                        <span className="text-primary">{'// '}</span>
                        {exp.description}
                      </p>
                    </CardContent>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;