import React, { useEffect } from 'react';
import Item from '../Item';
import { Modal } from '../Modal';

function Container({ content, onSubmit }) {
  let closeButton, modal, triggerButton;
  const [shown, setShown] = React.useState(false);

  const showModal = () => {
    setShown(true);
    toggleScrollLock();
  };

  useEffect(() => {
    if (shown) {
      closeButton.focus();
    }
  })

  const closeModal = () => {
    setShown(false);
    triggerButton.focus();
    toggleScrollLock();    
  };
  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };
  const onClickOutside = (event) => {
    if (modal && modal.contains(event.target)) return;
    closeModal();
  };

  const toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  return (
    <React.Fragment>
      <Item
        name={content.name}
        value={content.roles.join(', ')}
        reference={(n) => (triggerButton = n)}
        showModal={showModal}>

      </Item>
      {shown ? (
        <Modal
          onSubmit={onSubmit}
          modalRef={(n) => (modal = n)}
          buttonRef={(n) => (closeButton = n)}
          closeModal={closeModal}
          onKeyDown={onKeyDown}
          onClickOutside={onClickOutside}
          content={content}
        />
      ) : null}
    </React.Fragment>
  );

}

export default Container;