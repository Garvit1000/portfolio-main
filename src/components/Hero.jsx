import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Download, Github, Linkedin, Twitter, Terminal, Code2, GitCommit } from 'lucide-react';
import {personalInfo, projects, socialLinks} from '../data/mock';
// import {Link} from 'react-router-dom'; // Removed for compatibility

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
            <div className="mt-6 p-4 bg-card/30 rounded-lg border border-primary/10 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                    <h3 className="text-sm font-mono text-muted-foreground flex items-center">
                        <GitCommit className="mr-2 h-4 w-4" />
                        GitHub Activity
                    </h3>
                    <div className="text-xs text-muted-foreground font-mono">
                        {contributions.totalContributions} contributions in the last year
                    </div>
                </div>

                <div className="flex gap-1 overflow-x-auto pb-2 justify-center sm:justify-start">
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

                <div className="flex items-center justify-center sm:justify-start mt-6 text-xs text-muted-foreground font-mono">
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

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary/10">
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

            <section id="hero" className="pt-2 sm:pt-4 md:pt-6 lg:pt-8 pb-8 sm:pb-12 md:pb-16 tech-section gpu-accelerated">
                <div className="container-xl text-center">
                    <div className="space-y-6 sm:space-y-8 md:space-y-10">

                        {/* Main Heading */}
                        <div className="space-y-3 sm:space-y-4 md:space-y-6">
                            <div className="relative">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold
                                             tracking-tight leading-tight">
                                    <span className="text-muted-foreground/70 text-2xl sm:text-3xl md:text-4xl">{'>'}</span>{' '}
                                    <span className="inline-block">Hi, I'm</span>{' '}
                                    <span className="text-primary tech-text-glow inline-block">
                                        {personalInfo.name}
                                    </span>
                                </h1>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-28 md:w-36
                                              h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                            </div>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-mono
                                         font-medium flex items-center justify-center">
                                <Code2 className="inline mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                                {personalInfo.title}
                            </p>
                        </div>

                        {/* Bio */}
                        <div className="max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto">
                            <div className="rounded-2xl p-4 sm:p-6 md:p-8 bg-card/40 backdrop-blur-md border border-primary/10
                                          elegant-shadow">
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed
                                             font-mono">
                                    <span className="text-primary font-mono text-xs sm:text-sm md:text-base">{'// '}</span>
                                    {personalInfo.bio}
                                </p>
                            </div>
                        </div>

                        {/* GitHub Contributions Graph */}
                        <div className="max-w-4xl mx-auto">
                            {loading && (
                                <div className="flex items-center justify-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    <span className="ml-3 text-sm text-muted-foreground font-mono">Loading contributions...</span>
                                </div>
                            )}

                            {error && (
                                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <p className="text-sm text-red-400 font-mono">Error: {error}</p>
                                </div>
                            )}

                            {contributions && renderContributionGraph()}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
                            <Button
                                size="lg"
                                onClick={() => scrollToSection('projects')}
                                className="rounded-xl tech-glow hover:tech-glow font-mono font-medium
                                         w-full sm:w-auto text-sm sm:text-base md:text-lg
                                         px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 elegant-shadow"
                            >
                                <Terminal className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                ./view-projects
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                            <a href="https://drive.google.com/file/d/1TnMEMOYsJly9SQABwKvIgVcKUB9kUNZw/view?usp=sharing"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-block">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-xl border-primary/30 hover:border-primary font-mono font-medium
                                             w-full sm:w-auto text-sm sm:text-base md:text-lg
                                             px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 elegant-shadow hover:bg-primary/5"
                                >
                                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    View-resume.pdf
                                </Button>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center space-x-4 sm:space-x-5 md:space-x-6
                                        pt-4 sm:pt-6 md:pt-8">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary
                                             p-3 sm:p-4 border border-primary/20 hover:border-primary rounded-xl
                                             elegant-shadow hover:bg-primary/5"
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