import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Download, Github, Linkedin, Twitter, Terminal, Code2, GitCommit } from 'lucide-react';
import {personalInfo, projects, socialLinks} from '../data/mock';
import {Link} from 'react-router-dom';

const Hero = () => {
    const [contributions, setContributions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

    const fetchGitHubContributions = async (username) => {
        setLoading(true);
        setError(null);
        
        try {
            const token = import.meta.env.VITE_GITHUB_TOKEN;
            
            if (!token) {
                throw new Error('GitHub token not found. Please add VITE_GITHUB_TOKEN to your .env file');
            }

            // GraphQL query to get contribution data
            const query = `
                query($username: String!) {
                    user(login: $username) {
                        contributionsCollection {
                            contributionCalendar {
                                totalContributions
                                weeks {
                                    contributionDays {
                                        contributionCount
                                        date
                                        contributionLevel
                                    }
                                }
                            }
                        }
                        repositories(first: 100, ownerAffiliations: OWNER) {
                            totalCount
                        }
                        followers {
                            totalCount
                        }
                        following {
                            totalCount
                        }
                        name
                        bio
                        avatarUrl
                        createdAt
                    }
                }
            `;

            const response = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables: { username }
                })
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.errors) {
                throw new Error(`GraphQL error: ${data.errors[0].message}`);
            }

            const user = data.data.user;
            const contributionData = user.contributionsCollection.contributionCalendar;

            // Flatten the weeks data
            const contributionsArray = contributionData.weeks.flatMap(week => 
                week.contributionDays.map(day => ({
                    date: day.date,
                    count: day.contributionCount,
                    level: day.contributionLevel === 'NONE' ? 0 : 
                           day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                           day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                           day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4
                }))
            );

            setContributions({
                user: {
                    name: user.name,
                    bio: user.bio,
                    avatarUrl: user.avatarUrl,
                    createdAt: user.createdAt
                },
                totalContributions: contributionData.totalContributions,
                contributions: contributionsArray,
                weeks: contributionData.weeks,
                stats: {
                    totalRepos: user.repositories.totalCount,
                    followers: user.followers.totalCount,
                    following: user.following.totalCount
                }
            });

        } catch (err) {
            console.error('Error fetching GitHub data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Extract GitHub username from your socialLinks or set it directly
        const githubLink = socialLinks.find(link => link.name === 'github' || link.icon === 'github');
        let username = 'octocat'; // fallback
        
        if (githubLink && githubLink.url) {
            // Extract username from GitHub URL
            const match = githubLink.url.match(/github\.com\/([^\/]+)/);
            if (match) {
                username = match[1];
            }
        }

        fetchGitHubContributions(username);
    }, []);

    const getContributionColor = (level) => {
        const colors = {
            0: 'bg-gray-100 dark:bg-gray-800',
            1: 'bg-green-200 dark:bg-green-900',
            2: 'bg-green-300 dark:bg-green-700', 
            3: 'bg-green-400 dark:bg-green-600',
            4: 'bg-green-500 dark:bg-green-500'
        };
        return colors[level] || colors[0];
    };

    const renderContributionGraph = () => {
        if (!contributions || !contributions.weeks) return null;

        return (
            <div className="mt-6 p-4 bg-card/30 rounded-lg border border-primary/10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-mono text-muted-foreground flex items-center">
                        <GitCommit className="mr-2 h-4 w-4" />
                        GitHub Activity
                    </h3>
                    <div className="text-xs text-muted-foreground font-mono">
                        {contributions.totalContributions} contributions in the last year
                    </div>
                </div>
                
                <div className="flex gap-1 overflow-x-auto pb-2">
                    {contributions.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {week.contributionDays.map((day, dayIndex) => {
                                const level = day.contributionLevel === 'NONE' ? 0 : 
                                           day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                                           day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                                           day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4;
                                
                                return (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className={`w-3 h-3 rounded-sm ${getContributionColor(level)} transition-all duration-200 hover:ring-1 hover:ring-primary cursor-pointer`}
                                        title={`${day.contributionCount} contributions on ${day.date}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
                
                <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground font-mono">
                    <div className="flex items-center gap-4">
                        <span>Less</span>
                        <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map(level => (
                                <div
                                    key={level}
                                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                                />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </div>

                {/* GitHub Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-primary/10">
                    <div className="text-center">
                        <div className="text-lg font-bold text-primary font-mono">{contributions.stats.totalRepos}</div>
                        <div className="text-xs text-muted-foreground">Repositories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-primary font-mono">{contributions.stats.followers}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-primary font-mono">{contributions.stats.following}</div>
                        <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section id="hero" className="pt-2 sm:pt-4 md:pt-6 lg:pt-8 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 tech-section gpu-accelerated">
            <div className="max-w-3xl lg:max-w-4xl mx-auto text-center">
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Terminal Badge */}
                    <Badge variant="secondary" className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-lg inline-flex items-center">
                        <Terminal className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        $ status --available
                    </Badge>

                    {/* Main Heading */}
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div className="relative">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-mono gpu-accelerated">
                                <span className="text-muted-foreground">{'>'}</span> Hi, I'm{' '}
                                <span className="text-primary tech-text-glow">
                                    {personalInfo.name}
                                </span>
                            </h1>
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 md:w-32 h-0.5 bg-primary"></div>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-mono font-medium gpu-accelerated flex items-center justify-center">
                            <Code2 className="inline mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            {personalInfo.title}
                        </p>
                    </div>

                    {/* Bio */}
                    <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto">
                        <div className="rounded-lg p-3 sm:p-4 md:p-6 bg-card/50 backdrop-blur-sm border border-primary/10">
                            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-mono">
                                <span className="text-primary">{'// '}</span>
                                {personalInfo.bio}
                            </p>
                        </div>
                    </div>

                    {/* GitHub Contributions Graph */}
                    {loading && (
                        <div className="flex items-center justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <span className="ml-3 text-sm text-muted-foreground font-mono">Loading contributions...</span>
                        </div>
                    )}
                    
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-sm text-red-500 font-mono">Error: {error}</p>
                        </div>
                    )}

                    {contributions && renderContributionGraph()}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
                        <Button
                            size="sm"
                            onClick={() => scrollToSection('projects')}
                            className="group rounded-lg tech-glow hover:tech-glow font-mono gpu-accelerated transition-all duration-100 w-full sm:w-auto text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                            <Terminal className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                            ./view-projects
                            <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-100 group-hover:translate-x-1" />
                        </Button>
                        <Link to="https://drive.google.com/file/d/1TnMEMOYsJly9SQABwKvIgVcKUB9kUNZw/view?usp=sharing">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-primary/50 hover:border-primary font-mono gpu-accelerated transition-all duration-100 w-full sm:w-auto text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                            <Download className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                            View-resume.pdf
                        </Button>
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-5 pt-2 sm:pt-3 md:pt-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-all duration-100 p-2 sm:p-2.5 md:p-3 border border-primary/20 hover:border-primary rounded-lg hover:tech-glow gpu-accelerated"
                                aria-label={social.name}
                            >
                                {getSocialIcon(social.icon)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;