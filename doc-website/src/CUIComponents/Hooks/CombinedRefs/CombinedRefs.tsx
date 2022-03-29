import React, { useRef, useEffect } from 'react'
import { useCombinedRefs } from '@ciceksepeti/cui-hooks';
import ForwardedRefInput from './ForwardedRefInput'

const CombinedRefs = () => {
    const nameRef = useRef(null)
    const lastnameRef = useRef(null)
    const submitRef = useRef(null)
    const ref1 = useCombinedRefs(ForwardedRefInput, nameRef);
    const ref2 = useCombinedRefs(ForwardedRefInput, lastnameRef);
    const parentRef = useRef(null);
    const childRef = useRef(null);

    const firstKeyDown = (e) => {
        if (e.key === 'Enter') {
            lastnameRef.current.focus();
        }
    }

    const lastKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitRef.current.focus();
        }
    }

    const submitKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (parentRef.current) {
                const child = document.createElement('div');
                child.innerText = `NAME: '${nameRef.current.value}' and SURNAME: '${lastnameRef.current.value}' texts are called by using useCombinedRefs.`;
                childRef.current = child;
                parentRef.current.appendChild(child);
            }
        }
    }
    return (
        <div>
            <ForwardedRefInput className='d-block w-100 mb-15 p-10' type="text" ref={ref1} onKeyDown={firstKeyDown} placeholder='First Name' />
            <ForwardedRefInput className='d-block w-100 mb-15 p-10' type="text" ref={ref2} onKeyDown={lastKeyDown} placeholder='Last Name' />
            <button className='p-10 w-100 mb-15' ref={submitRef} onKeyDown={submitKeyDown}>Submit</button>
            <div className='mt-10' ref={parentRef}></div>
        </div>
    )
}

export default CombinedRefs

//6:30'da kaldım