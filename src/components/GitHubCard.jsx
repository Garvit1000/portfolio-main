import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { socialLinks } from '../data/mock';
import { BrandIcon } from './SocialLinks';
import { useWorld } from './WorldProvider';

const githubUrl = socialLinks.find(link => link.icon === 'github')?.url || 'https://github.com/Garvit1000';
const USERNAME = githubUrl.match(/github\.com\/([^/]+)/)?.[1] || 'Garvit1000';

// GitHub's own contribution palette
const LEVEL_COLORS = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
// In space the graph reads like a star chart: brighter means busier
const SPACE_LEVEL_COLORS = ['rgba(255,255,255,0.05)', 'rgba(255,240,220,0.24)', 'rgba(255,240,220,0.46)', 'rgba(255,244,228,0.7)', 'rgba(255,248,238,0.95)'];
const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

const QUERY = `
    query($username: String!) {
        user(login: $username) {
            name
            login
            avatarUrl
            createdAt
            repositories(ownerAffiliations: OWNER, privacy: PUBLIC) { totalCount }
            followers { totalCount }
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                    weeks { contributionDays { contributionCount date contributionLevel } }
                }
            }
        }
    }
`;

// With a token (production) we get the full contribution calendar via GraphQL.
// Without one, the public REST API still gives us the profile stats.
async function fetchGitHub() {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (token) {
        try {
            const res = await fetch('https://api.github.com/graphql', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
            });
            const json = await res.json();
            const user = json?.data?.user;
            if (user) {
                const calendar = user.contributionsCollection.contributionCalendar;
                return {
                    name: user.name,
                    login: user.login,
                    avatarUrl: user.avatarUrl,
                    since: new Date(user.createdAt).getFullYear(),
                    repos: user.repositories.totalCount,
                    followers: user.followers.totalCount,
                    totalContributions: calendar.totalContributions,
                    weeks: calendar.weeks,
                };
            }
        } catch (err) {
            console.error('GitHub GraphQL failed, falling back to REST:', err);
        }
    }

    const res = await fetch(`https://api.github.com/users/${USERNAME}`);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const user = await res.json();
    return {
        name: user.name,
        login: user.login,
        avatarUrl: user.avatar_url,
        since: new Date(user.created_at).getFullYear(),
        repos: user.public_repos,
        followers: user.followers,
        totalContributions: null,
        weeks: null,
    };
}

const Stat = ({ value, label }) => (
    <div className="text-center">
        <div className="gh-stat font-display font-bold text-3xl sm:text-4xl tracking-[-0.05em]">{value}</div>
        <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
);

const GitHubCard = () => {
    const [data, setData] = useState(null);
    const graphRef = useRef(null);

    useEffect(() => {
        fetchGitHub().then(setData).catch(err => console.error('Error fetching GitHub data:', err));
    }, []);

    // Show the most recent weeks first when the graph overflows on small screens
    useEffect(() => {
        if (graphRef.current) graphRef.current.scrollLeft = graphRef.current.scrollWidth;
    }, [data]);

    const years = data ? new Date().getFullYear() - data.since : null;
    const { world } = useWorld();
    const levelColors = world === 'space' ? SPACE_LEVEL_COLORS : LEVEL_COLORS;

    return (
        <article className="surface p-2.5 pb-6">
            <div className="gh-panel rounded-[14px] bg-white shadow-[inset_0_0_0_1px_rgba(60,58,56,0.06)] px-4 py-6 sm:px-7 sm:py-7">
                {data?.weeks ? (
                    <>
                        <div ref={graphRef} className="overflow-x-auto" data-lenis-prevent>
                            <div className="flex gap-[3px] w-max mx-auto">
                                {data.weeks.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                                        {week.contributionDays.map((day) => (
                                            <div
                                                key={day.date}
                                                className="h-[11px] w-[11px] rounded-[2.5px] shadow-[inset_0_0_0_1px_rgba(27,31,35,0.06)]"
                                                style={{ backgroundColor: levelColors[LEVELS[day.contributionLevel] ?? 0] }}
                                                title={`${day.contributionCount} contributions on ${day.date}`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-4 text-xs text-muted-foreground">
                            <span>{data.totalContributions} contributions in the last year</span>
                            <span className="hidden sm:flex items-center gap-1.5">
                                Less
                                {levelColors.map((color) => (
                                    <span key={color} className="h-[11px] w-[11px] rounded-[2.5px]" style={{ backgroundColor: color }} />
                                ))}
                                More
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-3 gap-4 py-4 min-h-[88px] items-center">
                        {data ? (
                            <>
                                <Stat value={data.repos} label="Public repos" />
                                <Stat value={data.followers} label="Followers" />
                                <Stat value={`${years}+`} label={years === 1 ? 'Year on GitHub' : 'Years on GitHub'} />
                            </>
                        ) : (
                            [0, 1, 2].map(i => (
                                <div key={i} className="mx-auto h-12 w-20 rounded-[10px] bg-foreground/[0.05] pulse-subtle" />
                            ))
                        )}
                    </div>
                )}
            </div>

            <div className="px-3.5 pt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h3 className="text-2xl leading-[1.1]">Building in public</h3>
                    <p className="mt-2 text-muted-foreground leading-6">
                        Everything I ship starts as a commit.
                        {data && ` ${data.repos} public repos and counting since ${data.since}.`}
                    </p>
                </div>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-soft flex-shrink-0 self-start sm:self-auto pl-2">
                    <BrandIcon brand="github" size={26} />
                    @{data?.login || USERNAME}
                    <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                </a>
            </div>
        </article>
    );
};

export default GitHubCard;
