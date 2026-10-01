import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, MailSend01Icon } from '@hugeicons/core-free-icons';
import { personalInfo } from '../data/mock';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SocialLinks from './SocialLinks';
import SpaceContact from './space/SpaceContact';
import SpaceBlackHole from './space/SpaceBlackHole';
import { useWorld } from './WorldProvider';
import Scribble from './Scribble';
import { Stamp, Postmark } from './HeroStamps';

// One ruled address line, written in "handwriting"
const AddressLine = ({ children }) => (
    <div className="border-b border-foreground/20 pb-1 pt-3 font-hand text-[26px] leading-none text-[#2f4db0] truncate">
        {children}
    </div>
);

const Contact = () => {
    const { world } = useWorld();
    return world === 'space' ? <><SpaceBlackHole /><SpaceContact /></> : <PaperContact />;
};

const PaperContact = () => {
    const cardRef = useScrollReveal();

    return (
        <section id="contact" className="container-xl py-20 sm:py-28">
            <div className="scroll-reveal postcard-frame max-w-4xl mx-auto" ref={cardRef}>
                <div className="postcard px-6 py-8 sm:px-10 sm:py-10">
                    <p className="text-center font-display font-bold text-[13px] tracking-[0.5em] text-foreground/45 mb-8">
                        POST CARD
                    </p>

                    <div className="grid md:grid-cols-[1.25fr_1fr] gap-10 md:gap-0">
                        {/* Message side */}
                        <div className="md:pr-10">
                            <span className="pill">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-subtle" />
                                Available for new projects
                            </span>

                            <h2 className="section-title mt-5 text-left">
                                Let's build something <Scribble>together</Scribble>
                            </h2>

                            <p className="mt-4 text-[17px] leading-7 text-foreground/75">
                                I'm open to freelance work, collaborations, and full-time roles.
                                Write to me about what you're making. I read everything and reply within a day or two.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-3">
                                <a href={`mailto:${personalInfo.email}`} className="btn-ink btn-ink-lg">
                                    <HugeiconsIcon icon={Mail01Icon} className="h-5 w-5" />
                                    Say hello
                                </a>
                                <SocialLinks size={46} />
                            </div>

                            <p className="mt-8 font-hand text-[30px] leading-none text-[#2f4db0] -rotate-2">
                                Cheers, Garvit
                            </p>
                            <p className="mt-3 font-hand text-[21px] leading-snug text-foreground/60">
                                P.S. always up for chats about web dev, open source, startups &amp; SaaS.
                            </p>
                        </div>

                        {/* Address side */}
                        <div className="relative md:border-l md:border-foreground/15 md:pl-10 min-h-[330px]">
                            <Stamp
                                w={112} h={140} rot={5}
                                className="right-0 top-0 z-10"
                                art="linear-gradient(160deg, #ffa24c 0%, #ee5a1c 100%)"
                                caption="Air mail" value="₹5"
                            >
                                <HugeiconsIcon icon={MailSend01Icon} className="h-11 w-11 text-white" strokeWidth={1.6} />
                            </Stamp>
                            <Postmark
                                className="right-[64px] top-[62px] w-[170px] z-20"
                                ring="POSTED WITH CARE ★ ANSWERED FAST ★ "
                                center={['REPLY', 'PAID']}
                            />

                            <div className="pt-[178px]">
                                <p className="text-[13px] font-semibold tracking-[0.2em] text-foreground/45 uppercase">To</p>
                                <AddressLine>{personalInfo.name}</AddressLine>
                                <AddressLine>
                                    <a href={`mailto:${personalInfo.email}`} className="hover:text-[#ff7700] transition-colors">
                                        {personalInfo.email}
                                    </a>
                                </AddressLine>
                                <AddressLine>Full stack dev, {personalInfo.location}</AddressLine>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
