import React, { useEffect } from 'react';
import { startSpacePhysics } from '../../lib/space-physics';

/* Mounted only in the space world: the physics loop, the porthole (a
   curved window frame) and the optional VR headset view. */
const SpacePhysics = () => {
    useEffect(() => startSpacePhysics(), []);
    return (
        <>
            <div className="porthole" aria-hidden="true" />
            {/* VR headset view (html.vr): two lenses, the dark shell around them */}
            <div className="vr-view" aria-hidden="true">
                <div className="vr-blur is-soft" />
                <div className="vr-blur is-deep" />
                <div className="vr-pixels" />
                <div className="vr-shell" />
                <div className="vr-lens is-left" />
                <div className="vr-lens is-right" />
                <div className="vr-nose" />
            </div>
        </>
    );
};

export default SpacePhysics;
