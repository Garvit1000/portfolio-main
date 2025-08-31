import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Star, Terminal, Folder, Code2 } from 'lucide-react';
import { projects } from '../data/mock';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
    ? projects.filter(project => project.featured)
    : projects;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 tech-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-primary font-mono text-lg">{'>'} ls -la ~/projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-mono">
            Featured{' '}
            <span className="text-primary tech-text-glow">
              Projects
            </span>
          </h2>
          <div className="max-w-2xl mx-auto angular-card p-4 bg-card/30 backdrop-blur-sm">
            <p className="text-lg sm:text-xl text-muted-foreground font-mono">
              <span className="text-primary">{'// '}</span>
              A collection of projects showcasing modern web development with cutting-edge technologies.
            </p>
          </div>
        </div>

        {/* Filter Buttons with tech styling */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="transition-all straight-line font-mono border-primary/50"
          >
            <Terminal className="mr-2 h-4 w-4" />
            --all
          </Button>
          <Button
            variant={filter === 'featured' ? 'default' : 'outline'}
            onClick={() => setFilter('featured')}
            className="transition-all straight-line font-mono border-primary/50"
          >
            <Star className="mr-2 h-4 w-4" />
            --featured
          </Button>
        </div>

        {/* Projects Grid with tech styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:tech-glow transition-all duration-300 hover:-translate-y-1 angular-card bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {project.featured && (
                  <Badge className="absolute top-3 right-3 straight-line bg-primary text-primary-foreground">
                    <Star className="mr-1 h-3 w-3" />
                    featured
                  </Badge>
                )}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center space-x-1 text-primary bg-background/80 backdrop-blur-sm px-2 py-1 straight-line">
                    <Folder className="h-3 w-3" />
                    <span className="text-xs font-mono">./project</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between font-mono">
                  <span className="line-clamp-1">{project.title}</span>
                  <Code2 className="h-4 w-4 text-primary" />
                </CardTitle>
                <CardDescription className="line-clamp-2 font-mono text-sm">
                  <span className="text-primary">{'// '}</span>
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Technologies with tech styling */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs straight-line bg-primary/10 text-primary border border-primary/20 font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Action Buttons with sharp edges */}
                  <div className="flex gap-2">
                    <Button size="sm" asChild className="flex-1 straight-line font-mono">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        deploy
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild className="straight-line border-primary/50 hover:border-primary font-mono">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button with tech styling */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="straight-line border-primary/50 hover:border-primary font-mono hover:tech-glow">
            <Github className="mr-2 h-4 w-4" />
            git clone --all-repos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;