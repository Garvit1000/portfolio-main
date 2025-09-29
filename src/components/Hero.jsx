import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Download, Github, Linkedin, Twitter, Terminal, Code2, GitCommit } from 'lucide-react';
import {personalInfo, projects, socialLinks} from '../data/mock';
import { TextEffect } from './motion-primitives/text-effect.jsx' ;

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
        const githubLink = socialLinks.find(link => link.name === 'github' || link.icon === 'github');
        let username = 'octocat';

        if (githubLink && githubLink.url) {
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
            <div className="p-6 border border-primary/10 rounded-lg hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                    <GitCommit className="h-5 w-5 text-primary" />
                    <h3 className="font-mono font-bold text-xl underline decoration-primary/50 decoration-2
                                 underline-offset-4 hover:decoration-primary transition-colors">
                        GitHub Activity
                    </h3>
                </div>

                <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-6">
                    <span className="text-primary">{'// '}</span>
                    {contributions.totalContributions} contributions in the last year
                </p>

                <div className="flex gap-1 overflow-x-auto pb-4 justify-center">
                    {contributions.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1 flex-shrink-0">
                            {week.contributionDays.map((day, dayIndex) => {
                                const level = day.contributionLevel === 'NONE' ? 0 :
                                    day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                                        day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                                            day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4;

                                return (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className={`w-3 h-3 rounded-sm ${getContributionColor(level)} cursor-pointer`}
                                        title={`${day.contributionCount} contributions on ${day.date}`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center mt-6 text-xs text-muted-foreground font-mono">
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

                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-primary/20">
                    {[
                        { value: contributions.stats.totalRepos, label: 'Repositories' },
                        { value: contributions.stats.followers, label: 'Followers' },
                        { value: contributions.stats.following, label: 'Following' }
                    ].map((stat, index) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-xl font-bold text-primary font-mono">
                                {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

                .font-serif {
                    font-family: 'Playfair Display', serif;
                }

                .elegant-shadow {
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04);
                }
               
            `}</style>

            <section id="hero" className="py-20 tech-section">
                <div className="container-xl">
                    <div className="max-w-4xl mx-auto">

                        {/* Main Heading with Avatar */}
                        <div className="mb-16">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    {contributions?.user?.avatarUrl ? (
                                        <div className="relative">
                                            <img
                                                src={contributions.user.avatarUrl}
                                                alt={personalInfo.name}
                                                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-primary/30 elegant-shadow"
                                            />
                                            <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse"></div>
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse"></div>
                                    )}
                                </div>

                                {/* Name and Title */}
                                <div className="text-center md:text-left space-y-6">
                                    <div className="relative">
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold
                                                     tracking-tight leading-tight">
                                            <span className="text-muted-foreground/70 text-2xl sm:text-3xl md:text-4xl">{'>'}</span>{' '}
                                            <span className="inline-block">Hi, I'm</span>{' '}
                                            <span className="text-primary tech-text-glow inline-block">
                                                 <TextEffect preset='fade-in-blur' speedReveal={1.1} speedSegment={0.3}>
                                                {personalInfo.name}
                                                 </TextEffect>
                                            </span>
                                        </h1>
                                        <div className="absolute -bottom-2 left-0 md:left-8 w-20 sm:w-28 md:w-36
                                                      h-0.5 bg-gradient-to-r from-primary via-primary to-transparent"></div>
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start gap-3 mt-8">
                                        <Code2 className="h-5 w-5 text-primary" />
                                        <p className="text-lg sm:text-xl text-muted-foreground font-mono font-medium">
                                            {personalInfo.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Bio */}
                        <div className="mb-16">

                            <div className="p-6 border border-primary/10 rounded-lg hover:border-primary/30 transition-colors">

                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-mono text-center">
                                    {/*<span className="text-primary font-mono">{'// '}</span>*/}
                                    <TextEffect preset='fade-in-blur' speedReveal={1.1} speedSegment={0.3}>
                                    {personalInfo.bio}
                                    </TextEffect>
                                </p>

                            </div>
                        </div>

                        {/* GitHub Contributions */}
                        <div className="mb-16">
                            {loading && (
                                <div className="flex items-center justify-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    <span className="ml-3 text-sm text-muted-foreground font-mono">Loading contributions...</span>
                                </div>
                            )}

                            {error && (
                                <div className="p-6 border border-red-500/20 rounded-lg">
                                    <p className="text-sm text-red-400 font-mono">Error: {error}</p>
                                </div>
                            )}

                            {contributions && renderContributionGraph()}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Button
                                size="lg"
                                onClick={() => scrollToSection('projects')}
                                className="transition-all rounded-lg font-mono w-full sm:w-auto"
                            >
                                <Terminal className="mr-2 h-4 w-4" />
                                ./view-projects
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <a href="https://drive.google.com/file/d/1TnMEMOYsJly9SQABwKvIgVcKUB9kUNZw/view?usp=sharing"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-block w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="transition-all rounded-lg font-mono border-primary/50 hover:border-primary w-full"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    View-resume.pdf
                                </Button>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center space-x-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors
                                             p-3 border border-primary/20 hover:border-primary rounded-lg"
                                    aria-label={social.name}
                                >
                                    {getSocialIcon(social.icon)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;