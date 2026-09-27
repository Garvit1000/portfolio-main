import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { personalInfo } from '../data/mock';
import SocialLinks from './SocialLinks';
import Scribble from './Scribble';
import HeroStamps from './HeroStamps';

const Hero = () => {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="container-xl pt-12 sm:pt-16 pb-8">
            <HeroStamps />

            <div className="relative z-10 text-center max-w-3xl mx-auto mt-6 sm:mt-8">
                <h1 className="text-[44px] leading-[1.05] sm:text-6xl md:text-[68px] md:leading-[1.05]">
                    Hi, I'm Garvit.
                    <br />
                    I build apps that <Scribble>feel</Scribble> good
                </h1>

                <p className="mt-6 text-lg sm:text-xl leading-[1.6] tracking-[0.02em] text-foreground/80 max-w-[560px] mx-auto">
                    {personalInfo.bio}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={scrollToProjects} className="btn-ink btn-ink-lg w-full sm:w-auto">
                        See my work
                        <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
                    </button>
                    <SocialLinks size={46} />
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    <span className="pill">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-subtle" />
                        {personalInfo.title} @ Advran
                    </span>
                    <span className="pill">Based in {personalInfo.location}</span>
                    <span className="pill">Open to freelance</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
