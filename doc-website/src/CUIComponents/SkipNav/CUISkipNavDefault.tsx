import '@ciceksepeti/cui-skip-nav/styles.css';

import SkipNav from '@ciceksepeti/cui-skip-nav';
import React from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUISkipNavDefault() {
  return (
    <PreviewContainer title="Skip Nav">
      <div style={{ maxWidth: '50vw' }}>
        <div style={{ position: 'relative' }}>
          <span className="op-60">
            // Click here then press to 'Tab' button to open skip nav popup.{' '}
            <br />
            // Then click 'Skip to Target Content' button to jump to target
            content.
          </span>
          <SkipNav
            targetId="target-id"
            style={{
              position: 'absolute',
              padding: '10px',
              backgroundColor: 'var(--ifm-background-surface-color)',
              color: 'var(--ifm-font-color-base)',
              opacity: 1,
            }}
          >
            Skip to Target Content
          </SkipNav>
          <p className="fs-32">Navbar</p>
          <ul>
            <li>
              <a href="#skip-nav">Link 1</a>
            </li>
            <li>
              <a href="#skip-nav">Link 2</a>
            </li>
            <li>
              <a href="#skip-nav">Link 3</a>
            </li>
          </ul>
        </div>
        <hr />

        <p className="fs-32">Some Content</p>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <hr />
        <p id="target-id" className="fs-32 skipnav__target">
          Target Content
        </p>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <hr />
        <p className="fs-32">Some Content</p>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
      </div>
    </PreviewContainer>
  );
}
export default CUISkipNavDefault;
