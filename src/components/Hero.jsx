import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon, Download01Icon, GithubIcon, Linkedin01Icon, NewTwitterIcon, ComputerTerminalIcon, CodeIcon, GitCommitIcon } from '@hugeicons/core-free-icons';
import { personalInfo, projects, socialLinks } from '../data/mock';
import VerticalGuideLines from './VerticalGuideLines';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Hero = () => {
    const [contributions, setContributions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const sectionRef = useRef(null);
    const bioRef = useScrollReveal();
    const githubRef = useScrollReveal({ staggerDelay: 40 });
    const ctaRef = useScrollReveal({ staggerDelay: 60 });



    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getSocialIcon = (iconName) => {
        switch (iconName) {
            case 'github':
                return <HugeiconsIcon icon={GithubIcon} className="h-4 w-4" />;
            case 'linkedin':
                return <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4" />;
            case 'twitter':
                return <HugeiconsIcon icon={NewTwitterIcon} className="h-4 w-4" />;
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
            <div className="px-4 md:px-8">
                <div className="w-fit max-w-full mx-auto">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <HugeiconsIcon icon={GitCommitIcon} className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <h3 className="font-mono font-bold text-base sm:text-xl">
                            GitHub Activity
                        </h3>
                    </div>

                    <p className="text-muted-foreground font-mono text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                        <span className="text-primary">{'// '}</span>
                        {contributions.totalContributions} contributions in the last year
                    </p>

                    <div className="flex gap-[3px] sm:gap-1 overflow-x-auto pb-4">
                        {contributions.weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-[3px] sm:gap-1 flex-shrink-0">
                                {week.contributionDays.map((day, dayIndex) => {
                                    const level = day.contributionLevel === 'NONE' ? 0 :
                                        day.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                                            day.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                                                day.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4;

                                    return (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getContributionColor(level)} cursor-pointer`}
                                            title={`${day.contributionCount} contributions on ${day.date}`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-end mt-4 sm:mt-6 text-xs text-muted-foreground font-mono">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <span>Less</span>
                            <div className="flex gap-1">
                                {[0, 1, 2, 3, 4].map(level => (
                                    <div
                                        key={level}
                                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getContributionColor(level)}`}
                                    />
                                ))}
                            </div>
                            <span>More</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6">
                        {[
                            { value: contributions.stats.totalRepos, label: 'Repositories' },
                            { value: contributions.stats.followers, label: 'Followers' },
                            { value: contributions.stats.following, label: 'Following' }
                        ].map((stat, index) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-lg sm:text-xl font-bold text-primary font-mono">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] sm:text-xs text-muted-foreground font-mono">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <section id="hero" className="tech-section relative" ref={sectionRef}>
                <div className="container-xl relative" style={{ zIndex: 2 }}>
                    <div className="max-w-6xl mx-auto">

                        {/* Main Heading with Avatar */}
                        <div className="mb-16 px-4 md:px-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="relative group">
                                        {contributions?.user?.avatarUrl ? (
                                            <>
                                                <img
                                                    src={contributions.user.avatarUrl}
                                                    alt={personalInfo.name}
                                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-[2rem] border-4 border-primary/30 shadow-lg transition-transform duration-200 hover:scale-105 hover:rotate-2"
                                                />
                                                <div className="absolute inset-0 rounded-[2rem] border-4 border-primary/20 bg-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-[2rem] border-4 border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 pulse-subtle"></div>
                                        )}
                                    </div>
                                </div>

                                {/* Name and Title */}
                                <div className="space-y-2 sm:space-y-3 md:space-y-4 text-center sm:text-left">
                                    <div className="relative">
                                        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold
                                                     tracking-tight leading-tight">
                                            <span className="text-muted-foreground/70 text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">{'>'}</span>{' '}
                                            <span>Hi, I'm</span>{' '}
                                            <span className="text-primary tech-text-glow inline-block whitespace-nowrap">
                                                {personalInfo.name}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 md:gap-3">
                                        <HugeiconsIcon icon={CodeIcon} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground font-mono font-medium">
                                            {personalInfo.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Bio */}
                        <div className="mb-16 scroll-reveal" ref={bioRef}>
                            <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
                                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-mono mb-5">
                                    {personalInfo.bio}
                                </p>

                                {/* Tech Stack Badges */}
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    {personalInfo.techStack && personalInfo.techStack.map((tech) => (
                                        <span
                                            key={tech.icon}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5
                                                     bg-card border border-border rounded-md
                                                     hover:border-primary/50 hover-scale
                                                     transition-[border-color] duration-200
                                                     cursor-default shadow-sm"
                                        >
                                            <img
                                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.icon}/${tech.icon}-original.svg`}
                                                alt={tech.name}
                                                className="w-4 h-4 md:w-5 md:h-5 object-contain"
                                            />
                                            <span className="text-xs sm:text-sm font-medium text-foreground/80 leading-none">
                                                {tech.name}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* GitHub Contributions */}
                        <div className="mb-16 scroll-reveal" ref={githubRef}>
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
                        <div className="flex flex-wrap gap-4 justify-center scroll-reveal" ref={ctaRef}>
                            <Button
                                size="lg"
                                sound="hover"
                                onClick={() => scrollToSection('projects')}
                                className="group stagger-item rounded-lg font-mono w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
                            >
                                <HugeiconsIcon icon={ComputerTerminalIcon} className="mr-2 h-5 w-5" />
                                ./view-projects
                                <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-5 w-5" />
                            </Button>
                            <a href="https://drive.google.com/file/d/1OYbuD4SnNmj66oBbIUDphRdyuQofLS5t/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full sm:w-auto stagger-item">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    sound="hover"
                                    className="rounded-lg font-mono border-primary/50 hover:border-primary w-full px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg transition-[border-color] duration-200"
                                >
                                    <HugeiconsIcon icon={Download01Icon} className="mr-2 h-5 w-5" />
                                    View-resume.pdf
                                </Button>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-6 justify-center mt-8">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors
                                             p-3 sm:p-4 border border-primary/20 hover:border-primary rounded-lg"
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