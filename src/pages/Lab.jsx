import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import Scribble from '../components/Scribble';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { engrave, renderStamp, ensureStampFonts, artSize, INKS } from '../lib/stamp-render';
import { loadSampleImage } from '../lib/sample-art';

// Card art for Postmarked: a real stamp from the tool's own renderer
const PostmarkedPreview = () => {
    const [src, setSrc] = useState(null);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const [img] = await Promise.all([loadSampleImage(), ensureStampFonts()]);
            const { w, h } = artSize(1.5);
            const stamp = renderStamp({
                engraved: engrave(img, w, h, INKS.ultramarine.color),
                ink: 'ultramarine', value: '₹5', place: 'Anywhere', country: 'Earth', date: new Date(), scale: 1.5,
            });
            if (!cancelled) setSrc(stamp.toDataURL('image/png'));
        })().catch(() => { });
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="h-full w-full flex items-center justify-center bg-[#efe7d5]">
            {src && (
                <img
                    src={src}
                    alt=""
                    className="h-[82%] w-auto -rotate-3 drop-shadow-[0_10px_14px_rgba(60,50,40,0.22)] transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-[1.03]"
                    style={{ transitionTimingFunction: 'var(--ease-out-strong)' }}
                />
            )}
        </div>
    );
};

// Add new tools here; they appear as cards in the grid
const TOOLS = [
    {
        to: '/lab/stamp',
        title: 'Postmarked',
        description: 'Turn a trip photo into an engraved postage stamp, postmarked from where and when you took it. Tear it off to download.',
        Preview: PostmarkedPreview,
        tags: ['Reads place & date from your photo', 'Nothing uploaded'],
    },
];

const Lab = () => {
    useDocumentTitle('Lab | Garvit Joshi');

    return (
        <section className="container-xl py-14 sm:py-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="pill">Lab</span>
                <h1 className="mt-5 text-5xl sm:text-6xl leading-[1.05]">
                    Little tools, <Scribble>free</Scribble> to use
                </h1>
                <p className="section-lede mt-5">
                    Small, playful tools I build in my spare time.
                    No sign-up and nothing uploaded. Open one and use it.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {TOOLS.map((tool) => (
                    <Link key={tool.to} to={tool.to} className="group surface lift flex flex-col p-2.5 pb-6">
                        <div className="rounded-[14px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(60,58,56,0.06)] aspect-[1200/630]">
                            <tool.Preview />
                        </div>
                        <div className="px-3.5 pt-5 flex flex-col flex-grow">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-2xl leading-[1.1]">{tool.title}</h2>
                                <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </div>
                            <p className="mt-2 text-muted-foreground leading-6">{tool.description}</p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {tool.tags.map(t => <span key={t} className="pill text-[13px] px-2.5 py-1.5">{t}</span>)}
                            </div>
                        </div>
                    </Link>
                ))}

                <div className="rounded-[22px] border-2 border-dashed border-foreground/15 grid place-items-center text-center p-10 min-h-[260px]">
                    <div>
                        <p className="font-display font-bold text-2xl tracking-[-0.05em]">More on the way</p>
                        <p className="mt-2 text-muted-foreground max-w-xs mx-auto leading-6">
                            Got an idea for a tool you'd use?{' '}
                            <a href="mailto:garvitjoshi543@gmail.com" className="font-semibold text-foreground underline underline-offset-4">Tell me</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Lab;
