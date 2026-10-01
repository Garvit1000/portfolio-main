import React from 'react';
import GitHubCard from '../GitHubCard';
import aurora from '../../assets/space/aurora.webp';

/* What I care about, told through an aurora: an invisible force you only
   notice by what it does. Then the logbook, straight from GitHub. */
const SpaceAbout = () => (
    <section className="pb-24 sm:pb-36">
        <div className="craft relative isolate overflow-hidden">
            <img src={aurora} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_50%]" />
            <div className="craft-veil absolute inset-0 -z-10" aria-hidden="true" />

            <div className="container-xl py-32 sm:py-48">
                <div className="max-w-xl" data-warp>
                    <p className="text-[13px] text-foreground/50">What I care about</p>
                    <h2 className="space-h2 mt-3">The part you feel but never see.</h2>
                    <p className="mt-6 text-[17px] leading-relaxed font-light text-foreground/75">
                        An aurora is an invisible force made visible. Good software works the same way:
                        the timing of a transition, the weight of a button, the half second after a click.
                        Nobody points at it. They just stay longer.
                    </p>
                    <p className="mt-4 text-[17px] leading-relaxed font-light text-foreground/75">
                        Day to day that means React, Node, Postgres and Tailwind, with
                        types, tests and fast pages underneath. It is also why this page peels.
                    </p>
                </div>
            </div>
        </div>

        <div className="container-xl mt-24 sm:mt-32" data-warp>
            <p className="text-[13px] text-foreground/45">Flight log</p>
            <h2 className="space-h2 mt-3 mb-10 sm:mb-12">Every commit, on the record.</h2>
            <GitHubCard />
        </div>
    </section>
);

export default SpaceAbout;
