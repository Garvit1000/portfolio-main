import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { personalInfo, socialLinks } from '../../data/mock';
import station from '../../assets/space/station.webp';

/* Contact in space: the ISS over Earth (NASA), copy on the dark side. */
const SpaceContact = () => {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(personalInfo.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch { /* clipboard blocked: the mailto button still works */ }
    };

    return (
        <section id="contact" className="space-contact relative isolate overflow-hidden">
            <img src={station} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_50%]" />
            <div className="space-contact-veil absolute inset-0 -z-10" aria-hidden="true" />

            <div className="container-xl py-28 sm:py-40">
                <div className="max-w-xl" data-warp>
                    <p className="text-[13px] text-foreground/50">Next stop</p>
                    <h2 className="space-h2 mt-3">Whatever you're building.</h2>
                    <p className="mt-5 text-lg font-light leading-relaxed text-foreground/65">
                        Freelance, collaborations or a full-time role. Tell me what you're making;
                        I reply within a day or two.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <a href={`mailto:${personalInfo.email}`} className="space-btn space-btn-primary">
                            Email me
                        </a>
                        <button type="button" onClick={copyEmail} className="space-btn">
                            <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} className="h-4 w-4" />
                            {copied ? 'Copied' : personalInfo.email}
                        </button>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                        {socialLinks.map(s => (
                            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="space-link">
                                {s.name === 'Twitter' ? 'X' : s.name}
                                <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpaceContact;
