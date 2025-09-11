import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Code, Monitor, Zap, Database, Terminal, Github, User, Briefcase } from 'lucide-react';
import { personalInfo, experience } from '../data/mock';

const About = () => {
  const features = [
    {
      icon: <Code className="h-5 w-5" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable code following industry best practices and modern standards."
    },
    {
      icon: <Monitor className="h-5 w-5" />,
      title: "UI/UX Focus",
      description: "Creating intuitive interfaces with pixel-perfect design and seamless user experiences."
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Performance",
      description: "Optimizing applications for speed, accessibility, and flawless user interactions."
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "System Design",
      description: "Architecting robust solutions with scalable infrastructure and efficient workflows."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30 tech-section">
      <div className="container-xl">
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
          <div className="max-w-2xl mx-auto rounded-lg p-4 bg-card/30 backdrop-blur-sm border border-primary/10">
            <p className="text-lg sm:text-xl text-muted-foreground font-mono">
              <span className="text-primary">{'// '}</span>
              Passionate about creating exceptional digital experiences through innovative code architecture.
            </p>
          </div>
        </div>

        {/* Minimalistic About List - Left aligned within centered container */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 text-left">

            {/* Bio Section */}
            <div className="group">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-2xl font-mono font-bold italic underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                  Developer Story
                  <User className="inline ml-2 h-5 w-5 text-primary" />
                </h3>
              </div>

              <div className="text-muted-foreground font-mono text-sm leading-relaxed mb-4 space-y-2">
                <p>
                  <span className="text-primary">{'// '}</span>
                  {personalInfo.yearsOfExperience} years of experience crafting digital solutions with modern technologies.
                </p>
                <p>
                  <span className="text-primary">{'// '}</span>
                  Specialized in React.js, JavaScript frameworks, and creating intuitive user interfaces.
                </p>
                <p>
                  <span className="text-primary">{'// '}</span>
                  Passionate about clean code architecture, performance optimization, and open-source contributions.
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="group">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-2xl font-mono font-bold italic underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                  Technical Skills
                  <Terminal className="inline ml-2 h-5 w-5 text-primary" />
                </h3>
              </div>

              <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-4">
                <span className="text-primary">{'// '}</span>
                Technologies and frameworks I work with on a daily basis.
              </p>

              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          {/* What I Do Section */}
          {/* <div className="group">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-2xl font-mono font-bold italic underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                Core Functions
                <Code className="inline ml-2 h-5 w-5 text-primary" />
              </h3>
            </div>
            
            <p className="text-muted-foreground font-mono text-sm leading-relaxed max-w-2xl mb-4">
              <span className="text-primary">{'// '}</span>
              Key areas where I deliver exceptional results and drive innovation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded border border-primary/20 hover:border-primary/50 transition-colors">
                  <div className="text-primary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm font-mono mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

            {/* Experience Section */}
            <div className="group">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-2xl font-mono font-bold italic underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                  Work Experience
                  <Briefcase className="inline ml-2 h-5 w-5 text-primary" />
                </h3>
              </div>

              <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-4">
                <span className="text-primary">{'// '}</span>
                Professional journey and key contributions across different organizations.
              </p>

              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="border-l-2 border-primary/30 pl-4 relative">
                    <div className="absolute -left-1.5 top-1 w-3 h-3 bg-primary rounded-full"></div>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                      <div>
                        <h4 className="font-bold font-mono text-lg">{exp.position}</h4>
                        <div className="text-primary font-medium font-mono text-sm">{exp.company}</div>
                      </div>
                      <span className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded border border-primary/20 w-fit mt-1 sm:mt-0">
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-muted-foreground font-mono text-sm leading-relaxed">
                      <span className="text-primary">{'// '}</span>
                      <div className="ml-4">
                        {exp.description.split('\n').map((line, lineIndex) => (
                          <div key={lineIndex} className="mb-1">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connect Button */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="rounded-lg border-primary/50 hover:border-primary font-mono hover:tech-glow">
            <Github className="mr-2 h-4 w-4" />
            git clone --about-me
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;