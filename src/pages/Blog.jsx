import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    Calendar03Icon,
    Time02Icon,
    FolderLibraryIcon,
    Tag01Icon,
    Search01Icon,
    ArrowRight01Icon
} from '@hugeicons/core-free-icons';
import {
    getAllPosts,
    getPostBySlug,
    getAllCategories,
    getAllTags
} from '../data/blogPosts';
import LiveCodeEditor from '../components/LiveCodeEditor';

// Content Renderer Component
const ContentRenderer = ({ content }) => {
    return (
        <div className="prose prose-lg max-w-none">
            {content.map((block, index) => {
                switch (block.type) {
                    case 'heading':
                        const HeadingTag = `h${block.level}`;
                        const headingClasses = {
                            2: 'text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground font-mono border-l-4 border-primary pl-6 md:pl-8',
                            3: 'text-xl md:text-2xl font-semibold mt-8 mb-4 text-foreground font-mono pl-6 md:pl-8'
                        };
                        return (
                            <HeadingTag
                                key={index}
                                className={headingClasses[block.level] || 'text-lg font-semibold mt-6 mb-3'}
                            >
                                {block.text}
                            </HeadingTag>
                        );

                    case 'paragraph':
                        return (
                            <p
                                key={index}
                                className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 font-mono pl-2 md:pl-4"
                            >
                                {block.text}
                            </p>
                        );

                    case 'list':
                        return (
                            <ul key={index} className="space-y-3 mb-6 ml-6">
                                {block.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="text-base md:text-lg text-muted-foreground font-mono flex items-start"
                                    >
                                        <span className="text-primary mr-3 flex-shrink-0">{'>'}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        );

                    case 'code':
                        return (
                            <div key={index} className="mb-8 group">
                                <div className="rounded-xl border border-border/50 bg-muted/50 overflow-hidden shadow-sm">
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-border/10 bg-white/[0.02]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500/20" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                                            <div className="w-2 h-2 rounded-full bg-green-500/20" />
                                        </div>
                                        <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                                            {block.language}
                                        </span>
                                    </div>
                                    <pre className="p-6 overflow-x-auto">
                                        <code className="text-sm font-mono text-foreground/80 leading-relaxed font-[family-name:JetBrains_Mono]">
                                            {block.code}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        );

                    case 'liveEditor':
                        return (
                            <LiveCodeEditor
                                key={index}
                                title={block.title}
                                description={block.description}
                                hint={block.hint}
                                initialCode={block.initialCode}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

// Blog Card Component
const BlogCard = ({ post }) => {
    return (
        <Link to={`/blog/${post.slug}`}>
            <div className="group h-full border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 bg-card">
                {/* Category & Featured Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="font-mono text-xs">
                        <HugeiconsIcon icon={FolderLibraryIcon} className="h-3 w-3 mr-1" />
                        {post.category}
                    </Badge>
                    {post.featured && (
                        <Badge className="font-mono text-xs bg-primary/10 text-primary border-primary/20">
                            Featured
                        </Badge>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground font-mono group-hover:text-primary transition-colors">
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 line-clamp-2 font-mono text-sm md:text-base">
                    {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-muted rounded font-mono text-muted-foreground"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={Calendar03Icon} className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </div>
                    <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={Time02Icon} className="h-3 w-3" />
                        {post.readTime}
                    </div>
                </div>

                {/* Read More */}
                <div className="mt-4 flex items-center gap-2 text-primary font-mono text-sm group-hover:gap-3 transition-all">
                    Read Article
                    <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                </div>
            </div>
        </Link>
    );
};

// Blog List View
const BlogList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');

    const posts = getAllPosts();
    const categories = getAllCategories();
    const tags = getAllTags();

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);

        return matchesSearch && matchesCategory && matchesTag;
    });

    return (
        <div className="min-h-screen bg-background relative">
            {/* Geometric vertical guide lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="container-xl h-full mx-auto">
                    <div className="max-w-4xl h-full mx-auto relative">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-border/50"></div>
                    </div>
                </div>
            </div>

            <div className="container-xl py-16 md:py-24 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-mono">
                            <span className="text-muted-foreground/70">{'>'}</span> Blog
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-mono">
                            Thoughts on web development, programming, and technology.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="mb-12 space-y-4">
                        {/* Search */}
                        <div className="relative max-w-md">
                            <HugeiconsIcon
                                icon={Search01Icon}
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                            />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        {/* Category & Tag Filters */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={FolderLibraryIcon} className="h-4 w-4 text-muted-foreground" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <HugeiconsIcon icon={Tag01Icon} className="h-4 w-4 text-muted-foreground" />
                                <select
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    className="px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="all">All Tags</option>
                                    {tags.map(tag => (
                                        <option key={tag} value={tag}>{tag}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground font-mono text-lg">
                                No articles found matching your criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Blog Detail View
const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 font-mono">404</h1>
                    <p className="text-muted-foreground mb-6 font-mono">Article not found</p>
                    <Button onClick={() => navigate('/blog')} variant="outline">
                        <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background relative">
            {/* Geometric vertical guide lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="container-xl h-full mx-auto">
                    <div className="max-w-4xl h-full mx-auto relative">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-border/50"></div>
                    </div>
                </div>
            </div>

            <div className="container-xl py-16 md:py-24 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Button
                        onClick={() => navigate('/blog')}
                        variant="ghost"
                        className="mb-8 font-mono"
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Button>

                    {/* Article Header */}
                    <article>
                        <div className="mb-8">
                            {/* Category & Featured */}
                            <div className="flex items-center gap-2 mb-6">
                                <Badge variant="outline" className="font-mono">
                                    <HugeiconsIcon icon={FolderLibraryIcon} className="h-3 w-3 mr-1" />
                                    {post.category}
                                </Badge>
                                {post.featured && (
                                    <Badge className="font-mono bg-primary/10 text-primary border-primary/20">
                                        Featured
                                    </Badge>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground font-mono leading-tight">
                                {post.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono pb-6 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={Calendar03Icon} className="h-4 w-4" />
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={Time02Icon} className="h-4 w-4" />
                                    {post.readTime}
                                </div>
                                <div>By {post.author}</div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-6">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="font-mono text-xs">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-12">
                            <ContentRenderer content={post.content} />
                        </div>

                        {/* Back to Blog */}
                        <div className="mt-16 pt-8 border-t border-border">
                            <Button
                                onClick={() => navigate('/blog')}
                                variant="outline"
                                className="font-mono"
                            >
                                <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4" />
                                Back to All Articles
                            </Button>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

// Main Blog Component
const Blog = () => {
    const { slug } = useParams();

    return slug ? <BlogDetail /> : <BlogList />;
};

export default Blog;
